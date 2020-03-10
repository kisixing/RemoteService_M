import { omit, get } from 'lodash';

export const fromApi = (data: any) => {
  return {
    id: get(data, 'id'),
    devicename: get(data, 'devicename'),
    type: Number(get(data, 'type')),
    manufacturer: get(data, 'manufacturer'),
    model: get(data, 'model'),
    erpno: get(data, 'erpno'),
    status: get(data, 'status'),
    sn: get(data, 'sn'),
    btaddr: get(data, 'btaddr'),
    wifiaddr: get(data, 'wifiaddr'),
    fhrId: get(data, 'subdevices.0.id'),
    fhrModule: get(data, 'subdevices.0.module'),
    fhrErpno: get(data, 'subdevices.0.erpno'),
    fhrBtaddr: get(data, 'subdevices.0.btaddr'),
    fhrWifiaddr: get(data, 'subdevices.0.wifiaddr'),
    tocoId: get(data, 'subdevices.1.id'),
    tocoModule: get(data, 'subdevices.1.module'),
    tocoErpno: get(data, 'subdevices.1.erpno'),
    tocoBtaddr: get(data, 'subdevices.1.btaddr'),
    tocoWifiaddr: get(data, 'subdevices.1.wifiaddr'),
    othersId: get(data, 'subdevices.2.id'),
    othersModule: get(data, 'subdevices.2.module'),
    othersErpno: get(data, 'subdevices.2.erpno'),
    othersBtaddr: get(data, 'subdevices.2.btaddr'),
    othersWifiaddr: get(data, 'subdevices.2.wifiaddr'),
  };
};

export const toApi = (data: any) => {
  return {
    ...omit(data, [
      'fhrModule',
      'fhrErpno',
      'fhrBtaddr',
      'fhrWifiaddr',
      'tocoModule',
      'tocoErpno',
      'tocoBtaddr',
      'tocoWifiaddr',
      'otherModule',
      'otherErpno',
      'otherBtaddr',
      'otherWifiaddr',
    ]),
    id: get(data, 'id'),
    subdevices: [
      {
        id: get(data, 'fhrId'),
        module: get(data, 'fhrModule'),
        erpno: get(data, 'fhrErpno'),
        btaddr: get(data, 'fhrBtaddr'),
        wifiaddr: get(data, 'fhrWifiaddr'),
      },
      {
        id: get(data, 'tocoId'),
        module: get(data, 'tocoModule'),
        erpno: get(data, 'tocoErpno'),
        btaddr: get(data, 'tocoBtaddr'),
        wifiaddr: get(data, 'tocoWifiaddr'),
      },
      {
        id: get(data, 'othersId'),
        module: get(data, 'othersErpno'),
        erpno: get(data, 'othersErpno'),
        btaddr: get(data, 'othersBtaddr'),
        wifiaddr: get(data, 'othersWifiaddr'),
      },
    ],
  };
};
