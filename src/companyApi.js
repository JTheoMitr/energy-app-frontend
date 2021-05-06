
class CompanyApi {
    static baseURL = 'http://localhost:3000/companies'

    static getCompanies() {
    
        fetch(this.baseURL) // this.baseURL instead of just baseURL because it is a static variable in the CompanyApi class
        .then(response => response.json())
        .then(newData => {
            
            const companies = newData["data"] //data is the key that corresponds to the group of objects we need
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
            description: descriptionInput.value,
            website: websiteInput.value,
            energy_id: dropdown.value 
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

    static patchCompany(company){
        
        let {name, location, description, website} = company
        const companyInfo = {
            name,
            location,
            description,
            website
        }

        const configObj = {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(companyInfo)
        }
  
        fetch(`${this.baseURL}/${company.id}`, configObj)
        .then(r => r.json())
        .then(json => {
            // we are optomistically rendering here since we don't use the json response
            company.renderLi()
        })
    }

    static deleteCompany(id){
        const configObj = {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        }
        
        fetch(`${this.baseURL}/${id}`, configObj)
            .then(r => r.json())
            .then(json => alert(json.message))
    }

    
}
