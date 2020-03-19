export const modalFormDescriptions = {
  // id: {
  //   key: 'id',
  //   label: '编号',
  //   inputType: 'id',
  //   inputProps: {
  //     disabled: true,
  //   },
  // },
  name: {
    key: 'name',
    label: '版本号',
    rules: [{ required: true, message: '版本号是必填项' }],
    inputType: 'input',
    inputProps: {
      placeholder: '请输入版本号',
    },
  },
  type: {
    key: 'type',
    label: '版本类型',
    rules: [{ required: true, message: '版本类型是必填项' }],
    inputType: 'input',
    inputProps: {
      placeholder: '请输入版本类型',
    },
  },
  uri: {
    key: 'uri',
    label: '地址',
    rules: [{ required: true, message: '地址是必填项' }],
    inputType: 'input',
    inputProps: {
      placeholder: '请输入地址',
    },
  },
  description: {
    key: 'description',
    label: '版本描述',
    rules: [{ required: true, message: '版本描述是必填项' }],
    inputType: 'text_area',
    inputProps: {
      placeholder: '请输入版本描述',
    },
  },
};

export default {
  modalFormDescriptions,
};
