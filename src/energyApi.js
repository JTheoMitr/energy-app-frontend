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

    static createEnergy() {
        const formData = {
            name: energyName.value
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
            const energy = newData.data
            const e = new Energy({id: energy.id, ...energy.attributes})
            e.addToDom()
            e.addToDropDown()
        })
    }

    static deleteEnergy(id) {
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

// create and delete functionality, add both for energies - make the dom rendering portion different than the other create function etc