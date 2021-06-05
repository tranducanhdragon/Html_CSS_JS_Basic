class Employee extends BaseGrid {
    constructor(IdGrid, data) {
        super(IdGrid, data);
        let me = this;

        me.config();
        me.employee_initEvents();

        me.formDelete = null;

    }

    // Cấu hình các url
    config() {
        let me = this,
            config = {
                urlAdd: "v1/Employees",
                urlEdit: "v1/Employees",
                urlDelete: "v1/Employees"
            };

        Object.assign(me, config);
    }

    employee_initEvents() {
        let me = this;

        me.getDataFromApi();

        //gọi đến sự kiện lắng nghe click row
        me.eventClickRow();

        //gọi đến sự kiện eventToolBar
        me.eventToolBar();


    }

    //Mở formDetail Employee
    initFormDetailEmployee(FormDetailId, FadedDialogId, DeleteFormId, ThongBaoFormId) {
        let me = this;

        //me.initFormDetail(FormDetailId, FadedDialogId);

        /*Khởi tạo đối tượng EmployeeDetail kế thừa từ BaseForm có hàm initFormDetail
        *   EmployeeDetail sẽ đảm nhiệm việc với form thay Employee
        **/
        me.formDetail = new EmployeeDetail(FormDetailId, FadedDialogId, DeleteFormId, ThongBaoFormId);
    }

    /**
     * 
     * Sự kiện draggable kéo form di chuyển trên màn hình ko áp dụng với content trong form
     */
    eventDraggable(classNameHandle , classNameCancel) {
        let me = this;

        $(`${classNameHandle}`).draggable({ cancel: `${classNameCancel}` });
    }

    /**
     * Validate dữ liệu employee
     */
    validateCustom(){
        debugger;
    }
}
let formDetail = new Employee('#gridEmployee', {});
formDetail.initFormDetailEmployee('#FormDetailEmployee', '#FadedDialog','#FormDeleteId', '#FormThongBaoId');
formDetail.eventDraggable('.Dialog', '.DialogBody');
formDetail.eventDraggable('.DialogDelete', '.DialogDeleteBody');