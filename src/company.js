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

        // debugger

        Company.all.push(this)
        
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

function renderCompany(company) {


    renderLi(li, company)

    // const deleteBtn = li.querySelector('.delete')
    // deleteBtn.addEventListener('click', deleteCompany)
    li.addEventListener('click', handleCompanyClick)

    list.appendChild(li)
}