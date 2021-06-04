class EmployeeDetail extends BaseForm{
    constructor(FormId, FadedDialogId, DeleteFormId){
        super(FormId, FadedDialogId, DeleteFormId);

    }


    /**
     * hàm validate dữ liệu employee khi mở form employee
     */
    validateCustom(){

        let me = this,
            isValid = true;

        isValid = me.isValidDuplicateEmployeeCode();

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
}