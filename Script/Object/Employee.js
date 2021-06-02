class Employee extends BaseGrid{
    constructor(IdGrid, data){
        super(IdGrid, data);
        let me = this;
        
        me.employee_initEvents();       
    }

    employee_initEvents(){
        let me = this;

        me.getDataFromApi();

        //gọi đến sự kiện lắng nghe click row
        me.eventClickRow();
    }
}
