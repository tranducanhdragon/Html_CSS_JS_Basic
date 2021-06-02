var student = [{name:"Trần Đức Anh", age:19}, {name:"Trần Đức Em", age:20}];
//ĐN hàm map
Array.prototype.map2 = function(callback){
    let arrLen = this.length;
    let arrStudent = [];
    for(i = 0; i < arrLen; ++i){
        callback(this[i], i);
        arrStudent.push(this[i]);
    }
    return arrStudent;
}

var studentNameList = student.map2(function(res, index){
    console.log(index, res.name, res.age);
})
console.log("studentNameList: ");
console.log(studentNameList);

//ĐN hàm filter
Array.prototype.filter2 = function(callback){
    let arrLen = this.length;
    let arrStudent = [];
    for(i = 0; i < arrLen; ++i){
        callback(this[i], name);
        if(this[i].name === name){
            arrStudent.push(this[i]);
        }
    }
    return arrStudent;
}
let name = "Trần Đức Em";
var studentFilterlist = student.filter2(function(res, name){
    return res.name === name;
})
console.log("studentFilterList: ");
console.log(studentFilterlist);

//Tham chiếu
console.log("student:");
console.log(student);

// let student2 = student;
// student2[0].name = "Trần Đức";
// console.log("student2:");
// console.log(student2);

// let student3 = {...student};
// student3[0].name = "Trần Đức";
// console.log("student3:");
// console.log(student3);

//Để ko bị tham chiếu, chuyển student -> string -> json( vì string ko bị tham chiếu trong js)
let student4 = JSON.parse(JSON.stringify(student));
student4[0].name = "Trần Đức";
console.log("student4: ");
console.log(student4);

//Add jquery
$(document).ready(function(){

    //Khởi tạo
    $('.DialogModal').hide();
    $('.Dialog').hide();

    $('#ExpandDd').slideUp();
    $('#ExpandDd2').slideUp();
    $('#ExpandDd3').slideUp();
    $('#RightMenuTaiSanExpandId').hide();
    $('#RightMenuTaiSanHTExpandId').hide();
    $('#RightMenuCongCuDungCuExpandId').hide();

    //Khởi tạo các object
    /* Khởi tạo danh sách tài sản*/
    //let taisan = new Asset('#gridAssets', assets);
    
    //khởi tạo Employee
    let nv = new Employee('#gridEmployee', {});
    
    //Khởi tạo grid
    $('#gridAssets').hide();
    $('#gridEmployee').hide();


    $('#TaiSanDd').click(function(){
        $('#ExpandDd').slideToggle(300);
    });

    /* dropdown TaiSan HT/BD */
    $('#HTBDDd').click(function(){
        $('#ExpandDd2').slideToggle(300);
    });

    /* dropdown Công cụ dụng cụ*/
    $('#CongCuDd').click(function(){
        $('#ExpandDd3').slideToggle(300);
        
    });

    //Menu hiện ra và thu gọn
    $('#ThuNhoMenu').click(function(){
        $('.Content').removeClass('MenuRa');
        $('.Content').addClass('MenuVao');
        $('.Content').css("width","1457px");
    });
    $('#MenuHienRa').click(function(){
        $('.Content').removeClass('MenuVao');
        $('.Content').addClass('MenuRa');
        $('.Content').css("width","calc(100% - 253px)");
    });

    //RightMenu con khi menu bị thu nhỏ
    $('#TaiSanId').click(function(){
        if($('.Content').hasClass('MenuVao')){
            $('#RightMenuTaiSanExpandId').slideToggle(300);
        }
        else{
            $('#RightMenuTaiSanExpandId').hide();
        }
    })
    $('#TaiSanHTDBId').click(function(){
        if($('.Content').hasClass('MenuVao')){
            $('#RightMenuTaiSanHTExpandId').slideToggle(300);
        }
        else{
            $('#RightMenuTaiSanHTExpandId').hide();
        }
    })
    $('#CongCuDungCuId').click(function(){
        if($('.Content').hasClass('MenuVao')){
            $('#RightMenuCongCuDungCuExpandId').slideToggle(300);
        }
        else{
            $('#RightMenuCongCuDungCuExpandId').hide();
        }
    })

    //mở grid nhân viên
    $('#NhanVienClick').click(function(){
        $('#gridAssets').hide();
        $('#gridEmployee').show();

    });
    //Mở grid tài sản
    $('#TaiSanClick').click(function(){
        $('#gridEmployee').hide();
        $('#gridAssets').show();

    })

    //Đóng dialog
    $('#CloseDialog').click(function(){
        $('.Dialog').hide(300);
        $('.DialogModal').hide(300);
    });
})