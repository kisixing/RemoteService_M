import { get, map, keyBy } from 'lodash';
export const payTypeMapping = [
  {
    code: 'WX',
    name: '微信',
  },
  {
    code: 'alipay',
    name: '支付宝',
  },
];

export const processFromApi = (data: any) => {
  const payTypes = keyBy(payTypeMapping, 'code');

  return map(data, item => {
    return {
      ...item,
      username: get(item, 'pregnancy.name'),
      telephone: get(item, 'pregnancy.telephone'),
      paytypeString: get(payTypes, `${get(item, 'paytype')}.name`) || '未知',
      pregnancyId: get(item, 'pregnancy.id'),
      prenatalVisitTime: get(item, 'prenatalvisit.visitTime'),
    };
  });
};
