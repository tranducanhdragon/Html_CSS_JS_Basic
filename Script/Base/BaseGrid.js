class BaseGrid {
    constructor(IdGrid, data) {
        let me = this;
        //Get Grid from html
        me.grid = $(IdGrid);
        // me.initEvents(data);

        //Lấy dữ liệu từ api đã có
        //me.getDataFromApi();

    }

    initEvents(data) {
        //khởi tạo
        let me = this;
        me.loadData(data);

        //sự kiện click vào một hàng thì đổi background
        me.eventClickRow();
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
        if (data && data.length > 0) {
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

                    let valueDisplay = CommonFn.getDataFormatted(item[fieldname], datatype);
                    let classDisplay = CommonFn.getClassFormat(datatype);

                    td.text(valueDisplay);
                    td.addClass(classDisplay);

                    tr.append(td);
                })

                tbody.append(tr);
            })
        }

        return tbody;
    }
    /**Lấy dữ liệu từ server bằng ajax */
    getDataFromApi() {
        let me = this,
            url = `${Constant.UrlPrefix}${'v1/employees'}`;

        CommonFn.Ajax(url, Resource.Method.Get, {}, function (response) {
            if (response) {
                me.loadData(response);
            }
            else {
                me.ThongBaoLoi();
            }
        })
    }
    //hiển thị thông báo lỗi khi ko lấy được dữ liệu qua ajax
    ThongBaoLoi() {

    }

    /** sự kiện click vào row trong bảng grid thì sẽ thêm background-color*/
    eventClickRow(){
        let me = this;
        me.grid.on('click', 'tbody tr', function(){
            //remove background của row đã đc chọn trước đó
            me.grid.find('tr').removeClass('selectedRow');
            
            //thêm background cho row mới này
            $(this).addClass('selectedRow');
        })
    }
}

//let ts = new BaseGrid('#gridAssets', assets);