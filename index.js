const baseURL = 'http://localhost:3000'
const companiesURL = baseURL + '/companies'

const list = document.getElementById("company-list")

const form = document.getElementById("company-form")
const nameInput = document.getElementById("company-name")
const descriptionInput = document.getElementById("company-description")
const locationInput = document.getElementById("company-location")

form.addEventListener('submit', handleFormSubmit)


function handleFormSubmit(event) {
    event.preventDefault()
    const formData = {
        name: nameInput.value,
        location: locationInput.value,
        description: descriptionInput.value
    }

    const configObject = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(formData)
    }

    fetch(companiesURL, configObject)
    .then(response => response.json())
    .then(newData => {
        renderCompany(newData.data)
        form.reset()
    })
}

function getCompanies() {
    
    fetch("http://localhost:3000/companies")
    .then(response => response.json())
    .then(data => renderCompanies(data))

}

function renderCompanies(companyResponse) {
    const companies = companyResponse["data"]
    companies.forEach(company => {
        new Company({id: company.id, ...company.attributes})
        renderCompany(company)
    })
}

function handleCompanyClick(event) {
    if (event.target.innerText === "Edit") {
        renderEditForm(event.target)
        event.target.innerText = "Save"
    } else if (event.target.innerText === "Delete") {
        deleteCompany(event)
    } else if (event.target.innerText === "Save") {
        patchElement(event.target.parentElement)
        event.target.innerText = "Edit"
    }

}

function patchElement(liElement) {

    const name = liElement.querySelector('.update-name').value
    const location = liElement.querySelector('.update-location').value
    const description = liElement.querySelector('.update-description').value

    const formData = {
        name: name,
        location: location,
        description: description
    }

    const configObject = {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(formData)
    }

    const id = liElement.dataset.id

    fetch(companiesURL + "/" + id, configObject)
    .then(response => response.json())
    .then(newData => {
        renderLi(liElement, newData.data)
    })
}

function renderEditForm(editButton) {
    const liElement = editButton.parentElement
    const div = editButton.parentElement.querySelector('div')

    const name = liElement.querySelector('.name').innerText
    const location = liElement.querySelector('.location').innerText
    const description = liElement.querySelector('.description').innerText
    
    div.innerHTML = `
        <input type="text" name="name" class="update-name" value="${name}">
        <input type="text" name="location" class="update-location" value="${location}">
        <input type="text" name="description" class="update-description" value="${description}">
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

getCompanies()