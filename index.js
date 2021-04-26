const list = document.getElementById("company-list")

fetch("http://localhost:3000/companies")
.then(response => response.json())
.then(data => renderCompanies(data))

function renderCompanies(companyResponse) {
    const companies = companyResponse["data"]
    companies.forEach(company => {
        const li = document.createElement("li")
        li.innerText = `${company.attributes.name} based in ${company.attributes.location}`
        list.append(li)
    })
}