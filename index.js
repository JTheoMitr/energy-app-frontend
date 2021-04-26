const list = document.getElementById("company-list")

const form = document.getElementById("company-form")
const nameInput = document.getElementById("company-name")
const descriptionInput = document.getElementById("company-description")
const locationInput = document.getElementById("company-location")

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