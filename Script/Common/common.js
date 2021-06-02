// Các hàm dùng chung toàn chương trình
var CommonFn = CommonFn || {};

//Hàm lấy dữ liệu đã được format theo dataType
CommonFn.getDataFormatted = (data, datatype) => {
    switch (datatype) {
        case "Money":
            data = CommonFn.formatMoney(data);
            break;
    }
    return data;
}

// Hàm format tiền
CommonFn.formatMoney = (money) => {
    if (!isNaN(money)) {
        return money.toString().replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1.");
    } else {
        return money;
    }
}

/* 
Hàm căn lề
*/
CommonFn.getClassFormat = (dataType) => {
    let className = "";

    switch (dataType) {
        case "Number":
            className = "align-right";
            break;
        case "Date":
            className = "align-center";
            break;
        case "Money":
            className = "align-right";
            break;
    }

    return className;
}

// Hàm ajax gọi lên server lấy dữ liệu
CommonFn.Ajax = (url, method, data, fnCallBack, async = true) => {
    $.ajax({
        url: url,
        method: method,
        async: async,
        data: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        },
        crossDomain: true,
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (response) {
            fnCallBack(response);
        },
        error: function (errormessage) {
            console.log(errormessage.responseText);
        }
    })
}