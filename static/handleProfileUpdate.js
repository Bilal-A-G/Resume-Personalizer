function RemoveLastChildInDOM(parentName) {
    const parent = document.getElementById(parentName)
    if (parent.lastChild === null)
        return

    parent.removeChild(parent.lastChild)
}

function CreateFormTextField(fieldName, fieldID, fieldSize, required, placeholder, parent){
    const input = document.createElement("input")
    input.type = "text"
    input.name = fieldName
    input.id = fieldID
    input.size = fieldSize
    input.required = required
    input.placeholder = placeholder
    input.classList.add("profileTextField")

    parent.appendChild(input)
}

function CreateFormDateRangeField(startFieldName, startFieldID, fieldSize, required, dateType,
    endFieldName, endFieldID, checkboxFieldID, parent){
    const startDateList = document.createElement("div")
    const startDateInput = document.createElement("input")

    startDateInput.type = dateType
    startDateInput.name = startFieldName
    startDateInput.id = startFieldID
    startDateInput.size = fieldSize
    startDateInput.required = required

    startDateList.appendChild(startDateInput)
    const endDateList = document.createElement("div")
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

    const listContents = document.createElement("div")
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
    const list = document.createElement("div")
    const listChild = document.createElement("div")
    list.appendChild(listChild)
    parent.appendChild(list)

    return listChild
}

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
    CreateFormTextField("personalTitle", "personalTitle", "80", true, "Title", document.getElementById("titlesDropdown"))
})
document.getElementById("RemovePersonalTitle").addEventListener("click", () => {
    RemoveLastChildInDOM("titlesDropdown")
})

experienceIndex = 0
document.getElementById("AddExperience").addEventListener("click", () => {
    experienceIndex++
    const expCopy = experienceIndex
    const subSectionParent = StartNewSection(document.getElementById("experienceDropdown"))
    CreateFormTextField("companyName", "companyName", 30, true, "Company Name", subSectionParent)
    CreateFormTextField("title", "title", 50, true, "Title", subSectionParent)
    CreateFormTextField("companyLocation", "companyLocation", 50, true, "Location", subSectionParent)
    CreateFormDateRangeField("jobStart", "jobStart", 50, true, "month", "jobEnd", "jobEnd", 
        `presentJob${expCopy}`, subSectionParent)

    CreateExpandableSection(`AddTag${expCopy}`, "+", `RemoveTag${expCopy}`, "-", `tagDropdown${expCopy}`, 
        `jobTag${expCopy}`, 10, "Tag", subSectionParent)
    CreateExpandableSection(`AddDescription${expCopy}`, "++", `RemoveDescription${expCopy}`, "--", "descriptionDropdown", 
        `responsibility${expCopy}`, 50, "Responsibility", subSectionParent)
})
document.getElementById("RemoveExperience").addEventListener("click", () => {
    RemoveLastChildInDOM("experienceDropdown")
    experienceIndex--
})

projectIndex = 0
document.getElementById("AddProject").addEventListener("click", () => {
    projectIndex++
    const projCpy = projectIndex
    const subSectionParent = StartNewSection(document.getElementById("projectsDropdown"))
    CreateFormTextField("projectName", "projectName", 50, true, "Name", subSectionParent)
    CreateFormDateRangeField("projectStart", "projectStart", 50, true, "month", "projectEnd", 
        "projectEnd", `presentProject${projCpy}`, subSectionParent)

    CreateExpandableSection(`AddProjectTag${projCpy}`, "+", `RemoveProjectTag${projCpy}`, "-", `projectTagDropdown${projCpy}`,
        `projectTag${projCpy}`, 10, "Tag", subSectionParent)
    CreateExpandableSection(`AddProjectDescription${projCpy}`, "++", `RemoveProjectDescription${projCpy}`, "--", `projectsDescriptionDropdown${projCpy}`, 
        `projectDescription${projCpy}`, 50, "Description", subSectionParent)
})
document.getElementById("RemoveProject").addEventListener("click", () => {
    RemoveLastChildInDOM("projectsDropdown")
    projectIndex--
})

categoryIndex = 0
document.getElementById("AddCategory").addEventListener("click", () => {
    categoryIndex++
    const categoryCpy = categoryIndex
    const subSectionParent = StartNewSection(document.getElementById("categorizedSkillsDropdown"))
    CreateFormTextField("categoryName", "categoryName", 50, true, "Category Name", subSectionParent)
    CreateExpandableSection(`AddSkillToCategory${categoryCpy}`, "+", `RemoveSkillFromCategory${categoryCpy}`, "-", 
        `categorySkillsDropdown${categoryCpy}`, `categorizedSkill${categoryCpy}`, 50, "Skill", subSectionParent)
})
document.getElementById("RemoveCategory").addEventListener("click", () => {
    RemoveLastChildInDOM("categorizedSkillsDropdown")
    projectIndex--
})

document.getElementById("AddSkill").addEventListener("click", () => {
    const subSectionParent = StartNewSection(document.getElementById("skillsDropdown"))
    CreateFormTextField("skill", "skill", 50, true, "Skill", subSectionParent)
})
document.getElementById("RemoveSkill").addEventListener("click", () => {
    RemoveLastChildInDOM("skillsDropdown")
})

document.getElementById("AddAccomplishment").addEventListener("click", () => {
    const subSectionParent = StartNewSection(document.getElementById("accomplishmentsDropdown"))
    CreateFormTextField("accomplishment", "accomplishment", 80, true, "Accomplishment", subSectionParent)
})
document.getElementById("RemoveAccomplishment").addEventListener("click", () => {
    RemoveLastChildInDOM("accomplishmentsDropdown")
})