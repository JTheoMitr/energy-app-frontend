class Company {

    static all = []

    constructor({id, name, location, description, energy_id}) {

        this.id = id
        this.name = name
        this.location = location
        this.description = description
        this.energy_id = energy_id

        this.element = document.createElement("li")
        this.element.id = `company-${this.id}`
        this.element.dataset.id = this.id

        this.element.addEventListener('click', this.handleCompanyClick)

        Company.all.push(this)
        
    }

    // handleCompanyClick = (event) => {
    //     if (event.target.innerText === "Edit") {
    //         renderEditForm(event.target)
    //         event.target.innerText = "Save"
    //     } else if (event.target.innerText === "Delete") {
    //         deleteCompany(event)
    //     } else if (event.target.innerText === "Save") {
    //         patchElement(event.target.parentElement)
    //         event.target.innerText = "Edit"
    //     }
    
    // }

    handleCompanyClick = (e) => {
        if (e.target.innerText === "Edit"){
            // OLD 
            // renderEditForm(e.target)

            // NEW OO
            this.createEditFields(e.target)

            e.target.innerText = "Save"
        }else if(e.target.innerText === "Delete"){
            // OLD
            // deleteItem(e) 

            // NEW OO
            this.deleteCompany(e)
        } else if(e.target.innerText === "Save"){ 
           // OLD
            // patchElement(e.target.parentElement)
            
            // NEW OO
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
        
        // update the html and interpolate values:
        div.innerHTML = `
        <input type="text" name="name" class="edit-name" value="${name}">
        <input type="text" name="location" class="edit-location" value="${location}">
        <input type="text" name="description" class="edit-description" value="${description}">
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
    
        CompanyApi.sendPatch(this) // moved fetch to itemApi for separation of concerns
    }
}