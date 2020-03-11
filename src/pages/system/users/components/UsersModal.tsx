import generateModalForm from '@/components/BaseModalForm';
import { modalFormDescriptions as formDescriptions } from '../config/form';

export default generateModalForm({
  formDescriptions,
  url: 'users',
  title: '用户',
  fixedFormParams: { type: 'CTGAPPLY' },
});
