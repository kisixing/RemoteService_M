export const modalFormDescriptions = {
  id: {
    key: 'id',
    label: '编号',
    inputType: 'id',
    inputProps: {
      disabled: true,
    },
  },
  name: {
    key: 'name',
    label: '名称',
    rules: [{ required: true, message: '名称是必填项' }],
    inputType: 'input',
    inputProps: {
      placeholder: '请输入名称',
    },
  },
  price: {
    key: 'price',
    label: '价格',
    rules: [{ required: true, message: '价格是必填项' }],
    inputType: 'input_number',
    inputProps: {
      placeholder: '请输入价格',
    },
  },
  sortorder: {
    key: 'sortorder',
    label: '排序值',
    rules: [{ required: true, message: '排序值是必填项' }],
    inputType: 'input_number',
    inputProps: {
      placeholder: '请输入排序值',
    },
  },
  // test: {
  //   key: 'test',
  //   label: 'test',
  //   rules: [{ required: true, message: 'test是必填项' }],
  //   inputType: 'input',
  //   inputProps: {
  //     placeholder: '请输入test值',
  //   },
  // },
};

export default {
  modalFormDescriptions,
};
