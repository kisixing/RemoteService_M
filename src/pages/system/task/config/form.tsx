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
    label: '任务名称',
    rules: [{ required: true, message: '任务名称是必填项' }],
    inputType: 'input',
    inputProps: {
      placeholder: '请输入任务名称',
    },
  },
  targetObject: {
    key: 'targetObject',
    label: '任务对象',
    rules: [{ required: true, message: '任务对象是必填项' }],
    inputType: 'input',
    inputProps: {
      placeholder: '请选择任务对象',
    },
  },
  targetMethod: {
    key: 'targetMethod',
    label: '任务方法',
    rules: [{ required: true, message: '任务方法是必填项' }],
    inputType: 'input',
    inputProps: {
      placeholder: '请选择任务方法',
    },
  },
  description: {
    key: 'description',
    label: '任务描述',
    rules: [{ required: true, message: '任务描述是必填项' }],
    inputType: 'text_area',
    inputProps: {
      placeholder: '请输入任务描述',
    },
  },
  triggerType: {
    key: 'triggerType',
    label: '触发器类型',
    rules: [{ required: true, message: '触发器类型是必填项' }],
    inputType: 'trigger_type_select',
    inputProps: {
      placeholder: '请选择触发器类型',
    },
  },
  fireTime: {
    key: 'fireTime',
    label: '触发时间',
    rules: [{ required: true, message: '触发时间是必填项' }],
    inputType: 'single_date_picker',
    inputProps: {
      placeholder: '请选择触发时间',
      showTime: true,
    },
  },
  cronExpression: {
    key: 'cronExpression',
    label: 'cron表达式',
    rules: [{ required: true, message: 'cron表达式是必填项' }],
    inputType: 'cron',
    inputProps: {
      placeholder: '请选择cron表达式',
    },
  },
  strategy: {
    key: 'strategy',
    label: '异常处理策略',
    rules: [{ required: true, message: '异常处理策略是必填项' }],
    inputType: 'input',
    inputProps: {
      placeholder: '请选择异常处理策略',
    },
  },
  sortorder: {
    key: 'sortorder',
    label: '排序值',
    rules: [{ required: true, message: '排序值是必填项' }],
    inputType: 'input',
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
