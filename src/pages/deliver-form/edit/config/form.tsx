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
};
