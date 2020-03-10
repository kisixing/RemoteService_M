import generateModalForm from '@/components/BaseModalForm';
import { modalFormDescriptions as formDescriptions } from '../config/form';

export default generateModalForm({
  formDescriptions,
  url: 'products',
  title: '产品',
  modalProps: {
    width: 1200
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
