//Hàm lấy dữ liệu đã được format theo dataType
function getDataFormatted(data, datatype) {
    switch (datatype) {
        case "Money":
            data = formatMoney(data);
            break;
    }
    return data;
}

// Hàm format tiền
function formatMoney(money) {
    if (!isNaN(money)) {
        return money.toString().replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1.");
    } else {
        return money;
    }
}

/* 
Hàm căn lề
*/
function getClassFormat(dataType){
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