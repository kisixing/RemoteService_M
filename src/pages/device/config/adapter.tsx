import { set, get, keys, map } from 'lodash';

export const fromApi = (data: any) => {
  const { subdevices } = data;
  const subDevicesData = {};
  map(subdevices, (subDevice, index) => {
    set(subDevicesData, `subDeviceId${index + 1}`, get(subDevice, 'id'));
    set(subDevicesData, `subDeviceName${index + 1}`, get(subDevice, 'module'));
    set(subDevicesData, `subDeviceErpno${index + 1}`, get(subDevice, 'erpno'));
    set(subDevicesData, `subDeviceBtaddr${index + 1}`, get(subDevice, 'btaddr'));
    set(subDevicesData, `subDeviceWifiaddr${index + 1}`, get(subDevice, 'wifiaddr'));
  });
  return {
    ...data,
    ...subDevicesData,
    type: Number(get(data, 'type')),
  };
};

export const toApi = (data: any, { subDevicePanes }) => {
  return {
    ...data,
    subdevices: map(subDevicePanes, pane => {
      return {
        id: get(data, `subDeviceId${pane.key}`),
        module: get(data, `subDeviceName${pane.key}`),
        erpno: get(data, `subDeviceErpno${pane.key}`),
        btaddr: get(data, `subDeviceBtaddr${pane.key}`),
        wifiaddr: get(data, `subDeviceWifiaddr${pane.key}`),
      };
    }),
  };
};
