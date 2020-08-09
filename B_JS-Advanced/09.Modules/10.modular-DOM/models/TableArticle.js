const Article = require('./Article.js');

class TableArticle extends Article {
  constructor(title, content) {
    super(title, content);
    this.headings = null;
    this.data = null;
  }

  loadData(headings, data) {
    this.headings = headings;
    this.data = data;
  }

  getElementString() {
    const table = $('<table>').addClass('data');

    const tHead = $('<tr>');
    for (const heading of this.headings) {
      tHead.append($('<th>').text(heading));
    }

    table.append(tHead);

    for (const obj of this.data) {
      const row = $('<tr>');
      for (let heading of this.headings) {
        let converted = heading.replace(/\s+/g, '').toLowerCase();

        row.append($('<td>').text(obj[converted]));
      }

      table.append(row);
    }

    const obj = $(super.getElementString());
    return obj.append($('<div>').addClass('table').append(table));
  }
}

module.exports = TableArticle;
