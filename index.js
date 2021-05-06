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

let filteredEnergy = []


form.addEventListener('submit', handleFormSubmit)


function handleFormSubmit(event) {
    event.preventDefault()
    CompanyApi.createCompany()
    form.reset()
}


CompanyApi.getCompanies()

EnergyApi.getEnergies()

// Filter Practice
document.getElementById("myBtn").addEventListener("click", function() {
    console.log(Company.all.sort((a, b) => {
        let nameA = a.name.toLowerCase(),
            nameB = b.name.toLowerCase();
    
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    }))
    list.innerText = ""

    const companies = Company.all

    companies.forEach(company => {
    company.attachToDom()
        })
  })

