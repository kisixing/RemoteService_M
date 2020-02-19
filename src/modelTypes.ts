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
    prodcuts: any[]
}