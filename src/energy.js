class Energy {

    static all = []

    static energyContainer = document.getElementById('energy-container')

    constructor({id, name }){
        this.id = id 
        this.name = name
        this.active = false

        this.element = document.createElement('button')

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

    addToDom() {
        Energy.energyContainer.append(this.render())
        this.addListeners()
    }

    addListeners(){
        this.element.addEventListener('click', this.setActiveEnergy)
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

}