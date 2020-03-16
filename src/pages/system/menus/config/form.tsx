export const modalFormDescriptions = {
  // id: {
  //   key: 'id',
  //   label: '编号',
  //   inputType: 'id',
  //   inputProps: {
  //     disabled: true,
  //   },
  // },
  parentid: {
    key: 'parentid',
    label: '父级菜单',
    rules: [{ required: true, message: '父级菜单是必选项' }],
    inputType: 'parent_select',
    inputProps: {
      placeholder: '请选择父级菜单',
    },
  },
  name: {
    key: 'name',
    label: '菜单名称',
    rules: [{ required: true, message: '菜单名称是必填项' }],
    inputType: 'input',
    inputProps: {
      placeholder: '请输入菜单名称',
    },
  },
  type: {
    key: 'type',
    label: '类型',
    rules: [{ required: true, message: '类型是必填项' }],
    inputType: 'permission_type',
    inputProps: {
      placeholder: '请输入类型',
    },
  },
  key: {
    key: 'key',
    label: '模块名',
    rules: [{ required: true, message: '模块名是必填项' }],
    inputType: 'input',
    inputProps: {
      placeholder: '请输入模块名',
    },
  },
  // code: {
  //   key: 'code',
  //   label: '属性代号',
  //   inputType: 'input',
  //   inputProps: {
  //     placeholder: '请输入属性代号',
  //   },
  // },
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
