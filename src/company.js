class Company {

    static all = []

    constructor({id, name, location, description, website, energyid}) {

        this.id = id
        this.name = name
        this.location = location
        this.description = description
        this.website = website
        this.energyId = energyid

        this.element = document.createElement("li")
        this.element.id = `company-${this.id}`
        this.element.dataset.id = this.id

        this.element.addEventListener('click', this.handleCompanyClick)

        Company.all.push(this)
        
    }

    handleCompanyClick = (e) => {
        if (e.target.innerText === "Edit"){

            this.createEditFields(e.target)

            e.target.innerText = "Save"

        }else if(e.target.innerText === "Delete"){
        
            this.deleteCompany(e)

        } else if(e.target.innerText === "Save"){ 

            this.saveUpdatedCompany()

            e.target.innerText = "Edit"
        }
    }

    renderLi() {
        this.element.innerHTML = `
    
                <div data-id="${this.id}">
                <strong class="name">${this.name}</strong><br></br>
                <em class="location">${this.location}</em><br></br>
                <span class="description">${this.description}</span><br></br>
                </div>
    
                <a class="website" href=${this.website} target="_blank">VISIT</a>
                <button class="edit" data-id="${this.id}">Edit</button>
                <button class="delete" data-id="${this.id}">Delete</button>
                <br></br>
            `
            return this.element
    }

    attachToDom() {
        list.appendChild(this.renderLi())
    }

    createEditFields = (editBtn) =>{
        // now using this to access the element
        const li = this.element
        const div = this.element.querySelector('div')

        // Grab the current values to pre-populate our input fields
        const name = li.querySelector('.name').innerText
        const location = li.querySelector('.location').innerText
        const description = li.querySelector('.description').innerText
        const website = li.querySelector('.website').href
        
        // update the html and interpolate values:
        div.innerHTML = `
        <input type="text" name="name" class="edit-name" value="${name}">
        <input type="text" name="location" class="edit-location" value="${location}">
        <input type="text" name="description" class="edit-description" value="${description}">
        <input type="text" name="website" class="edit-website" value="${website}">
        `
    }

    deleteCompany = (e) => {
        this.element.remove() // remove it before the fetch request 
        CompanyApi.deleteCompany(this.id) // moved fetch to itemApi for separation of concerns
    }

    saveUpdatedCompany = () => {
        this.name = this.element.querySelector(".edit-name").value
        this.location = this.element.querySelector(".edit-location").value
        this.description = this.element.querySelector(".edit-description").value
        this.website = this.element.querySelector(".edit-website").value
    
        CompanyApi.sendPatch(this) // moved fetch to itemApi for separation of concerns
    }

    static filterByEnergy(filteredEnergy){
        
        if (filteredEnergy.length == 0) {
            for (const company of Company.all){
                company.element.style.display = ""
            }
        } else if (filteredEnergy){
            
            for (const company of Company.all){
                
                if(filteredEnergy.includes(company.energyId.toString())){
                    company.element.style.display = ""
                } else if (!filteredEnergy.includes(company.energyId.toString())){
                    company.element.style.display = "none"
                }
            }
        }
       
    }


}