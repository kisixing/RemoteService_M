export interface IProduct {
    id: Number
    type: String
    name: String
    picture: null
    createtime: null
    is_deleted: null
    introduction: null
    specification: null
    note: String
    sortorder: null
    remain: null
}
export interface IServicepackage {
    id: Number
    type: any
    name: String
    summary: String
    price: Number
    suggestedprice: Number
    validdate: Number
    service1amount: Number
    service2amount: Number
    service3amount: Number
    service4amount: Number
    isdeleted: any
    sortorder: Number
    topflag: any
    products: any[]
}
export interface IDevice {
    id: Number
    type: String,
    manufacturer: String,
    model: String,
    devicename: String,
    erpno: String,
    sn: String,
    btaddr: String,
    wifiaddr: String,
    note: String,
    status: String,
    subdevice: any
}