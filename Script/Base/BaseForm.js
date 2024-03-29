class BaseForm {
    constructor(FormId, FadedDialogId, DeleteFormId, ThongBaoFormId) {

        let me = this;
        me.form = $(`${FormId}`);
        me.fadedDialog = $(`${FadedDialogId}`);
        me.formDelete = $(`${DeleteFormId}`);
        me.formThongBao = $(`${ThongBaoFormId}`);

        me.initEvents();
    }

    initEvents() {
        let me = this;

        me.open();

        //Khởi tạo sự kiện save và cancel
        me.initEventButtonClick();

    }

    initEventButtonClick() {
        let me = this;

        //Button click cho form thêm sửa
        me.form.on("click", '.DialogCongCu button', function () {
            let command = $(this).attr("Command");

            switch (command) {
                case Resource.CommandForm.Save:
                    me.save();
                    break;
                case Resource.CommandForm.Cancel:
                    me.cancel();
                    break;
            }
        })

        //button click cho form xóa
        me.formDelete.on('click', '.DialogCongCu button', function () {
            let command = $(this).attr('Command');

            switch (command) {
                case Resource.CommandForm.Save:
                    me.saveDelete();
                    break;
                case Resource.CommandForm.Cancel:
                    me.cancel();
                    break;
            }
        })

        //button click cho form thông báo
        me.formThongBao.on('click', '.DialogCongCu button', function(){
            let command = $(this).attr('Command');

            switch (command) {
                case Resource.CommandForm.Cancel:
                    me.cancel();
                    break;
            }
        })
    }


    /**
     * 
     * Hàm mở form detail employee
     */
    open(param) {
        let me = this;

        me = Object.assign(me, param);

        me.form.show(300);
        me.fadedDialog.show(300);

        //reset data trên form
        me.resetDataForm();

        //binding dữ liệu lên form nếu có thao tác sửa
        if (me.FormMode == Enumeration.FormMode.Edit) {
            me.bindingData(me.Record);
        }
    }
    /**
     * 
     * hàm mở form thông báo lỗi 
     */
    openFormThongBao(){
        let me = this;

        me.formThongBao.show(300);
        me.fadedDialog.show(300);
    }

    /**
     * hàm mở form delete
     */
    openFormDelete(param) {
        let me = this;

        me = Object.assign(me, param);

        me.formDelete.show(300);
        me.fadedDialog.show(300);
    }
    /**hàm save form delete bằng ajax*/
    saveDelete() {
        let me = this,
            method = Resource.Method.Delete,
            urlFull = me.url,
            urlId = "";


        me.AllRecord.filter(function (item) {
            urlId = `${urlFull}/${item[me.ItemId]}`;
            CommonFn.Ajax(urlId, method, {}, function (response) {
                if (response) {


                    me.Parent.getDataFromApi();
                }
                else {
                    console.log("Có lỗi khi xóa!");
                }
            })
        });


        //show form loading
        me.fadedDialog.show().delay(1000).fadeOut();
        me.cancel();

    }


    /**
     * Lưu dữ liệu trên form xuống db qua ajax
     */
    save() {
        let me = this,
            isValid = me.validateForm();

        if (isValid) {
            let data = me.getDataForm();

            me.saveData(data);
        }
    }

    // Lưu dữ liệu 
    saveData(data) {
        let me = this,
            url = me.Parent.urlAdd,
            method = Resource.Method.Post,
            urlFull = `${Constant.UrlPrefix}${url}`;

        // Nếu edit thì sửa lại
        if (me.FormMode == Enumeration.FormMode.Edit) {
            url = `${me.Parent.urlEdit}/${data[me.ItemId]}`;
            method = Resource.Method.Put;
            urlFull = `${Constant.UrlPrefix}${url}`;
        }

        // Gọi lên server cất dữ liệu
        CommonFn.Ajax(urlFull, method, data, function (response) {
            if (response) {
                console.log("Cất dữ liệu thành công");

                //show form loading
                me.fadedDialog.show().delay(1000).fadeOut();
                me.cancel();

                me.Parent.getDataFromApi();
            } else {
                console.log("Có lỗi khi cất dữ liệu");
            }
        });
    }

    // Lấy dữ liệu từ form
    getDataForm() {
        let me = this,
            data = me.Record || {};

        me.form.find("[FieldName]").each(function () {
            let control = $(this),
                dataType = control.attr("DataType"),
                fieldName = control.attr("FieldName"),
                value = me.getValueControl(control, dataType);

            data[fieldName] = value;
        });

        return data;
    }

    // Lấy dữ liệu form dựa vào dataType
    getValueControl(control, dataType) {
        let me = this,
            value = control.val();

        switch (dataType) {
            case Resource.DataTypeColumn.Date:
                value = new Date(value);
                break;
            case Resource.DataTypeColumn.Number:
                value = parseInt(value);
                break;
            case Resource.DataTypeColumn.Enum:
                value = parseInt(value);
                break;
            case Resource.DataTypeColumn.FullName:
                value = CommonFn.formatFullName(value);
                break;
        }

        return value;
    }
    //load dữ liệu ra form
    bindingData(data) {
        let me = this;

        me.form.find("[FieldName]").each(function () {
            let control = $(this),
                fieldName = control.attr("FieldName"),
                dataType = control.attr("DataType"),
                value = data[fieldName];

            me.setValueControl(control, value, dataType);
        });
    }
    //format theo datatype rồi mới load lên
    setValueControl(control, value, dataType) {
        let me = this;

        switch (dataType) {
            case Resource.DataTypeColumn.Date:
                value = CommonFn.convertDate(value);
                break;
            /// 
        }

        control.val(value);
    }

    /**
     * validate dữ liệu
     */
    validateForm() {
        let me = this,
            isValid = me.validateRequire();

        if (isValid) {
            isValid = me.validateFieldNumber();
        }

        if (isValid) {
            isValid = me.validateFieldDate();
        }

        if (isValid) {
            isValid = me.validateCustom();
        }

        return isValid;
    }

    /**
     * 
     * validateCustom xuống từng đối tượng kế thừa cụ thể sẽ định nghĩa riêng
     */
    validateCustom() {
        return true;
    }

    // Validate các trường bắt buộc
    validateRequire() {
        let me = this,
            isValid = true;

        // Duyệt hết các trường require xem có trường nào bắt buộc mà ko có value ko
        me.form.find("[Require='true']").each(function () {
            let value = $(this).val();
            let x = $(this).attr('FieldName');
            if (!value) {
                isValid = false;

                $(this).addClass("notValidControl");
                $(this).attr("title", "Vui lòng không được để trống!");
            } else {
                $(this).removeClass("notValidControl");
            }
        });

        return isValid;
    }

    // Validate các trường Number
    validateFieldNumber() {
        let me = this,
            isValid = true;

        // Duyệt hết các trường require xem có trường nào bắt buộc mà ko có value ko
        me.form.find("[DataType='Number']").each(function () {
            let value = $(this).val();

            // is not a number
            if (isNaN(value)) {
                isValid = false;

                $(this).addClass("notValidControl");
                $(this).attr("title", "Vui lòng nhập đúng định dạng!");
            } else {
                $(this).removeClass("notValidControl");
            }
        });

        return isValid;
    }

    // Validate các trường ngày tháng
    validateFieldDate() {
        let me = this,
            isValid = true;

        // Duyệt hết các trường require xem có trường nào bắt buộc mà ko có value ko
        me.form.find("[DataType='Date']").each(function () {
            let value = $(this).val();

            // is not a number
            if (!CommonFn.isDateFormat(value)) {
                isValid = false;

                $(this).addClass("notValidControl");
                $(this).attr("title", "Vui lòng nhập đúng định dạng!");
            } else {
                $(this).removeClass("notValidControl");
            }
        });

        return isValid;
    }
    /**
     * reset data trong form
     */
    resetDataForm() {
        let me = this;

        // reset dữ liệu về rỗng
        me.form.find("[FieldName]").val("");

        me.form.find(".notValidControl").removeClass("notValidControl");
    }

    /**
     * Đóng tất cả loại form
     */
    cancel() {
        let me = this;

        me.form.hide(300);
        me.formDelete.hide(300);
        me.fadedDialog.hide(300);
        me.formThongBao.hide(300);
    }
}