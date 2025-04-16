from flask import Flask, render_template, request
import nltk as nlp
import re
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer

from resumeProfile import ResumeProfile, Education, WorkExperience, Project

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("home.html")

@app.route("/profile")
def profile():
    return render_template("profile.html")

#Look into this, we should not need to have to send data to the server here, since it's gonna be stored in local storage
@app.route("/ceProfile", methods = ["POST", "GET"])
def createEditProfile():
    name = request.form["name"]
    email = request.form["email"]
    website = request.form["website"]

    institutions = request.form.getlist("institutionName")
    degrees = request.form.getlist("degree")

    education = []
    for educationIndex in range(len(institutions)):
        education.append(Education(institutions[educationIndex], degrees[educationIndex]))

    companyNames = request.form.getlist("companyName")
    titles = request.form.getlist("title")

    workExperience = []
    for workExperienceIndex in range(len(companyNames)):
        descriptions = request.form.getlist("responsibility" + str(workExperienceIndex + 1))
        workExperience.append(WorkExperience(companyNames[workExperienceIndex], titles[workExperienceIndex], descriptions))

    
    projectNames = request.form.getlist("projectName")

    projects = []
    for projectIndex in range(len(projectNames)):
        descriptions = request.form.getlist("projectDescription" + str(projectIndex + 1))
        projects.append(Project(projectNames[projectIndex], descriptions))
        
    skills = request.form.getlist("skill")
    accomplishments = request.form.getlist("accomplishment")

    profile = ResumeProfile(name, email, education, website, workExperience, projects, skills, accomplishments)
    
    return render_template("submitted.html", profile=profile.toJson())

@app.route("/submit", methods = ["POST", "GET"])
def submitted():
    punctuation = ".,!&'?;:/()-[]@" + '"'
    jobDesc = request.form["jobDesc"]

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