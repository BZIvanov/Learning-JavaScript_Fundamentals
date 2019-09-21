function addItem() {
    let textFrom = document.getElementById("newItemText");
    let valueFrom = document.getElementById("newItemValue");

    let option = document.createElement("option");
    option.textContent = textFrom.value;
    option.value = valueFrom.value;
    let selectEl = document.getElementById("menu");
    selectEl.appendChild(option);

    textFrom.value = "";
    valueFrom.value = "";
}
