import generateModalForm from '@/components/BaseModalForm';
import { modalFormDescriptions as formDescriptions } from '../config/form';

export default generateModalForm({
  formDescriptions,
  url: 'groups',
  title: '角色',
  fixedFormParams: { type: 'CTGAPPLY' },
});
