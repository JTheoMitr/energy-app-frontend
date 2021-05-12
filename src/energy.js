class Energy {

    static all = []

    static energyContainer = document.getElementById('energy-container')

    constructor({id, name }){
        this.id = id 
        this.name = name
        this.active = false

        this.element = document.createElement('button')
        this.deleteBtn = document.createElement('button')
        this.deleteBtn.className = "energyDelete"

        Energy.all.push(this)
    }

    companies(){
        return Company.all.filter((company) => company.energyId === parseInt(this.id))
    }

    render(){
        this.element.innerText = this.name
        this.element.id = `energy-${this.id}`
        return this.element
    }

    renderDeleteBtn() {
        this.deleteBtn.innerText = "x"
        return this.deleteBtn
    }

    addToDom() {
        Energy.energyContainer.append(this.render())
        Energy.energyContainer.append(this.renderDeleteBtn())
        this.addListeners()
    }

    deleteEnergy = (e) => {
        this.removeFromDropdown()
        this.element.remove()
        this.deleteBtn.remove()
        EnergyApi.deleteEnergy(this.id)
    }

    addListeners(){
        this.element.addEventListener('click', this.setActiveEnergy)
        this.deleteBtn.addEventListener('click', this.deleteEnergy)
    }

    setActiveEnergy = (event) => {
    
    
        Energy.all.forEach(n => {
    
            if(n.element === this.element && !!this.active) {

                n.element.classList.remove('activated')
                n.active = false
                for (let i = 0; i < filteredEnergy.length; i++ ) {
                    if ( filteredEnergy[i] == n.id ) {
                        filteredEnergy.splice(i, 1)
                    }
                }

            
            } else if (n.element === this.element && !this.active){
                
                n.element.classList.add('activated')
                n.active = true
                filteredEnergy.push(n.id)
        


            }
            
        }) 
        
        Company.filterByEnergy(filteredEnergy)
    }

    addToDropDown(){
        const option = document.createElement('option')
        option.value  = this.id 
        option.innerText = this.name
        dropdown.append(option)
    }

    removeFromDropdown(){
            
       const options = dropdown.querySelectorAll('option')

       options.forEach(o => {
           if (o.innerText == this.name) {
               console.log(o)
               o.remove()
           }
       })
    
    }

}