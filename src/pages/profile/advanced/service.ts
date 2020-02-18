import request from '@/utils/request';

export async function queryAdvancedProfile() {
  return request.get('/api/profile/advanced');
}
