function LoadStoredProfileData() {
    profileJson = localStorage.getItem("profile")
    if (profileJson == "" || profileJson == null)
        return

    const obj = JSON.parse(profileJson)
    document.getElementById("name").value = obj.name
    document.getElementById("email").value = obj.email
    document.getElementById("website").value = obj.website

    const personalTitles = obj.personalTitles
    for (i = 0; i < personalTitles.length; i++) {
        document.getElementById("AddPersonalTitle").click()
        const allPersonalTitles = document.getElementsByName("personalTitle")

        allPersonalTitles[allPersonalTitles.length - 1].value = personalTitles[i]
    }

    const education = obj.education.data
    document.getElementById("educationAlias").value = obj.education.alias
    for (i = 0; i < education.length; i++) {
        document.getElementById("AddEducation").click()
        const allInstitutions = document.getElementsByName("institutionName")
        const allDegrees = document.getElementsByName("degree")
        const allLocations = document.getElementsByName("institutionLocation")
        const allGraduationDates = document.getElementsByName("graduationDate")
        const allEnrollmentDates = document.getElementsByName("enrollmentDate")
        const allPresentEducation = document.getElementsByName(`presentEducation${i + 1}`)

        const descriptions = education[i].descriptions
        for (v = 0; v < descriptions.length; v++) {
            document.getElementById(`AddEducationDescription${i + 1}`).click()
            const allDescriptions = document.getElementsByName(`educationDescription${i + 1}`)
            allDescriptions[allDescriptions.length - 1].value = descriptions[v]
        }

        isPresent = education[i].present
        if (isPresent != undefined && isPresent != "null") {
            allPresentEducation[allPresentEducation.length - 1].click()
        }
        else {
            allGraduationDates[allGraduationDates.length - 1].value = education[i].graduation
        }

        allInstitutions[allInstitutions.length - 1].value = education[i].institutionName
        allDegrees[allDegrees.length - 1].value = education[i].degree
        allLocations[allLocations.length - 1].value = education[i].institutionLocation
        allEnrollmentDates[allEnrollmentDates.length - 1].value = education[i].enrollment
    }

    const experience = obj.workExperience.data
    document.getElementById("experienceAlias").value = obj.workExperience.alias
    for (i = 0; i < experience.length; i++) {
        document.getElementById("AddExperience").click()

        const allCompanyNames = document.getElementsByName("companyName")
        const allTitles = document.getElementsByName("title")
        const allJobStartDates = document.getElementsByName("jobStart")
        const allJobEndDates = document.getElementsByName("jobEnd")
        const allCompanyLocations = document.getElementsByName("companyLocation")
        const allJobPresents = document.getElementsByName(`presentJob${i + 1}`)

        allCompanyNames[allCompanyNames.length - 1].value = experience[i].companyName
        allTitles[allTitles.length - 1].value = experience[i].title
        allJobStartDates[allJobStartDates.length - 1].value = experience[i].jobStartDate
        allCompanyLocations[allCompanyLocations.length - 1].value = experience[i].jobLocation

        isPresent = experience[i].presentJob
        if (isPresent != undefined && isPresent != "null") {
            allJobPresents[allJobPresents.length - 1].click()
        }
        else {
            allJobEndDates[allJobEndDates.length - 1].value = experience[i].jobEndDate
        }

        const descriptions = experience[i].descriptions
        for (v = 0; v < descriptions.length; v++) {
            document.getElementById("AddDescription" + (i + 1)).click()
            const allDescriptions = document.getElementsByName("responsibility" + (i + 1))
            allDescriptions[allDescriptions.length - 1].value = descriptions[v]
        }

        const tags = experience[i].jobTags
        for (v = 0; v < tags.length; v++) {
            document.getElementById("AddTag" + (i + 1)).click()
            const allTags = document.getElementsByName("jobTag" + (i + 1))
            allTags[allTags.length - 1].value = tags[v]
        }
    }

    const projects = obj.projects.data
    document.getElementById("projectsAlias").value = obj.projects.alias
    for (i = 0; i < projects.length; i++) {
        document.getElementById("AddProject").click()
        const allProjectNames = document.getElementsByName("projectName")
        const allProjectStarts = document.getElementsByName("projectStart")
        const allProjectEnds = document.getElementsByName("projectEnd")
        const allProjectPresents = document.getElementsByName(`presentProject${i + 1}`)
        allProjectNames[allProjectNames.length - 1].value = projects[i].projectName
        allProjectStarts[allProjectStarts.length - 1].value = projects[i].projectStartDate

        isPresent = projects[i].presentProject
        if (isPresent != undefined && isPresent != "null") {
            allProjectPresents[allProjectPresents.length - 1].click()
        }
        else {
            allProjectEnds[allProjectEnds.length - 1].value = projects[i].projectEndDate
        }

        const descriptions = projects[i].projectDescriptions
        for (v = 0; v < descriptions.length; v++) {
            document.getElementById("AddProjectDescription" + (i + 1)).click()
            const allDescriptions = document.getElementsByName("projectDescription" + (i + 1))
            allDescriptions[allDescriptions.length - 1].value = descriptions[v]
        }

        const tags = projects[i].projectTags
        for (v = 0; v < tags.length; v++) {
            document.getElementById("AddProjectTag" + (i + 1)).click()
            const allTags = document.getElementsByName("projectTag" + (i + 1))
            allTags[allTags.length - 1].value = tags[v]
        }
    }

    const skills = obj.skills.data
    document.getElementById("skillsAlias").value = obj.skills.alias

    const skillCategories = obj.categorizedSkills
    for (i = 0; i < skills.length; i++) {
        document.getElementById("AddSkill").click()
        const allSkills = document.getElementsByName("skill")
        allSkills[allSkills.length - 1].value = skills[i]
    }

    for (i = 0; i < skillCategories.length; i++) {
        document.getElementById("AddCategory").click()
        const allCategories = document.getElementsByName("categoryName")
        allCategories[allCategories.length - 1].value = skillCategories[i].categoryName

        const categorizedSkills = skillCategories[i].categorizedSkills
        for (v = 0; v < categorizedSkills.length; v++) {
            document.getElementById("AddSkillToCategory" + (i + 1)).click()
            const allCategorizedSkills = document.getElementsByName("categorizedSkill" + (i + 1))
            allCategorizedSkills[allCategorizedSkills.length - 1].value = categorizedSkills[v]
        }
    }

    const accomplishments = obj.accomplishments.data
    document.getElementById("accomplishmentsAlias").value = obj.accomplishments.alias

    for (i = 0; i < accomplishments.length; i++) {
        document.getElementById("AddAccomplishment").click()
        const allAccomplishments = document.getElementsByName("accomplishment")
        allAccomplishments[allAccomplishments.length - 1].value = accomplishments[i]
    }
}

function AddHTMLToDOM(html, parentName) {
    const template = document.createElement("template")
    const parent = document.getElementById(parentName)
    if (parent === null)
        return

    template.innerHTML = html.trim();

    parent.appendChild(template.content.firstElementChild)
}

function RemoveLastChildInDOM(parentName) {
    const parent = document.getElementById(parentName)
    if (parent.lastChild === null)
        return

    parent.removeChild(parent.lastChild)
}

function HandleProfileUpdate() {
    educationIndex = 0
    document.getElementById("AddEducation").addEventListener("click", () => {
        educationIndex++
        const educationCpy = educationIndex
        AddHTMLToDOM(`
                <li>
                    <ul>
                        <li><input type="text" name="institutionName", id="institutionName" size="30" required placeholder="Institution name"></input></li>
                        <li><input type="text" name="degree", id="degree" size="50" required placeholder="Degree"></input></li>
                        <li><input type="text" name="institutionLocation", id="institutionLocation" size="50" required placeholder="Location"></input></li>
                        <li><input type="month" name="enrollmentDate", id="enrollmentDate" size="50" required></input></li>
                        <li>
                            <input type="month" name="graduationDate", id="graduationDate" size="50"></input>
                            <input type="checkbox" name="presentEducation${educationCpy}", id="presentEducation${educationCpy}" size="50"></input>
                            <label for="presentEducation${educationCpy}">Present</label>
                        </li>
                        <button type="button" id="AddEducationDescription${educationCpy}">+</button>
                        <button type="button" id="RemoveEducationDescription${educationCpy}">-</button>
                        <ul>
                            <div id="educationDescriptionDropdown${educationCpy}"\>
                        </ul>
                    </ul>
                </li>`,
            "educationDropdown")

        document.getElementById("AddEducationDescription" + educationCpy).addEventListener("click", () => {
            AddHTMLToDOM(`
                        <li>
                            <input type="text" name="educationDescription${educationCpy}", id="educationDescription${educationCpy}" size="50" required placeholder="Description"></input>
                        </li> 
                        `, "educationDescriptionDropdown" + educationCpy)
        })
        document.getElementById("RemoveEducationDescription" + educationCpy).addEventListener("click", () => {
            RemoveLastChildInDOM("educationDescriptionDropdown" + educationCpy)
        })
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