export const defaultFormDescriptions = {
  outpatientNO: {
    key: 'outpatientNO',
    label: '门诊号',
    rules: [{ required: true, message: '门诊号是必填项' }],
    inputType: 'input',
    inputProps: {
      placeholder: '请输入门诊号',
    },
  },
  inpatientNO: {
    key: 'inpatientNO',
    label: '住院号',
    rules: [{ required: true, message: '住院号是必填项' }],
    inputType: 'input',
    inputProps: {
      placeholder: '请输入住院号',
    },
  },
  checkupNO: {
    key: 'inpatientNO',
    label: '产检编号',
    rules: [{ required: true, message: '产检编号是必填项' }],
    inputType: 'input',
    inputProps: {
      placeholder: '请输入产检编号',
    },
  },
  insuranceType: {
    key: 'insuranceType',
    label: '医保类型',
    rules: [{ required: true, message: '医保类型是必填项' }],
    inputType: 'input',
    inputProps: {
      placeholder: '请输入医保类型',
    },
  },
  name: {
    key: 'name',
    label: '孕妇姓名',
    rules: [{ required: true, message: '孕妇姓名是必填项' }],
    inputType: 'input',
    inputProps: {
      placeholder: '请输入孕妇姓名',
    },
  },
  age: {
    key: 'age',
    label: '孕妇年龄',
    rules: [{ required: true, message: '孕妇年龄是必填项' }],
    inputType: 'input',
    inputProps: {
      placeholder: '请输入孕妇年龄',
    },
  },
  gender: {
    key: 'gender',
    label: '性别',
    rules: [{ required: true, message: '性别是必填项' }],
    inputType: 'input',
    inputProps: {
      placeholder: '请输入性别',
    },
  },
  dob: {
    key: 'dob',
    label: '出生日期',
    rules: [{ required: true, message: '出生日期是必填项' }],
    inputType: 'input',
    inputProps: {
      placeholder: '请输入出生日期',
    },
  },
  idType: {
    key: 'idType',
    label: '证件类型',
    rules: [{ required: true, message: '证件类型是必填项' }],
    inputType: 'input',
    inputProps: {
      placeholder: '请输入证件类型',
    },
  },
  idNO: {
    key: 'idNO',
    label: '证件号码',
    rules: [{ required: true, message: '证件号码是必填项' }],
    inputType: 'input',
    inputProps: {
      placeholder: '请输入证件号码',
    },
  },
  nationality: {
    key: 'nationality',
    label: '国籍',
    rules: [{ required: true, message: '国籍是必填项' }],
    inputType: 'input',
    inputProps: {
      placeholder: '请输入国籍',
    },
  },
  nativeplace: {
    key: 'nativeplace',
    label: '籍贯',
    rules: [{ required: true, message: '籍贯是必填项' }],
    inputType: 'input',
    inputProps: {
      placeholder: '请输入籍贯',
    },
  },
  ethnic: {
    key: 'ethnic',
    label: '民族',
    rules: [{ required: true, message: '民族是必填项' }],
    inputType: 'input',
    inputProps: {
      placeholder: '请输入民族',
    },
  },
  telephone: {
    key: 'telephone',
    label: '联系电话',
    rules: [{ required: true, message: '联系电话是必填项' }],
    inputType: 'input',
    inputProps: {
      placeholder: '请输入联系电话',
    },
  },
  maritalStatus: {
    key: 'maritalStatus',
    label: '婚姻状况',
    rules: [{ required: true, message: '婚姻状况是必填项' }],
    inputType: 'input',
    inputProps: {
      placeholder: '请输入婚姻状况',
    },
  },
  birthCertificate: {
    key: 'birthCertificate',
    label: '准生证号',
    inputType: 'input',
    inputProps: {
      placeholder: '请输入准生证号',
    },
  },
  residenceAddress: {
    key: 'residenceAddress',
    label: '居住地址',
    // rules: [{ required: true, message: '居住地址是必填项' }],
  },
  householdAddress: {
    key: 'householdAddress',
    label: '户口地址',
    // rules: [{ required: true, message: '户口地址是必填项' }],
  },
  postpartumAddress: {
    key: 'postpartumAddress',
    label: '产休地址',
    // rules: [{ required: true, message: '产休地址是必填项' }],
  },
  nearRelation: {
    key: 'nearRelation',
    label: '近亲结婚',
    rules: [{ required: true, message: '近亲结婚是必填项' }],
    inputType: 'input',
    inputProps: {
      placeholder: '请输入近亲结婚',
    },
  },
  maritalYears: {
    key: 'maritalYears',
    label: '结婚年数',
    rules: [{ required: true, message: '结婚年数是必填项' }],
    inputType: 'input',
    inputProps: {
      placeholder: '请输入结婚年数',
    },
  },
  education: {
    key: 'education',
    label: '学历-教育情况',
    rules: [{ required: true, message: '学历-教育情况是必填项' }],
    inputType: 'input',
    inputProps: {
      placeholder: '请输入学历-教育情况',
    },
  },
  occupation: {
    key: 'occupation',
    label: '职业',
    rules: [{ required: true, message: '职业是必填项' }],
    inputType: 'input',
    inputProps: {
      placeholder: '请输入职业',
    },
  },
  workplace: {
    key: 'workplace',
    label: '工作地-如公司名',
    rules: [{ required: true, message: '工作地是必填项' }],
    inputType: 'input',
    inputProps: {
      placeholder: '请输入工作地',
    },
  },
  workPhone: {
    key: 'workPhone',
    label: '工作电话',
    rules: [{ required: true, message: '工作电话是必填项' }],
    inputType: 'input',
    inputProps: {
      placeholder: '请输入工作电话',
    },
  },
  occupationDetail: {
    key: 'occupationDetail',
    label: '职业备注详情',
    rules: [{ required: true, message: '职业备注详情是必填项' }],
    inputType: 'input',
    inputProps: {
      placeholder: '请输入职业备注详情',
    },
  },
  familyIncome: {
    key: 'familyIncome',
    label: '家庭收入',
    rules: [{ required: true, message: '家庭收入是必填项' }],
    inputType: 'input',
    inputProps: {
      placeholder: '请输入家庭收入',
    },
  },
  partnerName: {
    key: 'partnerName',
    label: '姓名',
    rules: [{ required: true, message: '姓名是必填项' }],
    inputType: 'input',
    inputProps: {
      placeholder: '请输入姓名',
    },
  },
  partnerAge: {
    key: 'partnerAge',
    label: '年龄',
    // rules: [{ required: true, message: '年龄是必填项' }],
    inputType: 'input',
    inputProps: {
      placeholder: '请输入年龄',
    },
  },
  partnerGender: {
    key: 'partnerGender',
    label: '配偶性别',
    rules: [{ required: true, message: '配偶性别是必填项' }],
    inputType: 'input',
    inputProps: {
      placeholder: '请输入配偶性别',
    },
  },
  partnerDob: {
    key: 'partnerDob',
    label: '配偶出生日期',
    rules: [{ required: true, message: '配偶出生日期是必填项' }],
    inputType: 'input',
    inputProps: {
      placeholder: '请输入配偶出生日期',
    },
  },
  partnerIdType: {
    key: 'partnerIdType',
    label: '证件类型',
    rules: [{ required: true, message: '证件类型是必填项' }],
    inputType: 'input',
    inputProps: {
      placeholder: '请输入证件类型',
    },
  },
  partnerIdNO: {
    key: 'partnerIdNO',
    label: '证件号码',
    rules: [{ required: true, message: '证件号码是必填项' }],
    inputType: 'input',
    inputProps: {
      placeholder: '请输入证件号码',
    },
  },
  partnerNationality: {
    key: 'partnerNationality',
    label: '国籍',
    rules: [{ required: true, message: '国籍是必填项' }],
    inputType: 'input',
    inputProps: {
      placeholder: '请输入国籍',
    },
  },
  partnerNativeplace: {
    key: 'partnerDob',
    label: '籍贯',
    rules: [{ required: true, message: '籍贯是必填项' }],
    inputType: 'input',
    inputProps: {
      placeholder: '请输入籍贯',
    },
  },
  partnerEthnic: {
    key: 'partnerEthnic',
    label: '民族',
    rules: [{ required: true, message: '民族是必填项' }],
    inputType: 'input',
    inputProps: {
      placeholder: '请输入民族',
    },
  },
  partnerTelephone: {
    key: 'partnerTelephone',
    label: '手机号码',
    rules: [{ required: true, message: '手机号码是必填项' }],
    inputType: 'input',
    inputProps: {
      placeholder: '请输入手机号码',
    },
  },
  partnerOutpatientNO: {
    key: 'partnerOutpatientNO',
    label: '配偶门诊号',
    // rules: [{ required: true, message: '配偶门诊号是必填项' }],
    inputType: 'input',
    inputProps: {
      placeholder: '请输入配偶门诊号',
    },
  },
  partnerOccupation: {
    key: 'partnerOccupation',
    label: '职业',
    rules: [{ required: true, message: '职业是必填项' }],
    inputType: 'input',
    inputProps: {
      placeholder: '请输入职业',
    },
  },
  partnerCigarette: {
    key: 'partnerCigarette',
    label: '烟',
    rules: [{ required: true, message: '输入每天吸烟的量' }],
    inputType: 'input',
    inputProps: {
      placeholder: '输入每天吸烟的量',
    },
  },
  partnerDrink: {
    key: 'partnerDrink',
    label: '酒',
    rules: [{ required: true, message: '请选择种类' }],
    inputType: 'input',
    inputProps: {
      placeholder: '请选择种类',
    },
  },
  partnerDisease: {
    key: 'partnerDisease',
    label: '是否患有疾病',
    inputType: 'input',
    rules: [{ required: true, message: '配偶工作地点是必填项' }],
    inputProps: {
      placeholder: '请选择疾病名称（可多选）',
    },
  },
  partnerWorkplace: {
    key: 'partnerWorkplace',
    label: '配偶工作地点',
    rules: [{ required: true, message: '配偶工作地点是必填项' }],
    inputType: 'input',
    inputProps: {
      placeholder: '请输入配偶工作地点',
    },
  },
  partnerOccupationDetail: {
    key: 'partnerOccupationDetail',
    label: '配偶职业详情',
    rules: [{ required: true, message: '配偶职业详情是必填项' }],
    inputType: 'input',
    inputProps: {
      placeholder: '请输入配偶职业详情',
    },
  },
  lmp: {
    key: 'lmp',
    label: '末次月经',
    rules: [{ required: true, message: '末次月经是必填项' }],
    inputType: 'input',
    inputProps: {
      placeholder: '请输入末次月经',
    },
  },
  edd: {
    key: 'edd',
    label: '预产期-日期',
    rules: [{ required: true, message: '预产期是必填项' }],
    inputType: 'input',
    inputProps: {
      placeholder: '请输入预产期',
    },
  },
  eddB: {
    key: 'eddB',
    label: '预产期-B超',
    // rules: [{ required: true, message: 'B超预产期是必填项' }],
    inputType: 'input',
    inputProps: {
      placeholder: '请输入B超预产期',
    },
  },
  sureEdd: {
    key: 'sureEdd',
    label: '修订预产期',
    rules: [{ required: true, message: '修订预产期是必填项' }],
    inputType: 'input',
    inputProps: {
      placeholder: '请输入修订预产期',
    },
  },
  gravidity: {
    key: 'gravidity',
    label: '孕次',
    rules: [{ required: true, message: '孕次是必填项' }],
    inputType: 'input',
    inputProps: {
      placeholder: '请输入孕次',
    },
  },
  weightBefore: {
    key: 'weightBefore',
    label: '孕前体重',
    // rules: [{ required: true, message: '孕前体重是必填项' }],
    inputType: 'input',
    inputProps: {
      placeholder: '请输入孕前体重',
    },
  },
  weightNow: {
    key: 'weightNow',
    label: '现体重',
    // rules: [{ required: true, message: '现体重是必填项' }],
    inputType: 'input',
    inputProps: {
      placeholder: '请输入现体重',
    },
  },
  height: {
    key: 'height',
    label: '身高',
    // rules: [{ required: true, message: '身高是必填项' }],
    inputType: 'input',
    inputProps: {
      placeholder: '请输入身高',
    },
  },
  systolicPressure: {
    key: 'systolicPressure',
    label: '收缩压',
    // rules: [{ required: true, message: '收缩压是必填项' }],
    inputType: 'input',
    inputProps: {
      placeholder: '请输入收缩压',
    },
  },
  diastolicPressure: {
    key: 'diastolicPressure',
    label: '舒张压',
    // rules: [{ required: true, message: '舒张压是必填项' }],
    inputType: 'input',
    inputProps: {
      placeholder: '请输入舒张压',
    },
  },
  pulse: {
    key: 'pulse',
    label: '脉搏',
    // rules: [{ required: true, message: '脉搏是必填项' }],
    inputType: 'input',
    inputProps: {
      placeholder: '请输入脉搏',
    },
  },
  menarche: {
    key: 'menarche',
    label: '月经初潮',
    rules: [{ required: true, message: '月经初潮是必填项' }],
    inputType: 'input',
    inputProps: {
      placeholder: '请输入月经初潮',
    },
  },
  menstrualCycle: {
    key: 'menstrualCycle',
    label: '月经周期',
    rules: [{ required: true, message: '月经周期是必填项' }],
    inputType: 'input',
    inputProps: {
      placeholder: '请输入月经周期',
    },
  },
  menstrualPeriod: {
    key: 'menstrualPeriod',
    label: '持续天数',
    rules: [{ required: true, message: '持续天数是必填项' }],
    inputType: 'input',
    inputProps: {
      placeholder: '请输入持续天数',
    },
  },
  dysmenorrhea: {
    key: 'dysmenorrhea',
    label: '痛经',
    rules: [{ required: true, message: '痛经是必填项' }],
    inputType: 'input',
    inputProps: {
      placeholder: '请输入痛经',
    },
  },
  selfCigarette: {
    key: 'selfCigarette',
    label: '烟',
    rules: [{ required: true, message: '烟是必填项' }],
    inputType: 'input',
    inputProps: {
      placeholder: '请输入烟',
    },
  },
  selfDrink: {
    key: 'selfDrink',
    label: '酒',
    rules: [{ required: true, message: '酒是必填项' }],
    inputType: 'input',
    inputProps: {
      placeholder: '请输入酒',
    },
  },
  hazardousSubstance: {
    key: 'hazardousSubstance',
    label: '接触有害物质',
    // rules: [{ required: true, message: '接触有害物质是必填项' }],
    inputType: 'input',
    inputProps: {
      placeholder: '请输入接触有害物质',
    },
  },
  radioactivity: {
    key: 'radioactivity',
    label: '接触放射性',
    rules: [{ required: true, message: '接触放射性是必填项' }],
    inputType: 'input',
    inputProps: {
      placeholder: '请输入接触放射性',
    },
  },
  hypertension: {
    key: 'hypertension',
    label: '高血压',
    // rules: [{ required: true, message: '高血压是必填项' }],
    inputType: 'input',
    inputProps: {
      placeholder: '请输入高血压',
    },
  },
  diabetes: {
    key: 'diabetes',
    label: '糖尿病',
    // rules: [{ required: true, message: '糖尿病是必填项' }],
    inputType: 'input',
    inputProps: {
      placeholder: '请输入糖尿病',
    },
  },
  cardiacDisease: {
    key: 'cardiacDisease',
    label: '心脏病',
    // rules: [{ required: true, message: '心脏病是必填项' }],
    inputType: 'input',
    inputProps: {
      placeholder: '请输入心脏病',
    },
  },
  familyHistory: {
    key: 'familyHistory',
    label: '家族史',
    rules: [{ required: true, message: '家族史是必填项' }],
    inputType: 'input',
    inputProps: {
      placeholder: '请输入家族史',
    },
  },
  parity: {
    key: 'parity',
    label: '产次',
    // rules: [{ required: true, message: '产次是必填项' }],
    inputType: 'input',
    inputProps: {
      placeholder: '请输入产次',
    },
  },
  gestationalWeek: {
    key: 'gestationalWeek',
    label: '孕周',
    rules: [{ required: true, message: '孕周是必填项' }],
    inputType: 'input',
    inputProps: {
      placeholder: '请输入孕周',
    },
  },
  note: {
    key: 'note',
    label: '特殊说明',
    rules: [{ required: true, message: '特殊说明是必填项' }],
    inputType: 'input',
    inputProps: {
      placeholder: '请输入特殊说明',
    },
  },
  recordDate: {
    key: 'recordDate',
    label: '建档日期',
    // rules: [{ required: true, message: '建档日期是必填项' }],
    inputType: 'input',
    inputProps: {
      placeholder: '请输入建档日期',
    },
  },
  recordNo: {
    key: 'recordNo',
    label: '建档号',
    // rules: [{ required: true, message: '建档号是必填项' }],
    inputType: 'input',
    inputProps: {
      disabled: true,
    },
  },
  recordsrc: {
    key: 'recordsrc',
    label: '建册方式',
    rules: [{ required: true, message: '建册方式是必填项' }],
    inputType: 'input',
    inputProps: {
      placeholder: '请输入建册方式',
    },
  },
  recordstate: {
    key: 'recordstate',
    label: '档案状态',
    rules: [{ required: true, message: '档案状态是必填项' }],
    inputType: 'input',
    inputProps: {
      placeholder: '请输入档案状态',
    },
  },
  //   gestationalWeek: {
  //     key: 'gestationalWeek',
  //     label: '孕周',
  //     rules: [{ required: true, message: '孕周是必填项' }],
  //     inputType: 'input',
  //     inputProps: {
  //       placeholder: '请输入孕周',
  //     },
  //   },
  //   gestationalWeek: {
  //     key: 'gestationalWeek',
  //     label: '孕周',
  //     rules: [{ required: true, message: '孕周是必填项' }],
  //     inputType: 'input',
  //     inputProps: {
  //       placeholder: '请输入孕周',
  //     },
  //   },
};

export const pregnancyHistoryForm = {
  pregnancyEnd: {
    key: 'pregnancyEnd',
    label: '妊娠终止',
    // rules: [{ required: true, message: '妊娠终止是必填项' }],
    inputType: 'input',
    inputProps: {
      placeholder: '请输入妊娠终止',
    },
  },
  complication: {
    key: 'complication',
    label: '并发症',
    rules: [{ required: true, message: '并发症是必填项' }],
    inputType: 'input',
    inputProps: {
      placeholder: '请输入并发症',
    },
  },
  isChildbirth: {
    key: 'isChildbirth',
    label: '是否分娩',
    // rules: [{ required: true, message: '分娩是必填项' }],
    inputType: 'input',
    inputProps: {
      placeholder: '请输入分娩',
    },
  },
  abortionMode: {
    key: 'abortionMode',
    label: '流产方式',
    // rules: [{ required: true, message: '流产方式是必填项' }],
    inputType: 'input',
    inputProps: {
      placeholder: '请输入流产方式',
    },
  },
  badBirth: {
    key: 'badBirth',
    label: '不良生育史',
    // rules: [{ required: true, message: '不良生育史是必填项' }],
    inputType: 'input',
    inputProps: {
      placeholder: '请输入不良生育史',
    },
  },
  maternityHospital: {
    key: 'maternityHospital',
    label: '分娩医院',
    // rules: [{ required: true, message: '分娩医院是必填项' }],
    inputType: 'input',
    inputProps: {
      placeholder: '请输入分娩医院',
    },
  },
  gestationalWeek: {
    key: 'gestationalWeek',
    label: '分娩孕周',
    rules: [{ required: true, message: '分娩孕周是必填项' }],
    inputType: 'input',
    inputProps: {
      placeholder: '请输入分娩孕周',
    },
  },
  foetusNumber: {
    key: 'foetusNumber',
    label: '胎数',
    // rules: [{ required: true, message: '胎数是必填项' }],
    inputType: 'input',
    inputProps: {
      placeholder: '请输入胎数',
    },
  },
  deliveryMode: {
    key: 'deliveryMode',
    label: '分娩方式',
    // rules: [{ required: true, message: '分娩方式是必填项' }],
    inputType: 'input',
    inputProps: {
      placeholder: '请输入分娩方式',
    },
  },
  postpartumFever: {
    key: 'postpartumFever',
    label: '产后持续发热',
    // rules: [{ required: true, message: '产后持续发热是必填项' }],
    inputType: 'input',
    inputProps: {
      placeholder: '请输入产后持续发热',
    },
  },
  hemorrhage: {
    key: 'hemorrhage',
    label: '产后出血',
    // rules: [{ required: true, message: '产后出血是必填项' }],
    inputType: 'input',
    inputProps: {
      placeholder: '请输入产后出血',
    },
  },
};
