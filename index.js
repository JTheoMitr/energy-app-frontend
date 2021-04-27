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
            <strong>${company.attributes.name}</strong>
            <em>${company.attributes.location}:</em>
            <span>${company.attributes.description}</span>
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
        console.log("Edit")
    } else if (event.target.innerText === "Delete") {
        deleteCompany(event)
    }

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