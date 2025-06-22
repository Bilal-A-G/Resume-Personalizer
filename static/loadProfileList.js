function CreateProfileListEntry(parent, index, name){
    const actualName = name.split('|')[0]
    const date = name.split('|')[1]

    const backgroundRow = document.createElement("div")
    backgroundRow.className = "profilesListEntryBG flexHorizontal"
    const profileName = document.createElement("div")
    profileName.textContent = actualName
    profileName.className = "profileListText"
    const dateCreated = document.createElement("div")
    dateCreated.className = "profileListDate"
    dateCreated.textContent = date

    const buttonHolder = document.createElement("div")
    buttonHolder.className = "profileListButtonsHolder smGap"
    
    const editButton = document.createElement("button")
    editButton.className = "navButton"
    const editButtonImage = document.createElement("img")
    editButtonImage.className = "buttonImage"
    editButtonImage.src = "static/images/EditProfile.svg"
    editButton.addEventListener("click", (e)=> {
        e.preventDefault()
        window.location.href = `/profile?name=${name}`
    })
    editButton.appendChild(editButtonImage)

    const deleteButton = document.createElement("button")
    deleteButton.className = "navButton"
    const deleteButtonImage = document.createElement("img")
    deleteButtonImage.className = "buttonImage"
    deleteButtonImage.src = "static/images/TrashProfile.svg"
    deleteButton.addEventListener("click", (e)=> {
        e.preventDefault()
        localStorage.removeItem(name)
        parent.removeChild(backgroundRow)
    })
    deleteButton.appendChild(deleteButtonImage)

    buttonHolder.appendChild(editButton)
    buttonHolder.appendChild(deleteButton)

    backgroundRow.appendChild(profileName)
    backgroundRow.appendChild(dateCreated)
    backgroundRow.appendChild(buttonHolder)

    parent.appendChild(backgroundRow)
}

const numItems = localStorage.length
for(let i = 0; i < numItems; i++){
    CreateProfileListEntry(document.getElementById("profilesDropdown"), i, localStorage.key(i))
}