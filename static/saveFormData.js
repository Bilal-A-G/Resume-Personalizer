document.getElementById("profileForm").addEventListener("submit", (e) => {
    e.preventDefault()


    jsonString = '{'
    formData = new FormData(document.getElementById("profileForm"))
    const personalTitles = formData.getAll("personalTitle")

    jsonString += `"profileName": "${formData.get("profileName")}", `
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
    const titles = formData.getAll("jobTitle")
    const jobLocations = formData.getAll("jobLocation")
    const jobStartDates = formData.getAll("jobStart")
    const jobEndDates = formData.getAll("jobEnd")

    for (i = 0; i < companyNames.length; i++) {
        const present = formData.get(`presentJob${i + 1}`)
        jsonString += `{"companyName": "${companyNames[i]}", "jobLocation": "${jobLocations[i]}",
                    "jobTitles": "${titles[i]}", "jobStartDate": "${jobStartDates[i]}", "jobEndDate": "${jobEndDates[i]}",
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
    const skills = formData.getAll("unclassifiedSkill")
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
    jsonString += `"unclassifiedSkills": {"alias": "${skillsAlias}", "data": [`
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

    const profileName = formData.get("profileName")
    for(i = 0; i < localStorage.length; i++){
        let key = localStorage.key(i)
        key = key.split('|')[0]
        if(key == profileName)
            localStorage.removeItem(localStorage.key(i))
    }

    const dateOptions = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    }
    localStorage.setItem((profileName + "|" + new Date().toLocaleDateString("en-US", dateOptions)), jsonString)
    window.location.href = "/profiles"
})
