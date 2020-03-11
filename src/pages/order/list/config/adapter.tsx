import { map, get, keyBy } from 'lodash';
import { formatTimeToStandard } from '@/utils/format';
import { orderStatusMapping } from '@/components/selects/OrderTypeSelect';

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

export const fromApi = data => {
  const payTypes = keyBy(payTypeMapping, 'code');
  return {
    ...data,
    username: get(data, 'pregnancy.name'),
    telephone: get(data, 'pregnancy.telephone'),
    paytypeString: get(payTypes, `${get(data, 'paytype')}.name`),
    paystateString: get(data, 'paystate') === 1 ? '支付成功' : '支付失败',
    pregnancyId: get(data, 'pregnancy.id'),
    submitTime: formatTimeToStandard(get(data, 'createtime')),
    orderStatus: get(keyBy(orderStatusMapping, 'value'), `${get(data, 'state')}.title`) || '未知',
  };
};

export const processFromApi = (data: any) => map(data, item => fromApi(item));
