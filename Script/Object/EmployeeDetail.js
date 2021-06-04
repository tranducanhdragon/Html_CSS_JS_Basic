class EmployeeDetail extends BaseForm{
    constructor(FormId, FadedDialogId, DeleteFormId){
        super(FormId, FadedDialogId, DeleteFormId);

    }


    /**
     * hàm validate dữ liệu employee khi mở form employee
     */
    validateCustom(){
        debugger;
        let me = this,
            isValid = true,
            maForm = me.form.find('[FieldName="EmployeeCode"]').val();

        //TH thêm mới
        if(isValid && me.FormMode == Enumeration.FormMode.Add){
            //Kiểm tra mã trên form có trong me.AllRecord ko
            if(me.getListDupEmployeeCode(maForm).length > 0  ){
                isValid = false;
            }

        }
        //TH sửa
        if(isValid && me.FormMode == Enumeration.FormMode.Edit){
            let len = me.getListDupEmployeeCode(maForm).length;
            if(me.getListDupEmployeeCode(maForm)[0]['EmployeeCode'] == maForm){

                // TH mã trên form là mã chưa nhập mới
                // if(me.getListDupEmployeeCode(maForm).length == 1){
                //     isValid = true;
                // }

                //kiểm tra TH mã trên form là mã mới vừa được nhập
                // if(me.getListDupEmployeeCode(maForm).length > 1){
                //     isValid = false;
                // }
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