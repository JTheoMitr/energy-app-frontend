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
        renderCompany(company)
    })
}

function renderCompany(company) {
        const li = document.createElement("li")
        li.id = `company-${company.id}`
        li.dataset.id = company.id

        li.innerHTML = `

            <div data-id="${company.id}">
            <strong class="name">${company.attributes.name}</strong><br></br>
            <em class="location">${company.attributes.location}</em><br></br>
            <span class="description">${company.attributes.description}</span><br></br>
            </div>

            <button class="edit" data-id="${company.id}">Edit</button>
            <button class="delete" data-id="${company.id}">Delete</button>
            <br></br>

        `

        // const deleteBtn = li.querySelector('.delete')
        // deleteBtn.addEventListener('click', deleteCompany)
        li.addEventListener('click', handleCompanyClick)

        list.appendChild(li)
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
    //STOPPED HERE
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