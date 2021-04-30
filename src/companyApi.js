
class CompanyApi {
    static baseURL = 'http://localhost:3000/companies'

    static getCompanies() {
    
        fetch(this.baseURL) // this.baseURL instead of just baseURL because it is a static variable in the CompanyApi class
        .then(response => response.json())
        .then(newData => {
            
            const companies = newData["data"]
            companies.forEach(company => {

                const c = new Company({id: company.id, ...company.attributes})
                c.attachToDom()
             })
        })
    
    }

    static createCompany() {
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
    
        fetch(this.baseURL, configObject)
        .then(response => response.json())
        .then(newData => {
            const company = newData.data
            const c = new Company({id: company.id, ...company.attributes})
            c.attachToDom()
        })
    }
}
