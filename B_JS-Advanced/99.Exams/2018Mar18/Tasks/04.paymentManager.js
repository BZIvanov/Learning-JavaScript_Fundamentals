class PaymentManager {
    constructor(title) {
        this.title = title;
    }

    createTable(id) {
        let table = $('<table>');
        let caption = $(`<caption>${this.title} Payment Manager</caption>`);
        let tHead = $('<thead>')
            .append('<tr>')
            .append('<th class="name">Name</th>')
            .append('<th class="category">Category</th>')
            .append('<th class="price">Price</th>')
            .append('<th>Action</th>');

        let tBody = $('<tbody class="payments">');

        let tFooter = $('<tfoot class="input-data">')
            .append('<tr>')
            .append('<td><input name="name" type="text"></td>')
            .append('<td><input name="category" type="text"></td>')
            .append('<td><input name="price" type="number"></td>');
        let btnAdd = $('<td><button>Add</button></td>').on('click', add);

        function add() {
            let name = $(`${id} .input-data input[name=name]`).val();
            let category = $(`${id} .input-data input[name=category]`).val();
            let price = $(`${id} .input-data input[name=price]`).val();

            if (name !== '' && category !== '' && price !== '') {
                let tableRow = $('<tr>')
                    .append($(`<td>${name}</td>`))
                    .append($(`<td>${category}</td>`))
                    .append($(`<td>${Number(price)}</td>`));

                let delBtn = $('<td><button>Delete</button></td>').on('click', function () {
                    $(this).parent().remove();
                });

                tableRow.append(delBtn);
                tBody.append(tableRow);
            }

            //clear input fields
            $(`${id} .input-data input[name=name]`).val('');
            $(`${id} .input-data input[name=category]`).val('');
            $(`${id} .input-data input[name=price]`).val('');
        }

        tFooter.append(btnAdd);

        table.append(caption);
        table.append(tHead);
        table.append(tBody);
        table.append(tFooter);
        return table
    }

    render(id) {
        let table = this.createTable('#' + id);
        $('#' + id).append(table);
    }
}