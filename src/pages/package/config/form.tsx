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
    label: '套餐名称',
    rules: [{ required: true, message: '套餐名称是必填项' }],
    inputType: 'input',
    inputProps: {
      placeholder: '请输入套餐名称',
    },
  },
  products: {
    key: 'products',
    label: '包含产品（多选）',
    rules: [{ required: true, message: '包含产品是必填项' }],
    inputType: 'product',
    inputProps: {
      placeholder: '请输入包含产品（多选）',
      mode: 'multiple',
    },
  },
  summary: {
    key: 'summary',
    label: '套餐总概',
    rules: [{ required: true, message: '套餐总概是必填项' }],
    inputType: 'text_area',
    inputProps: {
      placeholder: '请输入套餐总概',
    },
  },
  price: {
    key: 'price',
    label: '套餐价格（元）',
    rules: [{ required: true, message: '套餐价格是必填项' }],
    inputType: 'input_number',
    inputProps: {
      placeholder: '请输入套餐价格（元）',
    },
  },
  suggestedprice: {
    key: 'suggestedprice',
    label: '建议售价（元）',
    rules: [{ required: true, message: '建议售价是必填项' }],
    inputType: 'input_number',
    inputProps: {
      placeholder: '请输入建议售价（元）',
    },
  },
  validdate: {
    key: 'validdate',
    label: '有效期',
    rules: [{ required: true, message: '有效期是必填项' }],
    inputType: 'validdate',
    inputProps: {
      placeholder: '请输入有效期',
    },
  },
  service1amount: {
    key: 'service1amount',
    label: '胎监判图次数',
    rules: [{ required: true, message: '胎监判图次数是必填项' }],
    inputType: 'input_number',
    inputProps: {
      placeholder: '请输入胎监判图次数',
    },
  },
  service2amount: {
    key: 'service2amount',
    label: '在线咨询次数',
    rules: [{ required: true, message: '在线咨询次数是必填项' }],
    inputType: 'input_number',
    inputProps: {
      placeholder: '请输入在线咨询次数',
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
  isdeleted: {
    key: 'isdeleted',
    label: '是否可用',
    rules: [{ required: true, message: '是否可用是必填项' }],
    inputType: 'radio',
    inputProps: {
      placeholder: '请输入是否可用',
    },
  },
  topflag: {
    key: 'topflag',
    label: '是否置顶',
    rules: [{ required: true, message: '是否置顶是必填项' }],
    inputType: 'radio',
    inputProps: {
      placeholder: '请输入是否置顶',
    },
  },
};

export default {
  modalFormDescriptions,
};
