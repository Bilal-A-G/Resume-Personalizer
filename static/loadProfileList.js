function RecalculateNoprofiles() {
    const profilesFoundDiv = document.getElementById("profilesFound")
    const noProfilesDiv = document.getElementById("noProfiles")

    if (localStorage.length > 0) {
        noProfilesDiv.classList.remove("visible")
        noProfilesDiv.classList.add("hidden")
        profilesFoundDiv.classList.remove("hidden")
        profilesFoundDiv.classList.add("visibleFlex")
    }
    else {
        profilesFoundDiv.classList.remove("visibleFlex")
        profilesFoundDiv.classList.add("hidden")
        noProfilesDiv.classList.remove("hidden")
        noProfilesDiv.classList.add("visible")
    }
}

const hiddenOverlay = document.getElementById("hiddenOverlayConfirm")
const blurOverlay = document.getElementById("blurOverlayConfirm")
const contents = document.getElementById("deleteProfileContents")

function FadeElementsOut() {
    console.log("Fading")
    hiddenOverlay.classList.remove("fadeBackgroundIn")
    contents.classList.remove("fadeOpacityIn")
    blurOverlay.classList.remove("fadeBlurIn")

    void blurOverlay.offsetWidth
    void contents.offsetWidth
    void hiddenOverlay.offsetWidth

    hiddenOverlay.classList.add("fadeBackgroundOut")
    contents.classList.add("fadeOpacityOut")
    blurOverlay.classList.add("fadeBlurOut")
}

function FadeElementsIn() {
    hiddenOverlay.classList.remove("fadeBackgroundOut")
    contents.classList.remove("fadeOpacityOut")
    blurOverlay.classList.remove("fadeBlurOut")

    void blurOverlay.offsetWidth
    void contents.offsetWidth
    void hiddenOverlay.offsetWidth

    hiddenOverlay.classList.add("fadeBackgroundIn")
    contents.classList.add("fadeOpacityIn")
    blurOverlay.classList.add("fadeBlurIn")

    hiddenOverlay.style.display = "flex"

}

const cancelButton = document.getElementById("Cancel")
const confirmButton = document.getElementById("Confirm")

function CreateProfileListEntry(parent, index, name) {
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
    editButton.className = "smallButton"
    const editButtonImage = document.createElement("img")
    editButtonImage.className = "buttonImage"
    editButtonImage.src = "static/images/EditProfile.svg"
    editButton.addEventListener("click", (e) => {
        e.preventDefault()
        window.location.href = `/profile?name=${name}`
    })
    editButton.appendChild(editButtonImage)

    const deleteButton = document.createElement("button")
    deleteButton.className = "smallButton"
    const deleteButtonImage = document.createElement("img")
    deleteButtonImage.className = "buttonImage"
    deleteButtonImage.src = "static/images/TrashProfile.svg"
    deleteButton.addEventListener("click", (e) => {
        e.preventDefault()
        FadeElementsIn()
        const text = document.getElementById("deleteText")
        text.textContent = `Attempted to delete profile : ${actualName}`
        
        cancelButton.addEventListener("click", FadeElementsOut)
        confirmButton.onclick = function(){
            localStorage.removeItem(name)
            parent.removeChild(backgroundRow)
            RecalculateNoprofiles()
            FadeElementsOut()
        }
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
for (let i = 0; i < numItems; i++) {
    CreateProfileListEntry(document.getElementById("profilesDropdown"), i, localStorage.key(i))
}

hiddenOverlay.addEventListener("animationend", (event) => {
    if (hiddenOverlay.classList.contains("fadeBackgroundOut")) {
        hiddenOverlay.style.display = "none"
    }
})

RecalculateNoprofiles()