class BaseGrid {
    constructor(IdGrid, data) {
        let me = this;
        //Get Grid from html
        me.grid = $(IdGrid);
        // me.initEvents(data);

        // Biến lưu form detail thêm sửa
        me.formDetail = null;

        //Lưu dữ liệu thô vào biến cacheDataGrid
        me.cacheDataGrid = null;
    }

    initEvents(data) {
        //khởi tạo
        let me = this;
        me.loadData(data);

        //sự kiện click vào một hàng thì đổi background
        me.eventClickRow();


        //sự kiện bấm thêm sửa xóa nạp
        me.eventToolBar()
    }

    initFormDetail(IdForm) {
        let me = this;
        me.formDetail = new BaseForm(IdForm);
    }

    //Tạo table cho đối tượng Asset
    loadData(data) {
        let me = this,
            table = $('<table></table>'),
            thead = me.createThead(),
            tbody = me.createTbody(data);

        table.append(thead);
        table.append(tbody);

        me.grid.find("table").remove();
        me.grid.append(table);

        //gán Id để phân biệt các bản ghi
        me.ItemId = me.grid.attr('ItemId');

        //sự kiện chọn mặc định hàng đầu tiên khi người dùng chưa chọn hàng nào
        me.eventSelectFirstRow();
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

                // Lưu dữ liệu bản ghi vào tr để sau lấy ra
                tr.data("value", item);

                tbody.append(tr);
            })
        }

        return tbody;
    }
    /**Lấy dữ liệu từ server bằng ajax */
    getDataFromApi() {
        let me = this,
            url = `${Constant.UrlPrefix}${me.grid.attr('Url')}`;

        CommonFn.Ajax(url, Resource.Method.Get, {}, function (response) {
            if (response) {
                //Lưu data thô vào me.cacheDataGrid
                me.cacheDataGrid = response;


                me.loadData(response);
            }
            else {
                me.thongBaoLoi();
            }
        })
    }
    //hiển thị thông báo lỗi khi ko lấy được dữ liệu qua ajax
    thongBaoLoi() {
        
        let me = this;

        //mở form thông báo bên BaseForm
        me.formDetail.openFormThongBao();
    }

    /** sự kiện click vào row trong bảng grid thì sẽ thêm background-color*/
    eventClickRow() {
        let me = this;
        me.grid.on('click', 'tbody tr', function () {
            //remove background của row đã đc chọn trước đó
            //me.grid.find('tr').removeClass('selectedRow');

            
            if ($(this).hasClass('selectedRow')) {
                //remove background nếu click lại lần nữa
                $(this).removeClass('selectedRow');
            }
            else {
                //thêm background cho row mới này
                $(this).addClass('selectedRow');
            }


        })
    }

    //sự kiện chọn hàng đầu tiên trong grid
    eventSelectFirstRow() {
        let me = this;
        let a = me.grid.find('tbody tr').eq(0).val();
        me.grid.find('tbody tr').eq(0).addClass('selectedRow');
    }

    /**Sự kiện eventToolBar khi bấm chọn thêm sửa xóa nạp */
    eventToolBar() {
        let me = this,
            toolBarId = me.grid.attr('toolBar'),
            command = $(`#${toolBarId}`),
            fireEvent = null;
        command.on('click', '[CommandType]', function () {
            let cmdType = $(this).attr('CommandType');
            switch (cmdType) {
                case Resource.CommandType.Add:
                    fireEvent = me.add;
                    break;
                case Resource.CommandType.Edit:
                    fireEvent = me.edit;
                    break;
                case Resource.CommandType.Delete:
                    fireEvent = me.Delete;
                    break;
                case Resource.CommandType.Refresh:
                    fireEvent = me.refresh;
                    break;
            }
            if (fireEvent && typeof (fireEvent) === 'function') {
                //truyền me xuống khi thực hiện hàm vì khi bắt đầu gọi fireEvent(), me là undefined
                fireEvent = fireEvent.bind(me);
                fireEvent();
            }
        })
    }
    /**
     * bấm nút thêm mới, sẽ gọi đến hàm open ở BaseForm
     */
    add() {
        let me = this,
            param = {
                Parent: me,
                FormMode: Enumeration.FormMode.Add,
                Record: {},
                ItemId: me.ItemId,
                AllRecord: me.cacheDataGrid
            };

        if (me.formDetail) {
            me.formDetail.open(param);
        }
    }

    /**
     * 
     *  Bấm nút sửa sẽ gọi đến hàm edit ở BaseForm
     */
    edit() {
        
        let me = this,
            allSelectRecord = me.getAllSelectedRecord(),
            toolBarId = me.grid.attr('toolBar'),
            command = $(`#${toolBarId}`),
            param = {
                Parent: me,
                FormMode: Enumeration.FormMode.Edit,
                Record: { ...me.getOneSelectedRecord() },
                ItemId: me.ItemId,
                AllRecord: me.cacheDataGrid
            };

        if (me.formDetail && allSelectRecord.length == 1) {
            //gọi chung đến hàm open vì thêm và sửa chung một form( tránh lặp code)
            me.formDetail.open(param);
        }
        else{
            me.thongBaoLoi();
        }
    }
    /**
     * Bấm xóa sẽ gọi đến hàm openFormDelete bên BaseForm
     */
    Delete() {
        let me = this,
            data = this.getAllSelectedRecord(),
            param = {
                Parent: me,
                FormMode: Enumeration.FormMode.Delete,
                AllRecord: data,
                url: `${Constant.UrlPrefix}${me.grid.attr('Url')}`,
                ItemId: me.ItemId
            };

        if (me.formDetail && data.length > 0) {
            me.formDetail.openFormDelete(param);
        }
        else{
            me.thongBaoLoi();
        }
    }

    //nạp
    refresh() {
        let me = this;

        me.getDataFromApi();
        //hiện giao diện nạp 1s
        me.formDetail.fadedDialog.show().delay(1000).fadeOut();
    }

    // Lấy dữ liệu 1 bản ghi được select
    getOneSelectedRecord() {
        let me = this,
            data = {},
            selected = me.grid.find(".selectedRow");

        if (selected.length > 0) {
            data = selected.eq(0).data("value");
        }

        return data;
    }

    //Lấy dữ liệu của các bản ghi được select
    getAllSelectedRecord() {
        let me = this,
            data = [],
            selected = me.grid.find(".selectedRow");

        let a = selected.eq(0);
        selected.each(function () {
            data.push($(this).data("value"));
        });

        return data;
    }
}

//let ts = new BaseGrid('#gridAssets', assets);