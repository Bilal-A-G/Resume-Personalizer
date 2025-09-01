function RemoveLastChildInDOM(parentName) {
    const parent = document.getElementById(parentName)
    if (parent.lastChild === null)
        return

    parent.removeChild(parent.lastChild)
}

function CreateFormTextField(fieldName, fieldID, fieldSize, required, placeholder, parent, favourite = false){
    const div = document.createElement("div")
    const remove = document.createElement("button")
    const input = document.createElement("input")
    input.type = "text"
    input.name = fieldName
    input.id = fieldID
    input.required = required
    input.placeholder = placeholder

    remove.textContent = "-"
    div.className = "w-100 aIRC d-f"
    remove.className = "br-02em btn bg-w ml-01em pL-1em pR-1em" 
    
    div.appendChild(input)
    input.className = "t-B bB b-0px pA-05em br-02em"
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
    groupParent.className = "s-2col w-100" 
    const label = document.createElement("label")
    label.className = "t-B t-bol aIRC-r d-f"
    label.for = id
    label.textContent = labelText

    const inputField = document.createElement("input")
    inputField.className = "t-B bB b-0px pA-05em bR-02em"
    inputField.type = "text"
    inputField.name = id
    inputField.id = id

    groupParent.appendChild(label)
    groupParent.appendChild(inputField)
    parent.appendChild(groupParent)
}

function CreateDateRangeFields(parent, startID, endID, presentID, index){
    const startDateGroup = document.createElement("div")
    startDateGroup.className = "w-100"
    const startDateLabel = document.createElement("label")
    startDateLabel.className = "t-B t-bol aIRC-r d-f"
    startDateLabel.for = startID
    startDateLabel.textContent = "Start Date"
    const startDateField = document.createElement("input")
    startDateField.className = "bB t-B t-bol b-0px br-02em w-100 pA-05em"
    startDateField.type = "month"
    startDateField.id = startID
    startDateField.name = startID
    startDateGroup.appendChild(startDateLabel)
    startDateGroup.appendChild(startDateField)
    parent.appendChild(startDateGroup)

    const endDateGroup = document.createElement("div")
    endDateGroup.className = "w-100 grst-3"
    const dateFieldGroup = document.createElement("div")
    dateFieldGroup.className = "d-f aICC"
    const endDateLabel = document.createElement("label")
    endDateLabel.textContent = "End Date"
    endDateLabel.className = "t-B t-bol aIRC-r d-f"
    endDateLabel.for = endID + `${index}`
    const endDateInput = document.createElement("input")
    endDateInput.className = "bB t-B t-bol b-0px br-02em w-100 pA-05em"
    endDateInput.type = "month"
    endDateInput.id = endID + `${index}`
    endDateInput.name = endID + `${index}`
    const isPresentGroup = document.createElement("div")
    isPresentGroup.className = "d-f aIRC mt-05em"
    const presentCheckbox = document.createElement("input")
    presentCheckbox.className = "h-100 w-2em aIRS"
    presentCheckbox.type = "checkbox"
    presentCheckbox.id = presentID + `${index}`
    presentCheckbox.name = presentID + `${index}`
    const presentLabel = document.createElement("label")
    presentLabel.className = "t-B t-bol mt-03em d-f"
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

function CreateTextFieldList(parent, index, listName, dropdownID, addButtonID, fieldID, fieldPlaceholder, size, sizeCSS, favourite = false){
    const descriptionsGroup = document.createElement("div")
    descriptionsGroup.className = "w-100 gcs-5 grs-3 mH-200px" 
    const labelGroup = document.createElement("div")
    labelGroup.className = "aIRC d-f"
    const descriptionsLabel = document.createElement("div")
    descriptionsLabel.textContent = listName
    descriptionsLabel.className = "t-bol t-B aIRC-r d-f"
    labelGroup.appendChild(descriptionsLabel)
    const dropdown = document.createElement("div")
    dropdown.className = "gp-03em d-f aICC mH-110px oy-a ox-h sb-s"
    dropdown.id = dropdownID + `${index}`
    const line = document.createElement("div")
    line.className = "w-100 h-2px bg-b"
    const addButtonRow = document.createElement("div")
    addButtonRow.className = "aIRC d-f mt-1em"
    const addButton = document.createElement("button")
    addButton.className = "btn pA-05em"
    addButton.textContent = "Add New"
    addButton.type = "button"
    addButton.id = addButtonID + `${index}`
    const addSymbol = document.createElement("div")
    addSymbol.textContent = "+"
    addButton.appendChild(addSymbol)
    addButtonRow.appendChild(addButton)

    addButton.addEventListener("click", (e) => {
        e.preventDefault()
        CreateFormTextField(fieldID +`${index}`, fieldID +`${index}`, size, true, fieldPlaceholder, dropdown, favourite)
    })

    descriptionsGroup.appendChild(labelGroup)
    descriptionsGroup.appendChild(dropdown)
    descriptionsGroup.appendChild(line)
    descriptionsGroup.appendChild(addButtonRow)

    parent.appendChild(descriptionsGroup)
}

function CreateRemoveButton(parent, root, panel, index){
    const removeButtonRow = document.createElement("div")
    removeButtonRow.className = "d-f rightAlign remButtonRow"
    const removeButton = document.createElement("button")
    removeButton.className = "btn pA-05em"
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
    offWhitePanel.className = "d-f mL-a mR-a bg-llg mW-1500px mt-2em mb-2em"
    const insetPanel = document.createElement("div")
    insetPanel.className = "d-f dfd-c aIRC mt-1em mb-1em ml-2em mr-2em w-100"

    CreateRemoveButton(insetPanel, parent, offWhitePanel, index)

    const gridRow = document.createElement("div")
    gridRow.className = "educationGrid"

    CreateTextFieldGroup(gridRow, "institutionName", "Institution Name")
    CreateTextFieldGroup(gridRow, "degree", "Degree")
    CreateTextFieldGroup(gridRow, "institutionLocation", "Location")

    CreateDateRangeFields(gridRow, "enrollmentDate", "graduationDate", "presentEducation", index)
    CreateTextFieldList(gridRow, index, "Descriptions", 
        "educationDescriptionDropdown", "AddEducationDescription", "educationDescription", "Description", "47", "tripleWide", true)

    insetPanel.appendChild(gridRow)
    offWhitePanel.appendChild(insetPanel)
    parent.appendChild(offWhitePanel)
}

function ExperienceSection(parent, index){
    const offWhitePanel = document.createElement("div")
    offWhitePanel.className = "d-f mR-a mL-a bg-llg mW-1500px mt-2em mb-2em"
    const insetPanel = document.createElement("div")
    insetPanel.className = "d-f dfd-c aIRC mt-1em mb-1em ml-2em mr-2em w-100"

    CreateRemoveButton(insetPanel, parent, offWhitePanel, index)

    const gridRow = document.createElement("div")
    gridRow.className = "experienceGrid"

    CreateTextFieldGroup(gridRow, "companyName", "Company Name")
    CreateTextFieldGroup(gridRow, "jobTitle", "Title")
    CreateTextFieldGroup(gridRow, "jobLocation", "Location")
    CreateDateRangeFields(gridRow, "jobStart", "jobEnd", "presentJob", index)
    
    CreateTextFieldList(gridRow, index, "Tags", 
        "tagDropdown", "AddTag", "jobTag", "Tag", "24", "spanHalfList")
    CreateTextFieldList(gridRow, index, "Descriptions", 
        "jobDescriptionDropdown", "AddJobDescription", "responsibility", "Description", "47", "extraWide")

    insetPanel.appendChild(gridRow)
    offWhitePanel.appendChild(insetPanel)
    parent.appendChild(offWhitePanel)
}

function ProjectSection(parent, index){
    const offWhitePanel = document.createElement("div")
    offWhitePanel.className = "d-f mR-a mL-a bg-llg mW-1500px mt-2em mb-2em"
    const insetPanel = document.createElement("div")
    insetPanel.className = "d-f dfd-c aIRC mt-1em mb-1em ml-2em mr-2em w-100"

    CreateRemoveButton(insetPanel, parent, offWhitePanel, index)

    const gridRow = document.createElement("div")
    gridRow.className = "projectGrid"

    CreateTextFieldGroup(gridRow, "projectName", "Project Name", "wide")
    CreateDateRangeFields(gridRow, "projectStart", "projectEnd", "presentProject", index)

    CreateTextFieldList(gridRow, index, "Tags", 
        "projectTagDropdown", "AddProjectTag", "projectTag", "Tag", "24", "spanHalfList")
    CreateTextFieldList(gridRow, index, "Descriptions", 
        "projectsDescriptionDropdown", "AddProjectDescription", "projectDescription", "Description", "47", "extraWide")

    insetPanel.appendChild(gridRow)

    offWhitePanel.appendChild(insetPanel)
    parent.appendChild(offWhitePanel)
}

function CategorizedSkillsSection(parent, index){
    const offWhitePanel = document.createElement("div")
    offWhitePanel.className = "d-f mL-a mR-a bg-llg mW-1500px mt-2em mb-2em"
    const insetPanel = document.createElement("div")
    insetPanel.className = "d-f dfd-c aIRC mt-1em mb-1em ml-2em mr-2em w-100"

    CreateRemoveButton(insetPanel, parent, offWhitePanel, index)

    const gridRow = document.createElement("div")
    gridRow.className = "skillsGrid"

    CreateTextFieldGroup(gridRow, "categoryName", "Category Name", "")
    CreateTextFieldList(gridRow, index, "Skills", 
        "skillsDropdown", "AddCategorizedSkill", "categorizedSkill", "Skill", "47", "wide")
    
    insetPanel.appendChild(gridRow)

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