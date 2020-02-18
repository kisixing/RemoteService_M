import request from '@/utils/request';

export async function queryProjectNotice() {
  return request.get('/project/notice');
}

export async function queryActivities() {
  return request.get('/activities');
}

export async function fakeChartData() {
  return request.get('/fake_chart_data');
}

export async function queryCurrent() {
  return request.get('/currentUser');
}
