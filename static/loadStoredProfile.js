function SetDOMElementByIDValue(elementID, value){
    document.getElementById(elementID).value = value
}

function SetDomElementsByName(addButtonID, elementName, items){
    for(let i = 0; i < items.length; i++){
        document.getElementById(addButtonID).click()
        const allAddedElements = document.getElementsByName(elementName)
        allAddedElements[allAddedElements.length - 1].value = items[i]
    }
}

function SetDomElementsBySection(items, addSecondButtonID, elementNames, elementValueNames,
    addSubSectionButtonIDs, subSectionElementNames, allSubSectionItemNames,
    presentDateElementName = "", endDateElementName = "", presentDateElementValueName = "", endDateElementValueName = "")
{
    for(let i = 0; i < items.length; i++){
        document.getElementById(addSecondButtonID).click()

        for(let v = 0; v < subSectionElementNames.length; v++){
            SetDomElementsByName(addSubSectionButtonIDs[v] + `${i + 1}`,
                subSectionElementNames[v]  + `${i + 1}`, items[i][allSubSectionItemNames[v]])
        }

        for(let v = 0; v < elementNames.length; v++){
            const allSubSections = document.getElementsByName(elementNames[v])
            allSubSections[allSubSections.length - 1].value = items[i][elementValueNames[v]]
        }

        if(presentDateElementName == "" || endDateElementName == "" ||
            presentDateElementValueName == "" || endDateElementValueName == "")
            return

        const allPresents = document.getElementsByName(presentDateElementName + `${i + 1}`)
        const allEnds = document.getElementsByName(endDateElementName)
        const presentValue = items[i][presentDateElementValueName]
        if( presentValue != undefined && presentValue != "null"){
            allPresents[allPresents.length - 1].click()
        }
        else{
            allEnds[allEnds.length - 1].value = items[i][endDateElementValueName]
        }
    }
}


profileJson = localStorage.getItem("profile")
if (profileJson != "" && profileJson != null){
    const obj = JSON.parse(profileJson)
    SetDOMElementByIDValue("name", obj.name)
    SetDOMElementByIDValue("email", obj.email)
    SetDOMElementByIDValue("website", obj.website)

    SetDomElementsByName("AddPersonalTitle", "personalTitle", obj.personalTitles)

    const education = obj.education.data
    document.getElementById("educationAlias").value = obj.education.alias
    SetDomElementsBySection(education, "AddEducation",
        ["institutionName", "degree", "institutionLocation", "enrollmentDate"],
        ["institutionName", "degree", "institutionLocation", "enrollment"],
        ["AddEducationDescription"], ["educationDescriptions"], ["descriptions"],
        "presentEducation", "graduationDate", "present", "graduation"
    )

    const experience = obj.workExperience.data
    document.getElementById("experienceAlias").value = obj.workExperience.alias
    SetDomElementsBySection(experience, "AddExperience",
        ["companyName", "title", "jobStart", "companyLocation"],
        ["companyName", "title", "jobStartDate", "jobLocation"],
        ["AddDescription", "AddTag"], ["responsibility", "jobTag"], ["descriptions", "jobTags"],
        "presentJob", "jobEnd", "presentJob", "jobEndDate"
    )

    const projects = obj.projects.data
    document.getElementById("projectsAlias").value = obj.projects.alias
    SetDomElementsBySection(projects, "AddProject",
        ["projectName", "projectStart"],
        ["projectName", "projectStartDate"],
        ["AddProjectDescription", "AddProjectTag"], ["projectDescription", "projectTag"], ["projectDescriptions", "projectTags"],
        "presentProject", "projectEnd", "presentProject", "projectEndDate"
    )

    const skills = obj.skills.data
    document.getElementById("skillsAlias").value = obj.skills.alias
    SetDomElementsByName("AddSkill", "skill", skills)

    const skillCategories = obj.categorizedSkills
    SetDomElementsBySection(skillCategories, "AddCategory", ["categoryName"], ["categoryName"],
        ["AddSkillToCategory"], ["categorizedSkill"], ["categorizedSkills"]
    )

    const accomplishments = obj.accomplishments.data
    document.getElementById("accomplishmentsAlias").value = obj.accomplishments.alias
    SetDomElementsByName("AddAccomplishment", "accomplishment", accomplishments)
}

