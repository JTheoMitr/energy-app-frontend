fetch("http://localhost:3000/companies")
.then(response => response.json())
.then(data => renderCompanies(data))

function renderCompanies(companyResponse) {
    debugger
}