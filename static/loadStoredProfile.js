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
        console.log(addSecondButtonID + " add button id " + items.length)
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
            continue

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

console.log(new URLSearchParams(window.location.search).get("name"))
profileJson = localStorage.getItem(new URLSearchParams(window.location.search).get("name"))
if (profileJson != "" && profileJson != null){
    const obj = JSON.parse(profileJson)
    SetDOMElementByIDValue("name", obj.name)
    SetDOMElementByIDValue("profileName", obj.profileName)
    SetDOMElementByIDValue("email", obj.email)
    SetDOMElementByIDValue("website", obj.website)

    SetDomElementsByName("AddPersonalTitle", "personalTitle", obj.personalTitles)

    const education = obj.education.data
    SetDomElementsBySection(education, "AddEducation",
        ["institutionName", "degree", "institutionLocation", "enrollmentDate"],
        ["institutionName", "degree", "institutionLocation", "enrollment"],
        ["AddEducationDescription"], ["educationDescription"], ["descriptions"],
        "presentEducation", "graduationDate", "present", "graduation"
    )

    const experience = obj.workExperience.data
    console.log(obj.workExperience.data)
    SetDomElementsBySection(experience, "AddExperience",
        ["companyName", "jobTitle", "jobStart", "jobLocation"],
        ["companyName", "jobTitles", "jobStartDate", "jobLocation"],
        ["AddJobDescription", "AddTag"], ["responsibility", "jobTag"], ["descriptions", "jobTags"],
        "presentJob", "jobEnd", "presentJob", "jobEndDate"
    )

    const projects = obj.projects.data
    SetDomElementsBySection(projects, "AddProject",
        ["projectName", "projectStart"],
        ["projectName", "projectStartDate"],
        ["AddProjectDescription", "AddProjectTag"], ["projectDescription", "projectTag"], ["projectDescriptions", "projectTags"],
        "presentProject", "projectEnd", "presentProject", "projectEndDate"
    )

    const skills = obj.unclassifiedSkills.data
    SetDomElementsByName("AddUnclassifiedSkill", "unclassifiedSkill", skills)

    const skillCategories = obj.categorizedSkills
    console.log(skillCategories)
    SetDomElementsBySection(skillCategories, "AddCategorizedSkill", ["categoryName"], ["categoryName"],
        ["AddCategorizedSkill"], ["categorizedSkill"], ["categorizedSkills"]
    )

    const accomplishments = obj.accomplishments.data
    SetDomElementsByName("AddAccomplishment", "accomplishment", accomplishments)
}

