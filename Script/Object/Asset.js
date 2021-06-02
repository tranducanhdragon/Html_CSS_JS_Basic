class Asset extends BaseGrid{
    constructor(IdGrid, data){
        super(IdGrid, data);
        this.callFromBase(data);
    }

    callFromBase(data){
        let me = this;
        me.initEvents(data);
    }
}
/* Khởi tạo danh sách tài sản
tdanh
29.05.21
*/
// let taisan = new Asset('#gridAssets', assets);