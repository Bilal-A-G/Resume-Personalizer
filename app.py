from flask import Flask, render_template, request, send_file
import json
from jinja2 import FileSystemLoader, Environment
from weasyprint import HTML, CSS
from io import BytesIO
from collections import Counter
import nltk as nlp
import re
from nltk.corpus import stopwords
from nltk import WordNetLemmatizer, pos_tag

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("home.html")

@app.route("/profile")
def profile():
    return render_template("profile.html")

@app.route("/ceProfile")
def createEditProfile():
    return render_template("submitted.html")

def computeKeywordSimilarity(jobKeywords, descriptionKeywords, jobLength):
    jobSet = dict(jobKeywords)
    descriptionSet = set(descriptionKeywords)
    intersect = descriptionSet.intersection(jobSet.keys())

    #Get score from matching more frequently occuring keywords
    totalIntersectScore = 0
    for key in intersect:
        totalIntersectScore += jobSet[key]/jobLength
    
    #Score from how many keywords in the description exist in the job
    jaccardScore = len(intersect)/(len(jobSet) + len(descriptionSet) - len(intersect))
    
    return (jaccardScore + totalIntersectScore)/2

#Use when you want to preserve as many words as possible
def getRawKeywords(originalText):
    punctuation = ".,!&'?;:/()-[]@" + '"'
    modifiedText = originalText

    #Remove all punctuation
    for char in punctuation:
        modifiedText = modifiedText.replace(char, " ")

    #Replace all non ascii characters with a space
    modifiedText = re.sub(r'[^\x00-\x7f]', r' ', modifiedText)

    #Break the text into individual words
    tokens = nlp.word_tokenize(modifiedText)
    taggedTokens = pos_tag(tokens)

    lower = []
    #Convert everything to lowercase
    for token in taggedTokens:
        lower.append((token[0].lower(), token[1]))

    #Remove all stop words, ie things like the, I, me, my, etc.
    allStopWords = set(stopwords.words("english"))
    filtered = []

    for token in lower:
        if token[0] not in allStopWords:
            filtered.append(token)

    #Ensure we remove all punctuation
    stripped = []
    for token in filtered:
        if token[1] == ".":
            continue

        stripped.append(token)

    #Lematize word, reduce all words to their root dictionary form, ie running -> run
    lemmatized = []
    lemmatizer = WordNetLemmatizer()
    for token in stripped:
        if token[1] == "NNP" or token[1] == "NNPS":
            lemmatized.append(token[0])
            continue
        lemmatized.append(lemmatizer.lemmatize(token[0]))

    return lemmatized

def getLemmatizedKeywords(originalText):
    punctuation = ".,!&'?;:/()-[]@" + '"'
    modifiedText = originalText

    #Remove all punctuation
    for char in punctuation:
        modifiedText = modifiedText.replace(char, " ")

    #Break the text into individual words
    tokens = nlp.word_tokenize(modifiedText)
    taggedTokens = pos_tag(tokens)

    lower = []
    #Convert everything to lowercase
    for token in taggedTokens:
        lower.append((token[0].lower(), token[1]))

    #Remove all stop words, ie things like the, I, me, my, etc.
    allStopWords = set(stopwords.words("english"))
    filtered = []

    for token in lower:
        if token[0] not in allStopWords:
            filtered.append(token)

    #Remove anything that isn't a noun or punctuation
    nouns = []
    for token in filtered:
        if token[1] != "NN" and token[1] != "NNS" and token[1] != "NNP" and token[1] != "NNPS" and token[1] != "#":
            continue

        nouns.append(token)

    #Lematize word, reduce all words to their root dictionary form, ie running -> run
    lemmatized = []
    lemmatizer = WordNetLemmatizer()
    for token in nouns:
        if token[1] == "NNP" or token[1] == "NNPS":
            lemmatized.append(token[0])
            continue
        lemmatized.append(lemmatizer.lemmatize(token[0]))

    return lemmatized

def getStringKeywordsSimilarity(string, rankedKeywordList, keywordListLength):
    stringKeywords = getLemmatizedKeywords(string)
    similarity = computeKeywordSimilarity(rankedKeywordList, stringKeywords, keywordListLength)
    print(stringKeywords)
    return (similarity, string)

def getStringListKeywordSimilarity(stringList, rankedKeywordList, keywordListLength):
    weightedStrings = []
    for string in stringList:
        weightedStrings.append(getStringKeywordsSimilarity(string, rankedKeywordList, keywordListLength))

    weightedStrings.sort(key=lambda elem : 1 - elem[0])
    return weightedStrings

def getTopNElemsInListAndWeight(list, n):
    totalStringWeight = 0
    topElems = []
    for i in range(min(len(list), n)):
        topElems.append(list[i][1])
        totalStringWeight += list[i][0]
    
    return (totalStringWeight, topElems)

def getTopSimilarEntriesByFields(fieldNames, json, rankedMatchKeywords, originalKeywordsLength, maxDescriptions = 3, maxEntires = 3):
    jsonCpy = json
    weightedEntries = []
    relevantEntries = []

    for entryIndex in range(len(json)):
        allConsideredFields = []
        #Collect all fields
        for fieldName in fieldNames:
            fieldData = json[entryIndex][fieldName]
            #If this is a list, we want to modify the JSON to only include the top maxDescriptions elements. Ie, if this is a description for a job
            #we only want the most relevant entries to appear on the resume
            if isinstance(fieldData, list):
                allConsideredFields.extend(fieldData)
                weightedFields = getStringListKeywordSimilarity(fieldData, rankedMatchKeywords, originalKeywordsLength)
                topFields = getTopNElemsInListAndWeight(weightedFields, maxDescriptions)
                jsonCpy[entryIndex][fieldName] = topFields[1]
            else:
                allConsideredFields.append(fieldData)

        #Get similairty of each field to the job description
        weightedAllConsideredFields = getStringListKeywordSimilarity(allConsideredFields, rankedMatchKeywords, originalKeywordsLength)
        #Get top 3 most similar fields and their cummulative weight
        topAllConsideredFields = getTopNElemsInListAndWeight(weightedAllConsideredFields, 3)

        weightedEntries.append((topAllConsideredFields[0], jsonCpy[entryIndex]))
    
    #Sort our weighted entries and only pick the top maxEntries, ie if we have 10 jobs in the jobs section, 
    # only pick the top maxEntries most relevant
    weightedEntries.sort(key=lambda elem : 1 - elem[0])
    for i in range(min(len(weightedEntries), maxEntires)):
        relevantEntries.append(weightedEntries[i][1])
    
    return relevantEntries

@app.route("/submit", methods = ["POST", "GET"])
def submitted():
    jobDesc = request.form["jobDesc"]
    profile = request.form["profile"]
    jsonData = json.loads(profile)

    jinjaEnv = Environment(loader=FileSystemLoader("./resumeTemplates"))
    template = jinjaEnv.get_template("template.html")

    jobKeywords = getRawKeywords(jobDesc)
    descriptionLength = len(jobKeywords)
    rankedKeywords = Counter(jobKeywords).items()
    print(rankedKeywords)

    relevantProjects = getTopSimilarEntriesByFields(["projectDescriptions", "projectTags"], 
                                                    jsonData["projects"]["data"], rankedKeywords, descriptionLength)
    relevantExperience = getTopSimilarEntriesByFields(["descriptions", "title", "jobTags"], jsonData["workExperience"]["data"], 
                                            rankedKeywords, descriptionLength)
    
    relevantSkills = getStringListKeywordSimilarity(jsonData["skills"]["data"], rankedKeywords, descriptionLength)
    relevantSkills = getTopNElemsInListAndWeight(relevantSkills, 5)[1]

    relevantCategorizedSkills = getTopSimilarEntriesByFields(["categorizedSkills"], jsonData["categorizedSkills"],
                                                              rankedKeywords, descriptionLength, 8, 3)

    relevantAccomplishments = getStringListKeywordSimilarity(jsonData["accomplishments"]["data"], 
                                                             rankedKeywords, descriptionLength)
    relevantAccomplishments = getTopNElemsInListAndWeight(relevantAccomplishments, 3)[1]

    relevantEducation = getTopSimilarEntriesByFields(["degree", "descriptions"], 
                                                     jsonData["education"]["data"], rankedKeywords, descriptionLength)
    relevantTitle = getStringListKeywordSimilarity(jsonData["personalTitles"], rankedKeywords, descriptionLength)
    relevantTitle = getTopNElemsInListAndWeight(relevantTitle, 1)[1]

    print(relevantExperience)

    fileInfo = template.render(name=jsonData["name"],
                               education=relevantEducation,
                               email=jsonData["email"],
                               website=jsonData["website"],
                               workExperience=relevantExperience,
                               projects=relevantProjects,
                               skills=relevantSkills, 
                               titles=relevantTitle,
                               categorizedSkills=relevantCategorizedSkills,
                               accomplishments=relevantAccomplishments)
    pdfFile = BytesIO()
    HTML(string=fileInfo).write_pdf(pdfFile, stylesheets=[CSS("./resumeTemplates/template.css")])
    pdfFile.seek(0)

    return send_file(pdfFile, mimetype="application/pdf" ,as_attachment=True, download_name="Resume.pdf")