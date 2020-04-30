export const modalFormDescriptions = {
  id: {
    key: 'id',
    label: 'ID',
    inputType: 'id',
    inputProps: {
      disabled: true,
    },
  },
  key: {
    key: 'key',
    label: 'key',
    rules: [{ required: true, message: 'key是必填项' }],
    inputType: 'input',
    inputProps: {
      placeholder: '请输入key',
    },
  },
  label: {
    key: 'label',
    label: '标签',
    rules: [{ required: true, message: '标签是必填项' }],
    inputType: 'input',
    inputProps: {
      placeholder: '请输入标签',
    },
  },
  tranfer_rules: {
    key: 'tranfer_rules',
    label: '转换规则',
    rules: [{ required: true, message: '转换规则是必填项' }],
    inputType: 'text_area',
    inputProps: {
      placeholder: '请输入转换规则',
    },
  },
  rules: {
    key: 'rules',
    label: '验证规则',
    rules: [{ required: true, message: '验证规则是必填项' }],
    inputType: 'text_area',
    inputProps: {
      placeholder: '请输入验证规则',
    },
  },
  input_type: {
    key: 'input_type',
    label: '字段类型',
    rules: [{ required: true, message: '字段类型是必填项' }],
    inputType: 'input',
    inputProps: {
      placeholder: '请输入字段类型',
    },
  },
  special_config: {
    key: 'special_config',
    label: '特殊配置',
    rules: [{ required: true, message: '特殊配置是必填项' }],
    inputType: 'text_area',
    inputProps: {
      placeholder: '请输入特殊配置',
    },
  },
  input_props: {
    key: 'input_props',
    label: '字段属性',
    rules: [{ required: true, message: '字段属性是必填项' }],
    inputType: 'text_area',
    inputProps: {
      placeholder: '请输入字段属性',
    },
  },
  span: {
    key: 'span',
    label: '字段占比(24栅格)',
    rules: [{ required: true, message: '字段占比(24栅格)是必填项' }],
    inputType: 'input_number',
    inputProps: {
      placeholder: '请输入字段占比(24栅格)',
    },
  },
  offset: {
    key: 'offset',
    label: '字段间距(24栅格)',
    rules: [{ required: true, message: '字段间距(24栅格)是必填项' }],
    inputType: 'input_number',
    inputProps: {
      placeholder: '请输入字段间距(24栅格)',
    },
  },
  is_new_row: {
    key: 'is_new_row',
    label: '是否新行',
    rules: [{ required: true, message: '是否新行是必填项' }],
    inputType: 'input_number',
    inputProps: {
      placeholder: '请输入是否新行',
    },
  },
  form_item_layout: {
    key: 'form_item_layout',
    label: '字段排版',
    rules: [{ required: true, message: '字段排版是必填项' }],
    inputType: 'text_area',
    inputProps: {
      placeholder: '请输入字段排版',
    },
  },
  section_id: {
    key: 'section_id',
    label: '所属模块',
    rules: [{ required: true, message: '所属模块是必填项' }],
    inputType: 'input_number',
    inputProps: {
      placeholder: '请输入所属模块',
    },
  },
  styles: {
    key: 'styles',
    label: '字段样式',
    rules: [{ required: true, message: '字段样式是必填项' }],
    inputType: 'text_area',
    inputProps: {
      placeholder: '请输入字段样式',
    },
  },
  is_active: {
    key: 'is_active',
    label: '是否启用',
    rules: [{ required: true, message: '是否启用是必填项' }],
    inputType: 'input_number',
    inputProps: {
      placeholder: '请输入是否启用',
    },
  },
  sort: {
    key: 'sort',
    label: '排序值',
    rules: [{ required: true, message: '排序值是必填项' }],
    inputType: 'input_number',
    inputProps: {
      placeholder: '请输入排序值',
    },
  },
};

export const queryFormDescriptions = {
  id: {
    key: 'id',
    label: 'ID',
  },
  section_id: {
    key: 'section_id',
    label: '所属模块ID',
  },
  key: {
    key: 'key',
    label: 'key',
  },
  label: {
    key: 'label',
    label: '标签名称',
  },
};

export default {
  modalFormDescriptions,
  queryFormDescriptions,
};
