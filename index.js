const baseURL = 'http://localhost:3000'
const companiesURL = baseURL + '/companies'

const list = document.getElementById("company-list")

const form = document.getElementById("company-form")
const nameInput = document.getElementById("company-name")
const descriptionInput = document.getElementById("company-description")
const locationInput = document.getElementById("company-location")
const websiteInput = document.getElementById("company-website")

const dropdown = document.getElementById('energy-dropdown')

form.addEventListener('submit', handleFormSubmit)


function handleFormSubmit(event) {
    event.preventDefault()
    CompanyApi.createCompany()
    form.reset()
}


// function patchElement(liElement) {

//     const name = liElement.querySelector('.update-name').value
//     const location = liElement.querySelector('.update-location').value
//     const description = liElement.querySelector('.update-description').value

//     const formData = {
//         name: name,
//         location: location,
//         description: description
//     }

//     const configObject = {
//         method: 'PATCH',
//         headers: {
//             "Content-Type": "application/json",
//             "Accept": "application/json"
//         },
//         body: JSON.stringify(formData)
//     }

//     const id = liElement.dataset.id

//     fetch(companiesURL + "/" + id, configObject)
//     .then(response => response.json())
//     .then(newData => {
//         renderLi(liElement, newData.data)
//     })
// }

function renderEditForm(editButton) {
    const liElement = editButton.parentElement
    const div = editButton.parentElement.querySelector('div')

    const name = liElement.querySelector('.name').innerText
    const location = liElement.querySelector('.location').innerText
    const description = liElement.querySelector('.description').innerText
    const website = liElement.querySelector('.website').href
    
    div.innerHTML = `
        <input type="text" name="name" class="update-name" value="${name}">
        <input type="text" name="location" class="update-location" value="${location}">
        <input type="text" name="description" class="update-description" value="${description}">
        <input type="text" name="website" class="update-website" value="${website}">
    `
}

function deleteCompany(event) {
    const id = event.target.dataset.id
    event.target.parentElement.remove()

    const configObject = {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    }

    fetch(companiesURL + "/" + id, configObject)
    .then(response => response.json())
    .then(newData => {
        alert(newData.message)
    })
}

CompanyApi.getCompanies()

EnergyApi.getEnergies()