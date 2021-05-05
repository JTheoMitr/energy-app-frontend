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


document.getElementById("myBtn").addEventListener("click", function() {
    console.log(Company.all.sort((a, b) => {
        let fa = a.name.toLowerCase(),
            fb = b.name.toLowerCase();
    
        if (fa < fb) {
            return -1;
        }
        if (fa > fb) {
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

