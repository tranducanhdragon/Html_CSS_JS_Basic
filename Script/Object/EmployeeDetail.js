class EmployeeDetail extends BaseForm{
    constructor(FormId, FadedDialogId, DeleteFormId){
        super(FormId, FadedDialogId, DeleteFormId);

    }


    /**
     * hàm validate dữ liệu employee khi mở form employee
     */
    validateCustom(){
        let me = this;

        return true;
    }
}