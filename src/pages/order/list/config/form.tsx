export const queryFormDescriptions = {
  username: {
    key: 'username',
    label: '用户姓名',
  },
  telephone: {
    key: 'telephone',
    label: '联系方式',
  },
  submitTime: {
    key: 'submitTime',
    label: '提交时间',
  },
  orderStatus: {
    key: 'orderStatus',
    label: '订单状态',
  },
};

export const bindDeviceFormDescriptions = {
  username: {
    key: 'username',
    label: '用户姓名',
    inputType: 'view_only',
    path: 'pregnancy.name',
  },
  contactType: {
    key: 'contactType',
    label: '联系方式',
    inputType: 'view_only',
    path: 'pregnancy.telephone',
  },
  type: {
    key: 'type',
    label: '设备类型',
    inputType: 'product',
    viewOnly: true,
    path: 'device.type',
  },
  erpno: {
    key: 'erpno',
    label: '设备编号',
    rules: [{ required: true, message: '设备编号是必填项' }],
    inputType: 'input',
    inputProps: {
      placeholder: '请输入设备编号',
    },
  },
};

export const bindServiceFormDescriptions = {
  username: {
    key: 'username',
    label: '用户姓名',
    inputType: 'view_only',
    path: 'pregnancy.name',
  },
  contactType: {
    key: 'contactType',
    label: '联系方式',
    inputType: 'view_only',
    path: 'pregnancy.telephone',
  },
  service1amount: {
    key: 'service1amount',
    label: '服务次数',
    inputType: 'input_number',
    rules: [{ required: true, message: '服务次数是必填项' }],
    inputProps: {
      placeholder: '请输入服务次数',
    },
  },
};

export const depositBackFormDescriptions = {
  username: {
    key: 'username',
    label: '用户姓名',
    inputType: 'view_only',
    path: 'pregnancy.name',
  },
  contactType: {
    key: 'contactType',
    label: '联系方式',
    inputType: 'view_only',
    path: 'pregnancy.telephone',
  },
};

export const orderCloseFormDescriptions = {
  comment: {
    key: 'comment',
    label: '操作备注',
    inputType: 'text_area',
    rules: [{ required: true, message: '操作备注是必填项' }],
    inputProps: {
      placeholder: '请输入操作备注',
      autoSize: { minRows: 5 },
    },
  },
};

export const remindBackFormDescriptions = {
  title: {
    key: 'title',
    label: '标题',
    inputType: 'input',
    rules: [{ required: true, message: '标题是必填项' }],
    inputProps: {
      placeholder: '请输入操作备注',
    },
  },
  content: {
    key: 'content',
    label: '内容',
    inputType: 'text_area',
    rules: [{ required: true, message: '内容是必填项' }],
    inputProps: {
      placeholder: '请输入推送内容',
      autoSize: { minRows: 5 },
    },
  },
};

export const deviceBackFormDescriptions = {
  username: {
    key: 'username',
    label: '用户姓名',
    inputType: 'view_only',
    path: 'pregnancy.name',
  },
  contactType: {
    key: 'contactType',
    label: '联系方式',
    inputType: 'view_only',
    path: 'pregnancy.telephone',
  },
  type: {
    key: 'type',
    label: '设备类型',
    inputType: 'product',
    viewOnly: true,
    path: 'device.type',
  },
  erpno: {
    key: 'erpno',
    label: '设备编号',
    inputType: 'view_only',
    path: 'erpno',
  },
};

export default {
  queryFormDescriptions,
  bindDeviceFormDescriptions,
  bindServiceFormDescriptions,
  depositBackFormDescriptions,
  orderCloseFormDescriptions,
  remindBackFormDescriptions,
  deviceBackFormDescriptions,
};
