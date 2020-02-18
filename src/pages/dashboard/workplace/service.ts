import request from '@/utils/request';

export async function queryProjectNotice() {
  return request.get('/api/project/notice');
}

export async function queryActivities() {
  return request.get('/api/activities');
}

export async function fakeChartData() {
  return request.get('/api/fake_chart_data');
}

export async function queryCurrent() {
  return request.get('/api/currentUser');
}
