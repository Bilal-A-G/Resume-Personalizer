from flask import Flask, render_template, request, send_file
import json
from jinja2 import FileSystemLoader, Environment
from rake_nltk import Rake
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

def getKeywords(originalText):
    rake = Rake()

    rake.extract_keywords_from_text(originalText)
    return rake.get_ranked_phrases_with_scores()

@app.route("/submit", methods = ["POST", "GET"])
def submitted():
    jobDesc = request.form["jobDesc"]
    profile = request.form["profile"]
    jsonData = json.loads(profile)

    jinjaEnv = Environment(loader=FileSystemLoader("./resumeTemplates"))
    template = jinjaEnv.get_template("template.html")

    jobDescKeywords = getKeywords(jobDesc)
    print(jobDescKeywords)

    projectsCopy = jsonData["projects"]
    projectDescriptions = jsonData["projects"][0]["projectDescriptions"]
    relevantDescriptions = []
    for description in projectDescriptions:
        descriptionKeywords = getKeywords(description)
        print(descriptionKeywords)

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
