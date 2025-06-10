function RemoveLastChildInDOM(parentName) {
    const parent = document.getElementById(parentName)
    if (parent.lastChild === null)
        return

    parent.removeChild(parent.lastChild)
}

function CreateFormTextField(fieldName, fieldID, fieldSize, required, placeholder, parent){
    const div = document.createElement("div")
    const remove = document.createElement("button")
    const input = document.createElement("input")
    input.type = "text"
    input.name = fieldName
    input.id = fieldID
    input.size = fieldSize
    input.required = required
    input.placeholder = placeholder

    remove.textContent = "-"
    div.classList.add("profileRemoveField")
    input.classList.add("profileTextField")
    remove.classList.add("removeButton")

    div.appendChild(input)
    div.appendChild(remove)
    remove.addEventListener("click", (e) => {
        e.preventDefault()
        parent.removeChild(div)

    })
    parent.appendChild(div)
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

function CreateExpandableSection(addButtonID, addButtonText, dropdownID, expandedFieldID, expandedFieldSize, expandedFieldPlaceholder, parent){
    const addButton = document.createElement("button")
    addButton.id = addButtonID
    addButton.textContent = addButtonText

    const listContents = document.createElement("div")
    const dropdownDiv = document.createElement("div")
    dropdownDiv.id = dropdownID
    listContents.appendChild(dropdownDiv)

    parent.appendChild(addButton)
    parent.appendChild(listContents)

    addButton.onclick = (e) => {
        e.preventDefault()
        CreateFormTextField(expandedFieldID, expandedFieldID, expandedFieldSize, true, expandedFieldPlaceholder, dropdownDiv)
    }
}

function StartNewSection(parent){
    const list = document.createElement("div")
    const listChild = document.createElement("div")
    list.appendChild(listChild)
    parent.appendChild(list)

    return listChild
}

function CreateTextFieldGroup(parent, id, labelText){
    const groupParent = document.createElement("div")
    groupParent.className = "profileFieldGroup"
    const label = document.createElement("label")
    label.className = "profileFieldLabel medMarginBottom"
    label.for = id
    label.textContent = labelText

    const inputField = document.createElement("input")
    inputField.className = "profileTextField"
    inputField.type = "text"
    inputField.id = id

    groupParent.appendChild(label)
    groupParent.appendChild(inputField)
    parent.appendChild(groupParent)
}

function CreateNewLargeListEntry(parent, index){
    const offWhitePanel = document.createElement("div")
    offWhitePanel.className = "offWhiteBackground medTopSpacing smallLeftSpacing smallRightSpacing medBottomSpacing"
    const insetPanel = document.createElement("div")
    insetPanel.className = "profilePanel largeLeftPadding medRightPadding"
    offWhitePanel.appendChild(insetPanel)

    const removeButtonRow = document.createElement("div")
    removeButtonRow.className = "flexHorizontal rightAlign"
    const removeButton = document.createElement("button")
    removeButton.className = "smallerButton extraLargeFont offWhiteBackground"
    removeButton.type = "button"
    removeButton.id = `RemoveEducation ${index}`
    removeButton.textContent = "-"

    removeButton.addEventListener("click", (e)=>{
        e.preventDefault()
        parent.removeChild(offWhitePanel)
    })
    insetPanel.appendChild(removeButtonRow)
    removeButtonRow.appendChild(removeButton)

    const firstContentRow = document.createElement("div")
    firstContentRow.className = "flexHorizontal medGap"

    CreateTextFieldGroup(firstContentRow, "institutionName", "Institution Name")
    CreateTextFieldGroup(firstContentRow, "degree", "Degree")
    CreateTextFieldGroup(firstContentRow, "institutionLocation", "Location")

    const secondContentRow = document.createElement("div")
    secondContentRow.className = "flexHorizontal lgGap"
    const dateRangeColumn = document.createElement("div")
    dateRangeColumn.className = "flexVertical medGap"

    const startDateGroup = document.createElement("div")
    startDateGroup.className = "profileFieldGroup"
    const startDateLabel = document.createElement("label")
    startDateLabel.className = "profileFieldLabel medMarginBottom"
    startDateLabel.for = "startDate"
    startDateLabel.textContent = "Start Date"
    const startDateField = document.createElement("input")
    startDateField.className = "profileDateField"
    startDateField.type = "month"
    startDateField.id = "startDate"
    startDateGroup.appendChild(startDateLabel)
    startDateGroup.appendChild(startDateField)
    dateRangeColumn.appendChild(startDateGroup)

    const endDateGroup = document.createElement("div")
    endDateGroup.className = "profileFieldGroup smGap"
    const dateFieldGroup = document.createElement("div")
    dateFieldGroup.className = "flexVertical"
    const endDateLabel = document.createElement("label")
    endDateLabel.textContent = "End Date"
    endDateLabel.className = "profileFieldLabel medMarginBottom"
    endDateLabel.for = "endDate"
    const endDateInput = document.createElement("input")
    endDateInput.className = "profileDateField"
    endDateInput.type = "month"
    endDateInput.id = "endDate"
    const isPresentGroup = document.createElement("div")
    isPresentGroup.className = "flexHorizontal smGap"
    const presentCheckbox = document.createElement("input")
    presentCheckbox.className = "profileCheckboxField"
    presentCheckbox.type = "checkbox"
    presentCheckbox.id = "present"
    const presentLabel = document.createElement("label")
    presentLabel.className = "profileFieldLabel textCenter"
    presentLabel.for = "present"
    presentLabel.textContent = "Present"
    presentCheckbox.addEventListener("click", (e) => {
        if(!presentCheckbox.checked){
            endDateInput.disabled = false
            return
        }
        endDateInput.disabled = true
        endDateInput.value = "null"
    })
    endDateGroup.appendChild(dateFieldGroup)
    endDateGroup.appendChild(isPresentGroup)
    dateFieldGroup.appendChild(endDateLabel)
    dateFieldGroup.appendChild(endDateInput)
    isPresentGroup.appendChild(presentCheckbox)
    isPresentGroup.appendChild(presentLabel)
    dateRangeColumn.appendChild(endDateGroup)

    const descriptionsGroup = document.createElement("div")
    descriptionsGroup.className = "profileFieldGroup"
    const labelGroup = document.createElement("div")
    labelGroup.className = "rowAlignCentered"
    const descriptionsLabel = document.createElement("div")
    descriptionsLabel.textContent = "Descriptions"
    descriptionsLabel.className = "profileFieldLabel"
    labelGroup.appendChild(descriptionsLabel)
    const dropdown = document.createElement("div")
    dropdown.className = "profileDropdown"
    dropdown.id = "descriptionsDropdown"
    const line = document.createElement("div")
    line.className = "line extraWide"
    const addButtonRow = document.createElement("div")
    addButtonRow.className = "rowAlignCentered"
    const addButton = document.createElement("button")
    addButton.className = "smallerButton offWhiteBackground"
    addButton.textContent = "Add New"
    addButton.type = "button"
    addButton.id = "AddDescription"
    const addSymbol = document.createElement("div")
    addSymbol.textContent = "+"
    addButton.appendChild(addSymbol)
    addButtonRow.appendChild(addButton)

    addButton.addEventListener("click", (e) => {
        e.preventDefault()
        CreateFormTextField("educationDescription", "educationDescription", "50", true, "Description", dropdown)
    })

    descriptionsGroup.appendChild(labelGroup)
    descriptionsGroup.appendChild(dropdown)
    descriptionsGroup.appendChild(line)
    descriptionsGroup.appendChild(addButtonRow)

    secondContentRow.appendChild(dateRangeColumn)
    secondContentRow.appendChild(descriptionsGroup)
    insetPanel.appendChild(firstContentRow)
    insetPanel.appendChild(secondContentRow)
    parent.appendChild(offWhitePanel)
}

educationIndex = 0
document.getElementById("AddEducation").addEventListener("click", () => {
    educationIndex++
    const educationCpy = educationIndex

    CreateNewLargeListEntry(document.getElementById("educationDropdown"))
    // const subSectionParent = StartNewSection(document.getElementById("educationDropdown"))
    // CreateFormTextField("institutionName", "institutionID", 30, true, "Institution name", subSectionParent)
    // CreateFormTextField("degree", "degree", 50, true, "Degree", subSectionParent)
    // CreateFormTextField("institutionLocation", "institutionLocation", 50, true, "Location", subSectionParent)
    // CreateFormDateRangeField("enrollmentDate", "enrollmentDate", 50, true, "month",
    //     "graduationDate", "graduationDate", `presentEducation${educationCpy}`, subSectionParent)
    // CreateExpandableSection(`
    //             AddEducationDescription${educationCpy}`, "+",
    //     `educationDescriptionDropdown${educationCpy}`,
    //     `educationDescription${educationCpy}`, 50, "Description", subSectionParent)
})

document.getElementById("AddPersonalTitle").addEventListener("click", () => {
    CreateFormTextField("personalTitle", "personalTitle", "50", true, "Title", document.getElementById("titlesDropdown"))
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