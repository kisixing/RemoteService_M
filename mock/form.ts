import { Request, Response } from 'express';

const getForm = (req: Request, res: Response) => {
  res.json([
    {
      id: 1,
      name: '孕妇基本信息',
      flag: 'pregnantWoman',
      sort: 1,
      fields: [
        {
          key: 'outpatientNO',
          label: '门诊号',
          rules: [{ required: true, message: '门诊号是必填项' }],
          inputType: 'input',
          inputProps: {
            placeholder: '请输入门诊号',
          },
          sort: 1,
          span: 7,
          offset: 0,
          formItemLayout: {
            labelCol: {
              span: 8,
            },
            wrapperCol: {
              span: 16,
            },
          },
        },
        {
          key: 'name',
          label: '孕妇姓名',
          rules: [{ required: true, message: '孕妇姓名是必填项' }],
          inputType: 'input',
          inputProps: {
            placeholder: '请输入孕妇姓名',
          },
          sort: 2,
          span: 7,
          offset: 0,
          isNewRow: true,
          formItemLayout: {
            labelCol: {
              span: 8,
            },
            wrapperCol: {
              span: 16,
            },
          },
        },
        {
          key: 'telephone',
          label: '手机号码',
          rules: [{ required: true, message: '手机号码是必填项' }],
          inputType: 'input',
          inputProps: {
            placeholder: '请输入手机号码',
          },
          sort: 3,
          span: 7,
          offset: 1,
          formItemLayout: {
            labelCol: {
              span: 8,
            },
            wrapperCol: {
              span: 16,
            },
          },
        },
        {
          key: 'workPhone',
          label: '固定电话',
          rules: [{ required: true, message: '固定电话是必填项' }],
          inputType: 'input',
          inputProps: {
            placeholder: '请输入固定电话',
          },
          sort: 1,
          span: 7,
          offset: 1,
          formItemLayout: {
            labelCol: {
              span: 8,
            },
            wrapperCol: {
              span: 16,
            },
          },
        },
        {
          key: 'idType',
          label: '证件类型',
          rules: [{ required: true, message: '证件类型是必填项' }],
          inputType: 'input',
          inputProps: {
            placeholder: '请输入证件类型',
          },
          sort: 1,
          span: 7,
          isNewRow: true,
          offset: 0,
          formItemLayout: {
            labelCol: {
              span: 8,
            },
            wrapperCol: {
              span: 16,
            },
          },
        },
        {
          key: 'idNO',
          label: '证件号码',
          rules: [{ required: true, message: '证件号码是必填项' }],
          inputType: 'input',
          inputProps: {
            placeholder: '请输入证件号码',
          },
          sort: 1,
          span: 7,
          offset: 1,
          formItemLayout: {
            labelCol: {
              span: 8,
            },
            wrapperCol: {
              span: 16,
            },
          },
        },
        {
          key: 'householdAddress',
          label: '户口地址',
          rules: [{ required: true, message: '户口地址是必填项' }],
          inputType: 'address',
          inputProps: {
            placeholder: '请输入户口地址',
          },
          sort: 1,
          span: 23,
          isNewRow: true,
          offset: 0,
          styles: {
            paddingLeft: 22,
          },
          formItemLayout: {
            labelCol: {
              span: 2,
            },
            wrapperCol: {
              span: 22,
            },
          },
        },
      ],
    },
    {
      id: 2,
      name: '丈夫基本信息',
      flag: 'husband',
      sort: 2,
      fields: [
        {
          key: 'outpatientNO',
          label: '门诊号',
          rules: [{ required: true, message: '门诊号是必填项' }],
          inputType: 'input',
          inputProps: {
            placeholder: '请输入门诊号',
          },
          sort: 1,
          span: 7,
          offset: 0,
          formItemLayout: {
            labelCol: {
              span: 8,
            },
            wrapperCol: {
              span: 16,
            },
          },
        },
        {
          key: 'name',
          label: '孕妇姓名',
          rules: [{ required: true, message: '孕妇姓名是必填项' }],
          inputType: 'input',
          inputProps: {
            placeholder: '请输入孕妇姓名',
          },
          sort: 2,
          span: 7,
          offset: 0,
          isNewRow: true,
          formItemLayout: {
            labelCol: {
              span: 8,
            },
            wrapperCol: {
              span: 16,
            },
          },
        },
        {
          key: 'telephone',
          label: '手机号码',
          rules: [{ required: true, message: '手机号码是必填项' }],
          inputType: 'input',
          inputProps: {
            placeholder: '请输入手机号码',
          },
          sort: 3,
          span: 7,
          offset: 1,
          formItemLayout: {
            labelCol: {
              span: 8,
            },
            wrapperCol: {
              span: 16,
            },
          },
        },
        {
          key: 'workPhone',
          label: '固定电话',
          rules: [{ required: true, message: '固定电话是必填项' }],
          inputType: 'input',
          inputProps: {
            placeholder: '请输入固定电话',
          },
          sort: 1,
          span: 7,
          offset: 1,
          formItemLayout: {
            labelCol: {
              span: 8,
            },
            wrapperCol: {
              span: 16,
            },
          },
        },
        {
          key: 'idType',
          label: '证件类型',
          rules: [{ required: true, message: '证件类型是必填项' }],
          inputType: 'input',
          inputProps: {
            placeholder: '请输入证件类型',
          },
          sort: 1,
          span: 7,
          isNewRow: true,
          offset: 0,
          formItemLayout: {
            labelCol: {
              span: 8,
            },
            wrapperCol: {
              span: 16,
            },
          },
        },
        {
          key: 'idNO',
          label: '证件号码',
          rules: [{ required: true, message: '证件号码是必填项' }],
          inputType: 'input',
          inputProps: {
            placeholder: '请输入证件号码',
          },
          sort: 1,
          span: 7,
          offset: 1,
          formItemLayout: {
            labelCol: {
              span: 8,
            },
            wrapperCol: {
              span: 16,
            },
          },
        },
        {
          key: 'householdAddress',
          label: '户口地址',
          rules: [{ required: true, message: '户口地址是必填项' }],
          inputType: 'address',
          inputProps: {
            placeholder: '请输入户口地址',
          },
          sort: 1,
          span: 23,
          isNewRow: true,
          offset: 0,
          styles: {
            paddingLeft: 22,
          },
          formItemLayout: {
            labelCol: {
              span: 2,
            },
            wrapperCol: {
              span: 22,
            },
          },
        },
      ],
    },
    {
      id: 3,
      name: '本次孕产信息',
      flag: 'pregnantInfo',
      sort: 3,
    },
    {
      id: 4,
      name: '孕产史',
      flag: 'pregnantHistory',
      sort: 4,
    },
  ]);
};

const getFields = (req: Request, res: Response) => {
  res.json([
    {
      id: 1,
      name: '孕妇基本信息',
      flag: 'pregnantWoman',
      sort: 1,
    },
    {
      id: 2,
      name: '丈夫基本信息',
      flag: 'husband',
      sort: 2,
    },
    {
      id: 3,
      name: '本次孕产信息',
      flag: 'pregnantInfo',
      sort: 3,
    },
    {
      id: 4,
      name: '孕产史',
      flag: 'pregnantHistory',
      sort: 4,
    },
  ]);
};

export default {
  'GET /form/pregnants': getForm,
};
