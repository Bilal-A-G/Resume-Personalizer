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

function CreateTextFieldGroup(parent, id, labelText, sizeCSS = ""){
    const groupParent = document.createElement("div")
    groupParent.className = "profileFieldGroup " + sizeCSS
    const label = document.createElement("label")
    label.className = "profileFieldLabel medMarginBottom"
    label.for = id
    label.textContent = labelText

    const inputField = document.createElement("input")
    inputField.className = "profileTextField"
    inputField.type = "text"
    inputField.name = id
    inputField.id = id

    groupParent.appendChild(label)
    groupParent.appendChild(inputField)
    parent.appendChild(groupParent)
}

function CreateDateRangeFields(parent, startID, endID, presentID, index){
    const startDateGroup = document.createElement("div")
    startDateGroup.className = "profileFieldGroup spanHalf"
    const startDateLabel = document.createElement("label")
    startDateLabel.className = "profileFieldLabel medMarginBottom"
    startDateLabel.for = startID
    startDateLabel.textContent = "Start Date"
    const startDateField = document.createElement("input")
    startDateField.className = "profileDateField"
    startDateField.type = "month"
    startDateField.id = startID
    startDateField.name = startID
    startDateGroup.appendChild(startDateLabel)
    startDateGroup.appendChild(startDateField)
    parent.appendChild(startDateGroup)

    const endDateGroup = document.createElement("div")
    endDateGroup.className = "profileFieldGroup smGap spanHalf positionUnder"
    const dateFieldGroup = document.createElement("div")
    dateFieldGroup.className = "flexVertical"
    const endDateLabel = document.createElement("label")
    endDateLabel.textContent = "End Date"
    endDateLabel.className = "profileFieldLabel medMarginBottom"
    endDateLabel.for = endID + `${index}`
    const endDateInput = document.createElement("input")
    endDateInput.className = "profileDateField"
    endDateInput.type = "month"
    endDateInput.id = endID + `${index}`
    endDateInput.name = endID + `${index}`
    const isPresentGroup = document.createElement("div")
    isPresentGroup.className = "flexHorizontal smGap smTopSpacing"
    const presentCheckbox = document.createElement("input")
    presentCheckbox.className = "profileCheckboxField"
    presentCheckbox.type = "checkbox"
    presentCheckbox.id = presentID + `${index}`
    presentCheckbox.name = presentID + `${index}`
    const presentLabel = document.createElement("label")
    presentLabel.className = "profileFieldLabel textCenter"
    presentLabel.for = presentID + `${index}`
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

    parent.appendChild(endDateGroup)
}

function CreateTextFieldList(parent, index, listName, dropdownID, addButtonID, fieldID, fieldPlaceholder, size, sizeCSS){
    const descriptionsGroup = document.createElement("div")
    descriptionsGroup.className = "profileFieldGroup " + sizeCSS
    const labelGroup = document.createElement("div")
    labelGroup.className = "rowAlignCentered"
    const descriptionsLabel = document.createElement("div")
    descriptionsLabel.textContent = listName
    descriptionsLabel.className = "profileFieldLabel medMarginBottom"
    labelGroup.appendChild(descriptionsLabel)
    const dropdown = document.createElement("div")
    dropdown.className = "profileDropdown"
    dropdown.id = dropdownID + `${index}`
    const line = document.createElement("div")
    line.className = "line"
    const addButtonRow = document.createElement("div")
    addButtonRow.className = "rowAlignCentered"
    const addButton = document.createElement("button")
    addButton.className = "smallButton offWhiteBackground"
    addButton.textContent = "Add New"
    addButton.type = "button"
    addButton.id = addButtonID + `${index}`
    const addSymbol = document.createElement("div")
    addSymbol.textContent = "+"
    addButton.appendChild(addSymbol)
    addButtonRow.appendChild(addButton)

    addButton.addEventListener("click", (e) => {
        e.preventDefault()
        CreateFormTextField(fieldID +`${index}`, fieldID +`${index}`, size, true, fieldPlaceholder, dropdown)
    })

    descriptionsGroup.appendChild(labelGroup)
    descriptionsGroup.appendChild(dropdown)
    descriptionsGroup.appendChild(line)
    descriptionsGroup.appendChild(addButtonRow)

    parent.appendChild(descriptionsGroup)
}

function CreateRemoveButton(parent, root, panel, index){
    const removeButtonRow = document.createElement("div")
    removeButtonRow.className = "flexHorizontal rightAlign remButtonRow"
    const removeButton = document.createElement("button")
    removeButton.className = "smallButton offWhiteBackground"
    removeButton.type = "button"
    removeButton.id = `RemoveExperience${index}`
    removeButton.textContent = "Remove Item"

    const removeImage = document.createElement("div")
    removeImage.textContent = "-"
    removeImage.className = "medFont"

    removeButton.appendChild(removeImage)

    removeButton.addEventListener("click", (e)=>{
        e.preventDefault()
        root.removeChild(panel)
    })

    removeButtonRow.appendChild(removeButton)
    parent.appendChild(removeButtonRow)
}

function EducationSection(parent, index){
    const offWhitePanel = document.createElement("div")
    offWhitePanel.className = "offWhiteBackground centeredWidth topSpacing bottomSpacing"
    const insetPanel = document.createElement("div")
    insetPanel.className = "profilePanel topSpacing bottomSpacing"

    CreateRemoveButton(insetPanel, parent, offWhitePanel, index)

    const gridRow = document.createElement("div")
    gridRow.className = "educationGrid"

    CreateTextFieldGroup(gridRow, "institutionName", "Institution Name")
    CreateTextFieldGroup(gridRow, "degree", "Degree")
    CreateTextFieldGroup(gridRow, "institutionLocation", "Location")

    CreateDateRangeFields(gridRow, "enrollmentDate", "graduationDate", "presentEducation", index)
    CreateTextFieldList(gridRow, index, "Descriptions", 
        "educationDescriptionDropdown", "AddEducationDescription", "educationDescription", "Description", "47", "tripleWide")

    insetPanel.appendChild(gridRow)
    offWhitePanel.appendChild(insetPanel)
    parent.appendChild(offWhitePanel)
}

function ExperienceSection(parent, index){
    const offWhitePanel = document.createElement("div")
    offWhitePanel.className = "offWhiteBackground centeredWidth topSpacing bottomSpacing"
    const insetPanel = document.createElement("div")
    insetPanel.className = "profilePanel topSpacing bottomSpacing"

    CreateRemoveButton(insetPanel, parent, offWhitePanel, index)

    const gridRow = document.createElement("div")
    gridRow.className = "experienceGrid"

    CreateTextFieldGroup(gridRow, "companyName", "Company Name")
    CreateTextFieldGroup(gridRow, "jobTitle", "Title")
    CreateTextFieldGroup(gridRow, "jobLocation", "Location")
    CreateDateRangeFields(gridRow, "jobStart", "jobEnd", "presentJob", index)
    
    CreateTextFieldList(gridRow, index, "Tags", 
        "tagDropdown", "AddTag", "jobTag", "Tag", "24", "normal")
    CreateTextFieldList(gridRow, index, "Descriptions", 
        "jobDescriptionDropdown", "AddJobDescription", "responsibility", "Description", "47", "extraWide")

    insetPanel.appendChild(gridRow)
    offWhitePanel.appendChild(insetPanel)
    parent.appendChild(offWhitePanel)
}

function ProjectSection(parent, index){
    const offWhitePanel = document.createElement("div")
    offWhitePanel.className = "offWhiteBackground centeredWidth topSpacing bottomSpacing"
    const insetPanel = document.createElement("div")
    insetPanel.className = "profilePanel topSpacing bottomSpacing"

    CreateRemoveButton(insetPanel, parent, offWhitePanel, index)

    const gridRow = document.createElement("div")
    gridRow.className = "projectGrid"

    CreateTextFieldGroup(gridRow, "projectName", "Project Name", "wide")
    CreateDateRangeFields(gridRow, "projectStart", "projectEnd", "presentProject", index)

    CreateTextFieldList(gridRow, index, "Tags", 
        "projectTagDropdown", "AddProjectTag", "projectTag", "Tag", "24", "normal")
    CreateTextFieldList(gridRow, index, "Descriptions", 
        "projectsDescriptionDropdown", "AddProjectDescription", "projectDescription", "Description", "47", "extraWide")

    insetPanel.appendChild(gridRow)

    offWhitePanel.appendChild(insetPanel)
    parent.appendChild(offWhitePanel)
}

function CategorizedSkillsSection(parent, index){
    const offWhitePanel = document.createElement("div")
    offWhitePanel.className = "offWhiteBackground medTopSpacing medLeftSpacing medRightSpacing medBottomSpacing"
    const insetPanel = document.createElement("div")
    insetPanel.className = "profilePanel largeLeftPadding medRightPadding"

    const removeButtonRow = document.createElement("div")
    removeButtonRow.className = "flexHorizontal rightAlign"
    const removeButton = document.createElement("button")
    removeButton.className = "smallerButton extraLargeFont offWhiteBackground"
    removeButton.type = "button"
    removeButton.id = `RemoveProject${index}`
    removeButton.textContent = "-"

    removeButton.addEventListener("click", (e)=>{
        e.preventDefault()
        parent.removeChild(offWhitePanel)
    })
    insetPanel.appendChild(removeButtonRow)
    removeButtonRow.appendChild(removeButton)

    const firstContentRow = document.createElement("div")
    firstContentRow.className = "flexHorizontal lgGap"

    CreateTextFieldGroup(firstContentRow, "categoryName", "Category Name", "wide")
    CreateTextFieldList(firstContentRow, index, "Skills", 
        "skillsDropdown", "AddCategorizedSkill", "categorizedSkill", "Skill", "47", "extraWide")
    
    insetPanel.appendChild(firstContentRow)

    offWhitePanel.appendChild(insetPanel)
    parent.appendChild(offWhitePanel)
}

document.getElementById("AddPersonalTitle").addEventListener("click", () => {
    CreateFormTextField("personalTitle", "personalTitle", "47", true, "Title", document.getElementById("titlesDropdown"))
})

educationIndex = 0
document.getElementById("AddEducation").addEventListener("click", () => {
    educationIndex++
    const educationCpy = educationIndex
    EducationSection(document.getElementById("educationDropdown"), educationCpy)
})

experienceIndex = 0
document.getElementById("AddExperience").addEventListener("click", () => {
    experienceIndex++
    const expCopy = experienceIndex
    ExperienceSection(document.getElementById("experienceDropdown"), expCopy)
})

projectIndex = 0
document.getElementById("AddProject").addEventListener("click", () => {
    projectIndex++
    const projCpy = projectIndex
    ProjectSection(document.getElementById("projectsDropdown"), projCpy)
})

categoryIndex = 0
document.getElementById("AddCategorizedSkill").addEventListener("click", () => {
    categoryIndex++
    const categoryCpy = categoryIndex
    CategorizedSkillsSection(document.getElementById("categorizedSkillsDropdown"), categoryCpy)
})

document.getElementById("AddUnclassifiedSkill").addEventListener("click", () => {
    CreateFormTextField("unclassifiedSkill", "unclassifiedSkill", "24", true, 
        "Skill", document.getElementById("unclassifiedSkillsDropdown"))
})

document.getElementById("AddAccomplishment").addEventListener("click", () => {
    CreateFormTextField("accomplishment", "accomplishment", "47", true, 
        "Accomplishment", document.getElementById("accomplishmentsDropdown"))
})