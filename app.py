from flask import Flask, render_template, request, send_file
import nltk as nlp
import re
import json
from jinja2 import FileSystemLoader, Environment
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from weasyprint import HTML, CSS
from io import BytesIO

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

@app.route("/submit", methods = ["POST", "GET"])
def submitted():
    punctuation = ".,!&'?;:/()-[]@" + '"'
    jobDesc = request.form["jobDesc"]
    profile = request.form["profile"]
    jsonData = json.loads(profile)

    jinjaEnv = Environment(loader=FileSystemLoader("./resumeTemplates"))
    template = jinjaEnv.get_template("template.html")

    fileInfo = template.render(name=jsonData["name"], 
                               education=jsonData["education"], 
                               email=jsonData["email"], 
                               website=jsonData["website"], 
                               workExperience=jsonData["workExperience"], 
                               projects=jsonData["projects"],
                               skills=jsonData["skills"], accomplishments=jsonData["accomplishments"])
    print(fileInfo)
    pdfFile = BytesIO()
    HTML(string=fileInfo).write_pdf(pdfFile, stylesheets=[CSS("./resumeTemplates/template.css")])
    pdfFile.seek(0)

    return send_file(pdfFile, mimetype="application/pdf" ,as_attachment=True, download_name="Resume.pdf")

    #Remove all punctuation
    for char in punctuation:
        jobDesc = jobDesc.replace(char, " ")

    #Convert everything to lowercase
    jobDesc = jobDesc.lower()

    #Replace all non ascii characters with a space
    jobDesc = re.sub(r'[^\x00-\x7f]', r' ', jobDesc)

    #Break the text into individual words
    tokens = nlp.word_tokenize(jobDesc)

    #Remove all stop words, ie things like the, I, me, my, etc.
    allStopWords = set(stopwords.words("english"))
    filtered = []

    for token in tokens:
        if token not in allStopWords:
            filtered.append(token)

    #Lematize word, reduce all words to their root dictionary form, ie running -> run
    lemmatized = []
    lemmatizer = WordNetLemmatizer()
    for token in filtered:
        lemmatized.append(lemmatizer.lemmatize(token))

    print(lemmatized)
    return lemmatized