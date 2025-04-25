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

    #Remove anything that isn't a noun
    nouns = []
    for token in filtered:
        if token[1] != "NN" and token[1] != "NNS" and token[1] != "NNP" and token[1] != "NNPS":
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

def getWeightedSection(subSectionName, sectionList, rankedJobKeywords, originalJobLength, extraConsiderations = []):
    sectionListCpy = sectionList
    weightedSection = []
    for sectionIndex in range(len(sectionList)):
        subSectionList = sectionListCpy[sectionIndex][subSectionName]
        weightedSubSectionList = getStringListKeywordSimilarity(subSectionList, rankedJobKeywords, originalJobLength)
        topSubSections = getTopNElemsInListAndWeight(weightedSubSectionList, 3)

        extraConsiderationScore = 0
        for consideration in extraConsiderations:
            extraConsiderationScore += getStringKeywordsSimilarity(sectionListCpy[sectionIndex][consideration], 
                                                                   rankedJobKeywords, originalJobLength)[0]

        sectionListCpy[sectionIndex][subSectionName] = topSubSections[1]
        weightedSection.append((topSubSections[0] + extraConsiderationScore, sectionListCpy[sectionIndex]))

    weightedSection.sort(key=lambda elem : 1 - elem[0])
    return weightedSection

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

    relevantProjects = []
    weightedProjects = getWeightedSection("projectDescriptions", jsonData["projects"], rankedKeywords, descriptionLength)
    for i in range(min(len(weightedProjects), 3)):
        relevantProjects.append(weightedProjects[i][1])
    print(weightedProjects)

    relevantExperience = []
    weightedExperience = getWeightedSection("descriptions", jsonData["workExperience"], 
                                            rankedKeywords, descriptionLength, ["title"])
    for i in range(min(len(weightedExperience), 3)):
        relevantExperience.append(weightedExperience[i][1])
    print(weightedExperience)

    fileInfo = template.render(name=jsonData["name"],
                               education=jsonData["education"],
                               email=jsonData["email"],
                               website=jsonData["website"],
                               workExperience=relevantExperience,
                               projects=relevantProjects,
                               skills=jsonData["skills"], accomplishments=jsonData["accomplishments"])
    pdfFile = BytesIO()
    HTML(string=fileInfo).write_pdf(pdfFile, stylesheets=[CSS("./resumeTemplates/template.css")])
    pdfFile.seek(0)

    return send_file(pdfFile, mimetype="application/pdf" ,as_attachment=True, download_name="Resume.pdf")