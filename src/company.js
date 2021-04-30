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

    handleCompanyClick = (event) => {
        if (event.target.innerText === "Edit") {
            renderEditForm(event.target)
            event.target.innerText = "Save"
        } else if (event.target.innerText === "Delete") {
            deleteCompany(event)
        } else if (event.target.innerText === "Save") {
            patchElement(event.target.parentElement)
            event.target.innerText = "Edit"
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
}