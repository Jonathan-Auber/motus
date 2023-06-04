const formContainer = document.querySelector("#invoiceContainer");
let inputName = 1;
const newRow = document.querySelector("#newRow");
// url = window.location.href;

async function dataProduct() {
    fetch("/pedaleJoyeuse/Invoice/dataProduct", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            // console.log(response);
            result = response;
            createNewRow(result);
            newRow.addEventListener("click", function () { createNewRow(result); });

        })
        .catch(function (error) {
            console.log(error);
        });
}

function createNewRow(result) {
    const selectContainer = document.createElement("div");
    selectContainer.classList.add("d-flex", "justify-content-evenly", "m-2");
    const selectEl = document.createElement("select");
    selectEl.name = "product_" + inputName;
    selectEl.classList.add("selector", "form-select", "w-25");
    selectContainer.appendChild(selectEl);
    const optionFirstEl = document.createElement("option");
    optionFirstEl.innerText = "Selectionnez un produit";
    selectEl.appendChild(optionFirstEl);
    formContainer.appendChild(selectContainer);
    const inputContainer = document.createElement("div");
    inputContainer.classList.add("w-50");
    const input = document.createElement("input");
    inputContainer.appendChild(input);
    input.classList.add("numberOfProducts", "form-control");
    input.type = "number";
    input.name = "numberOfProducts_" + inputName;
    input.placeholder = "Nombre d'articles";
    selectContainer.appendChild(inputContainer);
    inputName++;
    result.forEach(function (element) {
        const optionEl = document.createElement("option");
        selectEl.appendChild(optionEl);
        optionEl.value = element.id;
        optionEl.innerText = element.name;
    })
}

document.addEventListener('DOMContentLoaded', (event) => {
    dataProduct();
});





