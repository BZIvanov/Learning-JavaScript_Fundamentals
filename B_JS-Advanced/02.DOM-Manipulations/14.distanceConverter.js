function attachEventsListeners() {
  const inputValue = document.getElementById('inputDistance');
  const btn = document.getElementById('convert');
  btn.addEventListener('click', calc);

  function calc() {
    numberValue = Number(inputValue.value);
    firstUnit = document.getElementById('inputUnits').selectedIndex;
    secondUnit = document.getElementById('outputUnits').selectedIndex;

    let convertToMeters;
    switch (firstUnit) {
      case 0:
        convertToMeters = numberValue * 1000;
        break;
      case 1:
        convertToMeters = numberValue * 1;
        break;
      case 2:
        convertToMeters = numberValue * 0.01;
        break;
      case 3:
        convertToMeters = numberValue * 0.001;
        break;
      case 4:
        convertToMeters = numberValue * 1609.34;
        break;
      case 5:
        convertToMeters = numberValue * 0.9144;
        break;
      case 6:
        convertToMeters = numberValue * 0.3048;
        break;
      case 7:
        convertToMeters = numberValue * 0.0254;
        break;
    }

    let result;
    switch (secondUnit) {
      case 0:
        result = convertToMeters / 1000;
        break;
      case 1:
        result = convertToMeters / 1;
        break;
      case 2:
        result = convertToMeters / 0.01;
        break;
      case 3:
        result = convertToMeters / 0.001;
        break;
      case 4:
        result = convertToMeters / 1609.34;
        break;
      case 5:
        result = convertToMeters / 0.9144;
        break;
      case 6:
        result = convertToMeters / 0.3048;
        break;
      case 7:
        result = convertToMeters / 0.0254;
        break;
    }
    const output = document.getElementById('outputDistance');
    output.value = result;
  }
}
