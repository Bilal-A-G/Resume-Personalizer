from flask import Flask, render_template, request, send_file
import json
from jinja2 import FileSystemLoader, Environment
from rake_nltk import Rake
from weasyprint import HTML, CSS
from io import BytesIO
import re
from collections import Counter
import nltk as nlp
from nltk.corpus import stopwords, wordnet
from nltk import WordNetLemmatizer, pos_tag
from nltk.metrics import jaccard_distance

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
            #print("Stripped " + token[1] + ": " + token[0])
            continue

        nouns.append(token)

    #Lematize word, reduce all words to their root dictionary form, ie running -> run
    lemmatized = []
    lemmatizer = WordNetLemmatizer()
    for token in nouns:
        if token[1] == "NNP" or token[1] == "NNPS":
            lemmatized.append(token[0])
            continue
        #print("Lemmatizing " + token[1] + ": " + token[0])
        lemmatized.append(lemmatizer.lemmatize(token[0]))

    return lemmatized

@app.route("/submit", methods = ["POST", "GET"])
def submitted():
    jobDesc = request.form["jobDesc"]
    profile = request.form["profile"]
    jsonData = json.loads(profile)

    jinjaEnv = Environment(loader=FileSystemLoader("./resumeTemplates"))
    template = jinjaEnv.get_template("template.html") 

    jobKeywords = getLemmatizedKeywords(jobDesc)
    descriptionLength = len(jobKeywords)
    rankedKeywords = Counter(jobKeywords).items()

    projectsCopy = jsonData["projects"]
    projectDescriptions = jsonData["projects"][0]["projectDescriptions"]
    relevantDescriptions = []
    for description in projectDescriptions:
        descriptionKeywords = getLemmatizedKeywords(description)
        similarity = computeKeywordSimilarity(rankedKeywords, descriptionKeywords, descriptionLength)
        relevantDescriptions.append((similarity, descriptionKeywords))
        #print(descriptionKeywords) 

    relevantDescriptions.sort(key=lambda elem : 1 - elem[0])
    print(relevantDescriptions)

    fileInfo = template.render(name=jsonData["name"],
                               education=jsonData["education"],
                               email=jsonData["email"],
                               website=jsonData["website"],
                               workExperience=jsonData["workExperience"],
                               projects=projectsCopy,
                               skills=jsonData["skills"], accomplishments=jsonData["accomplishments"])
    pdfFile = BytesIO()
    HTML(string=fileInfo).write_pdf(pdfFile, stylesheets=[CSS("./resumeTemplates/template.css")])
    pdfFile.seek(0)

    return send_file(pdfFile, mimetype="application/pdf" ,as_attachment=True, download_name="Resume.pdf")
