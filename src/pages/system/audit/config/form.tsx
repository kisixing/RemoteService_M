export const modalFormDescriptions = {
  // id: {
  //   key: 'id',
  //   label: '编号',
  //   inputType: 'id',
  //   inputProps: {
  //     disabled: true,
  //   },
  // },
  entityId: {
    key: 'entityId',
    label: '审计编号',
    rules: [{ required: true, message: '审计编号是必填项' }],
    inputType: 'input',
    inputProps: {
      placeholder: '请输入审计编号',
    },
  },
  action: {
    key: 'action',
    label: '审计类型',
    rules: [{ required: true, message: '审计类型是必填项' }],
    inputType: 'input',
    inputProps: {
      placeholder: '请输入审计类型',
    },
  },
  entityValue: {
    key: 'entityValue',
    label: '审计值',
    rules: [{ required: true, message: '审计值是必填项' }],
    inputType: 'text_area',
    inputProps: {
      placeholder: '请输入审计值',
    },
  },
  commitVersion: {
    key: 'commitVersion',
    label: '版本',
    rules: [{ required: true, message: '版本是必填项' }],
    inputType: 'input',
    inputProps: {
      placeholder: '请输入版本',
    },
  },
};

export default {
  modalFormDescriptions,
};
