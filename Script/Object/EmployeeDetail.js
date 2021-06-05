class EmployeeDetail extends BaseForm{
    constructor(FormId, FadedDialogId, DeleteFormId, ThongBaoFormId){
        super(FormId, FadedDialogId, DeleteFormId, ThongBaoFormId);

    }


    /**
     * hàm validate dữ liệu employee khi mở form employee
     */
    validateCustom(){

        let me = this,
            isValid = true;

        if(me.isValidDuplicateEmployeeCode()){
            isValid = me.isValidDuplicateEmployeeCode();
            me.form.find('.DialogBody .tbEmployeeCode').text('(*)');
        }
        else{
            isValid = false;
            me.form.find('.DialogBody .tbEmployeeCode').text('Đã tồn tại mã này!');        
        }
        if(isValid = me.isValidateEmail()){
            isValid = me.isValidateEmail();
            me.form.find('.DialogBody .tbEmail').text('(*)');
        }
        else{
            isValid = false;
            me.form.find('.DialogBody .tbEmail').text('Email không đúng định dạng!');
        }
        if(isValid = me.isValidatePhone()){
            isValid = me.isValidatePhone();
            me.form.find('.DialogBody .tbPhone').text('(*)');
        }
        else{           
            isValid = false;
            me.form.find('.DialogBody .tbPhone').text('Không đúng định dạng!');
        }
        if(me.isValidateFullName()){
            isValid = me.isValidateFullName();
            me.form.find('.DialogBody .tbPhone').text('(*)');
        }
        else{
            isValid = false;
            me.form.find('.DialogBody .tbFullName').text('Không đúng định dạng!');
        }

        return isValid;
    }
    isValidDuplicateEmployeeCode(){
        let me = this,
            isValid = true,
            maForm = me.form.find('[FieldName="EmployeeCode"]').val(),
            lstDup = me.getListDupEmployeeCode(maForm);

        //TH thêm mới
        if(isValid && me.FormMode == Enumeration.FormMode.Add){
            //Kiểm tra mã trên form có trong me.AllRecord ko
            if(lstDup.length > 0  ){
                isValid = false;
            }

        }
        //TH sửa
        if(isValid && me.FormMode == Enumeration.FormMode.Edit){
            //Kiểm tra nếu trùng EmployeeCode thì xét EmployeeId
            if(lstDup.length > 0 && lstDup[0]['EmployeeId'] !== me.Record['EmployeeId']){
                isValid = false;
            }

        }

        return isValid;
    }

    getListDupEmployeeCode(employeeCode){
        let me = this,
            listDup = [];

        listDup = me.AllRecord.filter(function(record){
            return record['EmployeeCode'] == employeeCode;
        });
        return listDup;
    }

    //Validate Email
    isValidateEmail(){
        let me = this,
            isValid = true,
            email = me.form.find('[FieldName="Email"]').val();

        if(!CommonFn.formatEmail(email)){
            isValid = false;
        };
        return isValid;
    }
    isValidatePhone(){
        let me = this,
            isValid = true,
            phone = me.form.find('[FieldName="PhoneNumber"]').val();

        if(!CommonFn.formatPhoneNumber(phone)){
            isValid = false;
        };
        return isValid;

    }
    isValidateFullName(){
        let me = this,
            isValid = true,
            fullname = me.form.find('[FieldName="FullName"]').val();
        let a = CommonFn.formatFullName(fullname);
        if(!CommonFn.formatFullName(fullname)){
            isValid = false;
        };
        return isValid;

    }
}