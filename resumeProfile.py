import json

def serialize(obj):
    return json.dumps(obj.__dict__)

class Education:
    def __init__(self, institutionName, degree):
        self.institutionName = institutionName
        self.degree = degree

class WorkExperience:
    def __init__(self, companyName, title, descriptions):
        self.companyName = companyName
        self.title = title
        self.descriptions = descriptions

class Project:
    def __init__(self, projectName, projectDescriptions):
        self.projectName = projectName
        self.projectDescriptions = projectDescriptions

class ResumeProfile:
    def __init__(self, name, email, education, website, workExperience, projects, skills, accomplishments):
        self.name = name
        self.email = email
        self.education = education
        self.website = website
        self.workExperience = workExperience
        self.projects = projects
        self.skills = skills
        self.accomplishments = accomplishments

    def toJson(self):
        return json.dumps(self.__dict__, default=lambda x: x.__dict__)