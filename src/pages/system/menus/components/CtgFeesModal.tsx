import generateModalForm from '@/components/BaseModalForm';
import { modalFormDescriptions as formDescriptions } from '../config/form';

export default generateModalForm({
  formDescriptions,
  url: 'ctgapplyfees',
  title: '判图费',
  fixedFormParams: { type: 'CTGAPPLY' },
});
