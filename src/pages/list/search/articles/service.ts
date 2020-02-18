import request from '@/utils/request';
import { ListItemDataType } from './data.d';

export async function queryFakeList(params: ListItemDataType) {
  return request.get('/api/fake_list', {
    params,
  });
}
