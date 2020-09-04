function attachEvents() {
  $('#btnLoadTowns').on('click', getTowns);

  function getTowns() {
    const towns = $('#towns')
      .val()
      .split(', ')
      .reduce(
        (acc, cur) => {
          acc.towns.push({ town: cur });
          return acc;
        },
        { towns: [] }
      );

    renderTowns(towns);
  }

  async function renderTowns(towns) {
    const source = await $.get('./02.template.hbs');
    const template = Handlebars.compile(source);
    $('#root').html(template(towns));
    $('#towns').val('');
  }
}
