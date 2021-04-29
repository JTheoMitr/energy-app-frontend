class Company {

    static all = []

    constructor({id, name, location, description, energy_id}) {

        this.id = id
        this.name = name
        this.location = location
        this.description = description
        this.energy_id = energy_id

        Company.all.push(this)
        
    }
}

function renderCompany(company) {
    const li = document.createElement("li")
    li.id = `company-${company.id}`
    li.dataset.id = company.id

    renderLi(li, company)

    // const deleteBtn = li.querySelector('.delete')
    // deleteBtn.addEventListener('click', deleteCompany)
    li.addEventListener('click', handleCompanyClick)

    list.appendChild(li)
}

function renderLi(li, company) {
    li.innerHTML = `

            <div data-id="${company.id}">
            <strong class="name">${company.attributes.name}</strong><br></br>
            <em class="location">${company.attributes.location}</em><br></br>
            <span class="description">${company.attributes.description}</span><br></br>
            </div>

            <button class="edit" data-id="${company.id}">Edit</button>
            <button class="delete" data-id="${company.id}">Delete</button>
            <br></br>
        `
}