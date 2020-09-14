function addItem() {
  const textFrom = document.getElementById('newItemText');
  const valueFrom = document.getElementById('newItemValue');

  const option = document.createElement('option');
  option.textContent = textFrom.value;
  option.value = valueFrom.value;
  const selectEl = document.getElementById('menu');
  selectEl.appendChild(option);

  textFrom.value = '';
  valueFrom.value = '';
}
