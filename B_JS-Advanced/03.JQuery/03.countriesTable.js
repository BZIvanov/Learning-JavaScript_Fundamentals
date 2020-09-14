function initializeTable() {
  $('#createLink').on('click', createCountry);
  addCountryToTable('Bulgaria', 'Sofia');
  addCountryToTable('Germany', 'Berlin');
  addCountryToTable('Russia', 'Moscow');
  hideButtons();

  function addCountryToTable(country, town) {
    let tableRow = $('<tr>')
      .append(`<td>${country}</td>`)
      .append(`<td>${town}</td>`)
      .append(
        $('<td>')
          .append($('<a href="#">[Up]</a>').on('click', moveUp))
          .append($('<a href="#">[Down]</a>').on('click', moveDown))
          .append($('<a href="#">[Delete]</a>').on('click', deleteRow))
      );

    // display none row to make visualization with  fadeIn
    tableRow.css('display', 'none');
    $('#countriesTable').append(tableRow);
    // display back the row 1 sec later after it was hidden
    tableRow.fadeIn(1000);
  }

  function createCountry() {
    const country = $('#newCountryText');
    const capital = $('#newCapitalText');
    addCountryToTable(country.val(), capital.val());
    country.val('');
    capital.val('');
    hideButtons();
  }

  function moveUp() {
    const row = $(this).parent().parent();
    row.insertBefore(row.prev());
    hideButtons();
  }

  function moveDown() {
    const row = $(this).parent().parent();
    row.insertAfter(row.next());
    hideButtons();
  }

  function deleteRow() {
    $(this).parent().parent().remove();
    hideButtons();
  }

  function hideButtons() {
    // show all a tags
    $('#countriesTable a').css('display', '');
    // hide the third row Up a tag
    $('#countriesTable tr:eq(2) a:contains("Up")').css('display', 'none');
    // hide last row Down a tag
    $('#countriesTable tr:last a:contains("Down")').css('display', 'none');
  }
}
