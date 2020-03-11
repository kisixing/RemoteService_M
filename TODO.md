# TODO

## api

### 2020-03-10

1. api/servicepackages 传递 {"id":3,"topflag":1} 修改置顶和是否可用的时候，所属产品会清空。已更新。
2. get 获取数据的时候应该返回 total

```
获取 count 地址 {resource}/count?criteria
```

---

### 2020-03-11

1. 清除所有不需要的 mock 接口。
2. 获取用户接口(/api/users)信息，目前是通过 login 查询的。
3. 对接权限管理