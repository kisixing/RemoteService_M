# update-note

## 2020-03-23 ---- 2020-03-28

1. 重构角色管理页面。[√]
2. 完善孕妇建档管理页面。[]
3. 优化系统页面样式及错误处理。[√]
4. 优化产品管理及显示，增加多张图片。[√]
5. 查询分页还存在问题。[√]
6. 增加任务管理页。[√]

## 2020-03-30 ---- 2020-04-05

1. 完善孕妇建档管理页面。[]
2. 新增找回密码页。[√]
3. 新增个人设置页。[√]
3. 新增用户重置密码。[√]

## 2020-04-07 ---- 2020-04-11
1. 完善孕妇建档管理页面。[]
2. 了解随访业务。[]

"gravidity index": 1, //序号 --- int
"year": 2018, // 年 --- string
"month": 10, // 月 --- string
"term": null, // 足月产 --- bool
"puerperalFever": null, // 产溽热 --- bool
"hemorrhage": null, // 出血 --- bool
"complication": null,   // 并发症 --- string
"note": null,   // 备注 --- string
"fetusdeath": null, //  死胎 --- bool
"inducedLabor": null,   // 引产 --- bool
"ectopicPregnancy": null,   // 异位妊娠 --- bool
"hydatidMole": null,    // 葡萄胎 --- bool
"multiple": null,   // 多胎妊娠 --- bool

// 分娩方式
"vaginalDelivery": null, // 顺产 --- bool
"cesareanSection": null, // 剖宫产 --- bool
"forceps": null,    // 钳产 --- bool
"vacuumAssisted": null, // 吸引产 --- bool
"breechMidwifery": null,    // 臀助产 --- bool

// 流产方式
"abortion": null,   // 人工流产 --- bool
"medicalAbortion": null,    // 药物流产 --- bool
"surgicalAbortion": null,   // 手术流产 --- bool
"naturalAbortion": null,    // 自然流产 --- bool
"stillbirth": null, // 死产 --- bool

// 小孩情况
"childGender": null,    // 孩子性别 --- string
"childLiving": null,    // 孩子健在 --- string
"childDeath": null, // 孩子死亡 --- string
"childDeformity": null, //儿童畸形 --- string
"neonateWeight": null,  // 新生儿体重 --- string

