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
    label: '产品名称',
    rules: [{ required: true, message: '产品名称是必填项' }],
    inputType: 'input',
    inputProps: {
      placeholder: '请输入产品名称',
    },
  },
  picture: {
    key: 'picture',
    label: '产品图片',
    rules: [{ required: true, message: '产品图片是必填项' }],
    inputType: 'upload_img',
    inputProps: {
      placeholder: '请输入产品图片',
    },
  },
  introduction: {
    key: 'introduction',
    label: '产品介绍',
    rules: [{ required: true, message: '产品介绍是必填项' }],
    inputType: 'editor',
    inputProps: {
      placeholder: '请输入产品介绍',
      bordered: true,
      style: { height: '300px', overflowY: 'hidden' },
    },
  },
  specification: {
    key: 'specification',
    label: '产品规格',
    rules: [{ required: true, message: '产品规格是必填项' }],
    inputType: 'editor',
    inputProps: {
      placeholder: '请输入产品规格',
      bordered: true,
      style: { height: '300px', overflowY: 'hidden' },
    },
  },
  note: {
    key: 'note',
    label: '使用或注意事项',
    rules: [{ required: true, message: '使用或注意事项是必填项' }],
    inputType: 'editor',
    inputProps: {
      placeholder: '请输入使用或注意事项',
      bordered: true,
      style: { height: '300px', overflowY: 'hidden' },
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
};


export const queryFormDescriptions = {
  name: {
    key: 'name',
    label: '产品名称',
  },
};

export default {
  modalFormDescriptions,
  queryFormDescriptions,
};
