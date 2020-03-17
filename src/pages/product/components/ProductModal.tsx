import generateModalForm from '@/components/BaseModalForm';
import { modalFormDescriptions as formDescriptions } from '../config/form';
import { fromApi, toApi } from '../config/adapter';

export default generateModalForm({
  formDescriptions,
  url: 'products',
  title: '产品',
  toApi,
  fromApi,
  modalProps: {
    width: 1200,
  },
  formItemLayout: {
    labelCol: {
      span: 3,
    },
    wrapperCol: {
      span: 20,
    },
  },
});
