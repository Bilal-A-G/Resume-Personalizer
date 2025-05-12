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

function LoadStoredProfileData() {
    profileJson = localStorage.getItem("profile")
    if (profileJson == "" || profileJson == null)
        return

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

function AddHTMLToDOM(html, parentName) {
    const template = document.createElement("template")
    const parent = document.getElementById(parentName)
    if (parent === null)
        return

    template.innerHTML = html.trim();

    parent.appendChild(template.content.firstElementChild)
    return template.content.firstElementChild
}

function RemoveLastChildInDOM(parentName) {
    const parent = document.getElementById(parentName)
    if (parent.lastChild === null)
        return

    parent.removeChild(parent.lastChild)
}

function CreateFormTextField(fieldName, fieldID, fieldSize, required, placeholder, parent){
    const list = document.createElement("li")
    const input = document.createElement("input")
    input.type = "text"
    input.name = fieldName
    input.id = fieldID
    input.size = fieldSize
    input.required = required
    input.placeholder = placeholder

    list.appendChild(input)
    parent.appendChild(list)
}

function CreateFormDateRangeField(startFieldName, startFieldID, fieldSize, required, dateType,
    endFieldName, endFieldID, checkboxFieldID, parent){
    const startDateList = document.createElement("li")
    const startDateInput = document.createElement("input")

    startDateInput.type = dateType
    startDateInput.name = startFieldName
    startDateInput.id = startFieldID
    startDateInput.size = fieldSize
    startDateInput.required = required

    startDateList.appendChild(startDateInput)
    const endDateList = document.createElement("li")
    const endDateInput = document.createElement("input")

    endDateInput.type = dateType
    endDateInput.name = endFieldName
    endDateInput.id = endFieldID
    endDateInput.size = fieldSize
    endDateInput.required = false

    endDateList.appendChild(endDateInput)
    const checkbox = document.createElement("input")
    checkbox.type = "checkbox"
    checkbox.name = checkboxFieldID
    checkbox.id = checkboxFieldID
    checkbox.size = fieldSize

    endDateList.appendChild(checkbox)
    const label = document.createElement("label")
    label.for = checkboxFieldID
    label.textContent = "Present"
    endDateList.appendChild(label)

    parent.appendChild(startDateList)
    parent.appendChild(endDateList)
}

function CreateExpandableSection(addButtonID, addButtonText, removeButtonID, removeButtonText, 
    dropdownID, expandedFieldID, expandedFieldSize, expandedFieldPlaceholder, parent){
    const addButton = document.createElement("button")
    addButton.id = addButtonID
    addButton.textContent = addButtonText

    const removeButton = document.createElement("button")
    removeButton.id = removeButtonID
    removeButton.textContent = removeButtonText

    const listContents = document.createElement("ul")
    const dropdownDiv = document.createElement("div")
    dropdownDiv.id = dropdownID
    listContents.appendChild(dropdownDiv)

    parent.appendChild(addButton)
    parent.appendChild(removeButton)
    parent.appendChild(listContents)

    addButton.onclick = (e) => {
        e.preventDefault()
        CreateFormTextField(expandedFieldID, expandedFieldID, expandedFieldSize, true, expandedFieldPlaceholder, dropdownDiv)
    }

    removeButton.onclick = (e) => {
        e.preventDefault()
        RemoveLastChildInDOM(dropdownID)
    }
}

function StartNewSection(parent){
    const list = document.createElement("li")
    const listChild = document.createElement("ul")
    list.appendChild(listChild)
    parent.appendChild(list)

    return listChild
}

function HandleProfileUpdate() {
    educationIndex = 0
    document.getElementById("AddEducation").addEventListener("click", () => {
        educationIndex++
        const educationCpy = educationIndex

        const subSectionParent = StartNewSection(document.getElementById("educationDropdown"))
            CreateFormTextField("institutionName", "institutionID", 30, true, "Institution name", subSectionParent)
            CreateFormTextField("degree", "degree", 50, true, "Degree", subSectionParent)
            CreateFormTextField("institutionLocation", "institutionLocation", 50, true, "Location", subSectionParent)
            CreateFormDateRangeField("enrollmentDate", "enrollmentDate", 50, true, "month",
                "graduationDate", "graduationDate", `presentEducation${educationCpy}`, subSectionParent)
            CreateExpandableSection(`
                AddEducationDescription${educationCpy}`, "+",
                `RemoveEducationDescription${educationCpy}`, "-", 
                `educationDescriptionDropdown${educationCpy}`, 
                `educationDescription${educationCpy}`, 50, "Description", subSectionParent)
    })
    document.getElementById("RemoveEducation").addEventListener("click", () => {
        educationIndex--
        RemoveLastChildInDOM("educationDropdown")
    })

    document.getElementById("AddPersonalTitle").addEventListener("click", () => {
        AddHTMLToDOM(`
                <li>
                    <ul>
                        <li><input type="text" name="personalTitle", id="personalTitle" size="80" required placeholder="Title"></input></li>
                    </ul>
                </li>`,
            "titlesDropdown")
    })
    document.getElementById("RemovePersonalTitle").addEventListener("click", () => {
        RemoveLastChildInDOM("titlesDropdown")
    })

    experienceIndex = 0
    document.getElementById("AddExperience").addEventListener("click", () => {
        experienceIndex++
        const expCopy = experienceIndex
        AddHTMLToDOM(`
                <li>
                    <ul>
                        <li><input type="text" name="companyName", id="companyName" size="30" required placeholder="Company name"></input></li>
                        <li><input type="text" name="title", id="title" size="50" required placeholder="Title"></input></li>
                        <li><input type="text" name="companyLocation", id="companyLocation" size="50" required placeholder="Location"></input></li>
                        <li><input type="month" name="jobStart", id="jobStart" size="50" required></input></li>
                        <li>
                            <input type="month" name="jobEnd", id="jobEnd" size="50"></input>
                            <input type="checkbox" name="presentJob${expCopy}", id="presentJob${expCopy}" size="50"></input>
                            <label for="presentJob${expCopy}">Present</label>
                        </li>
                        <button type="button" id="AddDescription${expCopy}">++</button>
                        <button type="button" id="RemoveDescription${expCopy}">--</button>
                        <button type="button" id="AddTag${expCopy}">+</button>
                        <button type="button" id="RemoveTag${expCopy}">-</button>
                        <ul>
                            <div id = "tagDropdown${expCopy}"\>
                        </ul>
                        <ul>
                            <div id = "descriptionDropdown${expCopy}"\>
                        </ul>
                    </ul>
                </li>
                `, "experienceDropdown")

        document.getElementById("AddDescription" + expCopy).addEventListener("click", () => {
            AddHTMLToDOM(`
                        <li>
                            <input type="text" name="responsibility${expCopy}", id="responsibility${expCopy}" size="50" required placeholder="Responsibility"></input>
                        </li>
                        `, "descriptionDropdown" + expCopy)
        })
        document.getElementById("RemoveDescription" + expCopy).addEventListener("click", () => {
            RemoveLastChildInDOM("descriptionDropdown" + expCopy)
        })

        document.getElementById("AddTag" + expCopy).addEventListener("click", () => {
            AddHTMLToDOM(`
                        <li>
                            <input type="text" name="jobTag${expCopy}", id="jobTag${expCopy}" size="10" required placeholder="Tag"></input>
                        </li>
                        `, "tagDropdown" + expCopy)
        })
        document.getElementById("RemoveTag" + expCopy).addEventListener("click", () => {
            RemoveLastChildInDOM("tagDropdown" + expCopy)
        })
    })
    document.getElementById("RemoveExperience").addEventListener("click", () => {
        RemoveLastChildInDOM("experienceDropdown")
        experienceIndex--
    })

    projectIndex = 0
    document.getElementById("AddProject").addEventListener("click", () => {
        projectIndex++
        const projCpy = projectIndex

        AddHTMLToDOM(`
                <li>
                    <ul>
                        <li><input type="text" name="projectName", id="projectName" size="50" required placeholder="Name"></input></li>
                        <li><input type="month" name="projectStart", id="projectStart" size="50" required></input></li>
                        <li>
                            <input type="month" name="projectEnd", id="projectEnd" size="50"></input>
                            <input type="checkbox" name="presentProject${projCpy}", id="presentProject${projCpy}" size="50"></input>
                            <label for="presentProject${projCpy}">Present</label>
                        </li>
                        <button type="button" id="AddProjectDescription${projCpy}">++</button>
                        <button type="button" id="RemoveProjectDescription${projCpy}">--</button>
                        <button type="button" id="AddProjectTag${projCpy}">+</button>
                        <button type="button" id="RemoveProjectTag${projCpy}">-</button>
                        <ul>
                            <div id = "projectTagDropdown${projCpy}"\>
                        </ul>
                        <ul>
                            <div id = "projectDescriptionDropdown${projCpy}"\>
                        </ul>
                    </ul>
                </li>
                `, "projectsDropdown")

        document.getElementById("AddProjectDescription" + projCpy).addEventListener("click", () => {
            AddHTMLToDOM(`
                        <li>
                            <input type="text" name="projectDescription${projCpy}", id="projectDescription${projCpy}" size="50" required placeholder="Description"></input>
                        </li>
                        `, "projectDescriptionDropdown" + projCpy)
        })
        document.getElementById("RemoveProjectDescription" + projCpy).addEventListener("click", () => {
            RemoveLastChildInDOM("projectDescriptionDropdown" + projCpy)
        })

        document.getElementById("AddProjectTag" + projCpy).addEventListener("click", () => {
            AddHTMLToDOM(`
                        <li>
                            <input type="text" name="projectTag${projCpy}", id="projectTag${projCpy}" size="10" required placeholder="Tag"></input>
                        </li>
                        `, "projectTagDropdown" + projCpy)
        })
        document.getElementById("RemoveProjectTag" + projCpy).addEventListener("click", () => {
            RemoveLastChildInDOM("projectTagDropdown" + projCpy)
        })
    })
    document.getElementById("RemoveProject").addEventListener("click", () => {
        RemoveLastChildInDOM("projectsDropdown")
        projectIndex--
    })

    categoryIndex = 0
    document.getElementById("AddCategory").addEventListener("click", () => {
        categoryIndex++
        const categoryCpy = categoryIndex
        AddHTMLToDOM(`
                <li>
                    <ul>
                        <li><input type="text" name="categoryName", id="categoryName" size="50" required placeholder="Category Name"></input></li>
                        <button type="button" id="AddSkillToCategory${categoryCpy}">+</button>
                        <button type="button" id="RemoveSkillFromCategory${categoryCpy}">-</button>

                        <ul>
                            <div id = "categorySkillsDropdown${categoryCpy}"\>
                        </ul>
                    </ul>
                </li>`,
            "categorizedSkillsDropdown")

        document.getElementById("AddSkillToCategory" + categoryCpy).addEventListener("click", () => {
            AddHTMLToDOM(`
                        <li>
                            <input type="text" name="categorizedSkill${categoryCpy}", id="categorizedSkill${categoryCpy}" size="50" required placeholder="Skill"></input>
                        </li>
                        `, "categorySkillsDropdown" + categoryCpy)
        })
        document.getElementById("RemoveSkillFromCategory" + categoryCpy).addEventListener("click", () => {
            RemoveLastChildInDOM("categorySkillsDropdown" + categoryCpy)
        })
    })

    document.getElementById("RemoveCategory").addEventListener("click", () => {
        RemoveLastChildInDOM("categorizedSkillsDropdown")
        projectIndex--
    })

    document.getElementById("AddSkill").addEventListener("click", () => {
        AddHTMLToDOM(`
                <li>
                    <ul>
                        <li><input type="text" name="skill", id="skill" size="50" required placeholder="Skill"></input></li>
                    </ul>
                </li>`,
            "skillsDropdown")
    })
    document.getElementById("RemoveSkill").addEventListener("click", () => {
        RemoveLastChildInDOM("skillsDropdown")
    })

    document.getElementById("AddAccomplishment").addEventListener("click", () => {
        AddHTMLToDOM(`
                <li>
                    <ul>
                        <li><input type="text" name="accomplishment", id="accomplishment" size="80" required placeholder="Accomplishment"></input></li>
                    </ul>
                </li>`,
            "accomplishmentsDropdown")
    })
    document.getElementById("RemoveAccomplishment").addEventListener("click", () => {
        RemoveLastChildInDOM("accomplishmentsDropdown")
    })

    LoadStoredProfileData()

    document.getElementById("profileForm").addEventListener("submit", (e) => {
        e.preventDefault()

        jsonString = '{'
        formData = new FormData(document.getElementById("profileForm"))
        const personalTitles = formData.getAll("personalTitle")

        jsonString += `"name": "${formData.get("name")}", `
        jsonString += `"email": "${formData.get("email")}", `
        jsonString += `"personalTitles": [`
        for (i = 0; i < personalTitles.length; i++) {
            jsonString += `"${personalTitles[i]}"`
            if (i != personalTitles.length - 1)
                jsonString += ', '
        }
        jsonString += '], '
        const educationAlias = formData.get("educationAlias")

        jsonString += `"education": {"alias": "${educationAlias}", "data": [`

        const institutionNames = formData.getAll("institutionName")
        const degrees = formData.getAll("degree")
        const locations = formData.getAll("institutionLocation")
        const graduationDates = formData.getAll("graduationDate")
        const enrollmentDates = formData.getAll("enrollmentDate")

        for (i = 0; i < institutionNames.length; i++) {
            const present = formData.get(`presentEducation${i + 1}`)
            jsonString += `{"institutionName": "${institutionNames[i]}", "degree": "${degrees[i]}",
                    "institutionLocation": "${locations[i]}", "graduation": "${graduationDates[i]}", "present": "${present}",
                    "enrollment": "${enrollmentDates[i]}", "descriptions": [`

            const descriptions = formData.getAll(`educationDescription${i + 1}`)
            for (v = 0; v < descriptions.length; v++) {
                jsonString += `"${descriptions[v]}"`
                if (v != descriptions.length - 1)
                    jsonString += ', '
            }

            jsonString += ']}'

            if (i != institutionNames.length - 1)
                jsonString += ', '
        }

        jsonString += ']}, '
        jsonString += `"website": "${formData.get("website")}", `
        const workExperienceAlias = formData.get("experienceAlias")
        jsonString += `"workExperience": {"alias": "${workExperienceAlias}", "data": [`

        const companyNames = formData.getAll("companyName")
        const titles = formData.getAll("title")
        const jobLocations = formData.getAll("companyLocation")
        const jobStartDates = formData.getAll("jobStart")
        const jobEndDates = formData.getAll("jobEnd")

        for (i = 0; i < companyNames.length; i++) {
            const present = formData.get(`presentJob${i + 1}`)
            jsonString += `{"companyName": "${companyNames[i]}", "jobLocation": "${jobLocations[i]}",
                    "title": "${titles[i]}", "jobStartDate": "${jobStartDates[i]}", "jobEndDate": "${jobEndDates[i]}",
                    "presentJob": "${present}", "descriptions": [`

            const descriptions = formData.getAll(`responsibility${i + 1}`)
            for (v = 0; v < descriptions.length; v++) {
                jsonString += `"${descriptions[v]}"`
                if (v != descriptions.length - 1)
                    jsonString += ', '
            }

            jsonString += '], "jobTags": ['
            const jobTags = formData.getAll(`jobTag${i + 1}`)

            for (v = 0; v < jobTags.length; v++) {
                jsonString += `"${jobTags[v]}"`
                if (v != jobTags.length - 1)
                    jsonString += ', '
            }

            jsonString += ']}'

            if (i != companyNames.length - 1)
                jsonString += ', '
        }

        jsonString += ']}, '
        const projectsAlias = formData.get("projectsAlias")
        jsonString += `"projects": {"alias": "${projectsAlias}", "data": [`

        const projectNames = formData.getAll("projectName")
        const projectStartDates = formData.getAll("projectStart")
        const projectEndDates = formData.getAll("projectEnd")

        for (i = 0; i < projectNames.length; i++) {
            const present = formData.get(`presentProject${i + 1}`)

            jsonString += `{"projectName": "${projectNames[i]}", "projectStartDate": "${projectStartDates[i]}",
                    "projectEndDate": "${projectEndDates[i]}", "presentProject": "${present}", "projectDescriptions": [`

            const projectDescriptions = formData.getAll(`projectDescription${i + 1}`)
            for (v = 0; v < projectDescriptions.length; v++) {
                jsonString += `"${projectDescriptions[v]}"`
                if (v != projectDescriptions.length - 1)
                    jsonString += ', '
            }

            jsonString += '], "projectTags": ['
            const projectTags = formData.getAll(`projectTag${i + 1}`)

            for (v = 0; v < projectTags.length; v++) {
                jsonString += `"${projectTags[v]}"`
                if (v != projectTags.length - 1)
                    jsonString += ', '
            }

            jsonString += ']}'
            if (i != projectNames.length - 1)
                jsonString += ', '
        }

        jsonString += ']}, '
        const skills = formData.getAll("skill")
        const categories = formData.getAll("categoryName")

        jsonString += `"categorizedSkills": [`
        for (i = 0; i < categories.length; i++) {
            jsonString += `{"categoryName": "${categories[i]}", "categorizedSkills": [`

            const categorizedSKills = formData.getAll(`categorizedSkill${i + 1}`)
            for (v = 0; v < categorizedSKills.length; v++) {
                jsonString += `"${categorizedSKills[v]}"`
                if (v != categorizedSKills.length - 1)
                    jsonString += ', '
            }

            jsonString += ']}'
            if (i != categories.length - 1)
                jsonString += ', '
        }
        jsonString += '], '

        const skillsAlias = formData.get("skillsAlias")
        jsonString += `"skills": {"alias": "${skillsAlias}", "data": [`
        for (i = 0; i < skills.length; i++) {
            jsonString += `"${skills[i]}"`
            if (i != skills.length - 1)
                jsonString += ', '
        }
        jsonString += ']}, '

        const accomplishments = formData.getAll("accomplishment")
        const accomplishmentsAlias = formData.get("accomplishmentsAlias")
        jsonString += `"accomplishments": {"alias": "${accomplishmentsAlias}", "data": [`
        for (i = 0; i < accomplishments.length; i++) {
            jsonString += `"${accomplishments[i]}"`
            if (i != accomplishments.length - 1)
                jsonString += ', '
        }
        jsonString += ']}}'

        localStorage.setItem("profile", jsonString)
        window.location.href = "/ceProfile"
    })
}