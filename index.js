const baseURL = 'http://localhost:3000'
const companiesURL = baseURL + '/companies'
const list = document.getElementById("company-list")
const form = document.getElementById("company-form")
const energyForm = document.getElementById("energy-form")

// FORM INPUTS
const nameInput = document.getElementById("company-name")
const descriptionInput = document.getElementById("company-description")
const locationInput = document.getElementById("company-location")
const websiteInput = document.getElementById("company-website")
const dropdown = document.getElementById('energy-dropdown')

const energyName = document.getElementById("energy-name")

let filteredEnergy = []


form.addEventListener('submit', handleFormSubmit)
energyForm.addEventListener('submit', newEnergySubmit)


function handleFormSubmit(event) {
    event.preventDefault()
    CompanyApi.createCompany()
    form.reset()
}

function newEnergySubmit(event) {
    event.preventDefault()
    EnergyApi.createEnergy()
    energyForm.reset()
}


CompanyApi.getCompanies()

EnergyApi.getEnergies()

// Filter Practice

document.getElementById("abcBtn").addEventListener("click", Company.companiesAbc)


