class Employee extends BaseGrid{
    constructor(IdGrid, data){
        super(IdGrid, data);
        let me = this;
        
        me.config();
        me.employee_initEvents();  
        
    }

    // Cấu hình các url
    config(){
        let me = this,
            config = {
                urlAdd: "v1/Employees",
                urlEdit: "v1/Employees",
                urlDelete: "v1/Employees"
            };

        Object.assign(me, config);
    }

    employee_initEvents(){
        let me = this;

        me.getDataFromApi();

        //gọi đến sự kiện lắng nghe click row
        me.eventClickRow();

        //gọi đến sự kiện eventToolBar
        me.eventToolBar();

    }

    //Mở formDetail Employee
    initFormDetailEmployee(FormDetailId){
        let me = this;
        me.initFormDetail(FormDetailId);
    }

}
let formDetail = new Employee('#gridEmployee', {});
formDetail.initFormDetailEmployee('#FormDetailEmployee');
