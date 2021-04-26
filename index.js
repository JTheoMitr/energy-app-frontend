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
    .then(data => {
        console.log(data)
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

        li.innerHTML = `

            <div>
            <strong>${company.attributes.name}</strong>
            <em>${company.attributes.location}:</em>
            <span>${company.attributes.description}</span>
            </div>

            <button data-id="${company.id}">Edit</button>
            <button data-id="${company.id}">Delete</button>
            <br></br>

        `
    
        list.appendChild(li)
}

getCompanies()