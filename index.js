const baseURL = 'http://localhost:3000'
const companiesURL = baseURL + '/companies'
const list = document.getElementById("company-list")
const form = document.getElementById("company-form")

// FORM INPUTS
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