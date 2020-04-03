import generateModalForm from '@/components/BaseModalForm';
import { modalFormDescriptions as formDescriptions } from '../config/form';
import { toApi, fromApi } from '../config/adapter';

export default generateModalForm({
  formDescriptions,
  url: 'servicepackages',
  title: '套餐',
  fromApi,
  toApi,
  formItemLayout: {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 16,
    },
  },
  modalProps: {
    width: 1200,
  },
});
