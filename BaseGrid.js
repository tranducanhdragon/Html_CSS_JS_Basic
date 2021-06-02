class BaseGrid {
    constructor(IdGrid, data) {
        let me = this;
        //Get Grid from html
        me.grid = $(IdGrid);
        // me.initEvents(data);
    }

    initEvents(data) {
        //khởi tạo
        let me = this;
        me.loadData(data);
    }
    //Tạo table cho đối tượng Asset
    loadData(data) {
        let me = this,
            table = $('<table></table>'),
            thead = me.createThead(),
            tbody = me.createTbody(data);

        table.append(thead);
        table.append(tbody);
        me.grid.append(table);
    }

    createThead() {
        let me = this,
            thead = $('<thead></thead>'),
            tr = $('<tr></tr>').append(`<th>
                                            <input type="checkbox" DataType="CheckBox"/>
                                        </th>`);

        let x = me.grid.find('.col');
        me.grid.find('.col').each(function () {
            //this -> me.grid.find('.col')

            let th = $('<th></th>');
            //th.text($(this).attr('FieldName'));
            th.text($(this).text());
            tr.append(th);
        })
        thead.append(tr);
        return thead;
    }
    createTbody(data) {
        let me = this,
            tbody = $(`<tbody></tbody>`);

        data.map(function (item) {
            let tr = $(`<tr></tr>`).append(`<td>
                                                <input type="checkbox" DataType="CheckBox"/>
                                            </td>`);

            //map dữ liệu từ data với FieldName của bảng mẫu gridAssets
            me.grid.find('.col').each(function () {
                /* this -> me.grid.find('.col') */

                let td = $(`<td></td>`),
                    fieldname = $(this).attr('FieldName'),
                    datatype = $(this).attr('DataType');

                let valueDisplay = getDataFormatted(item[fieldname], datatype);
                let classDisplay = getClassFormat(datatype);

                td.text(valueDisplay);
                td.addClass(classDisplay);

                tr.append(td);
            })

            tbody.append(tr);
        })

        return tbody;
    }
}

//let ts = new BaseGrid('#gridAssets', assets);