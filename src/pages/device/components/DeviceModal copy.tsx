import generateModalForm from '@/components/BaseModalForm';
import { modalFormDescriptions as formDescriptions } from '../config/form';
import { fromApi, toApi } from '../config/adapter';

export default generateModalForm({
  formDescriptions,
  url: 'devices',
  title: '设备',
  fromApi,
  toApi,
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
