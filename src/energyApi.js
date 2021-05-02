class EnergyApi {

    static baseURL = 'http://localhost:3000/energies'

    static getEnergies() {
        fetch(this.baseURL)
        .then(response => response.json())
        .then( json => {
            json["data"].forEach(element => {
                const n = new Energy({id: element.id, ...element.attributes})
                n.addToDom()
                n.addToDropDown()
            })
        })
    }

}