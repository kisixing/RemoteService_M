export const modalFormDescriptions = {
  id: {
    key: 'id',
    label: '序号',
    inputType: 'id',
    inputProps: {
      disabled: true,
    },
  },
  screen: {
    key: 'screen',
    label: '扫描输入',
    inputType: 'input',
    inputProps: {
      placeholder: '请使用扫码枪扫描输入',
    },
  },
  devicename: {
    key: 'devicename',
    label: '设备名称',
    rules: [{ required: true, message: '设备名称是必填项' }],
    inputType: 'input',
    inputProps: {
      placeholder: '请输入设备名称',
    },
  },
  type: {
    key: 'type',
    label: '设备类型',
    rules: [{ required: true, message: '设备类型是必选项' }],
    inputType: 'input',
    inputProps: {
      placeholder: '请选择设备类型',
    },
  },
  status: {
    key: 'status',
    label: '设备状态',
    rules: [{ required: true, message: '设备状态是必选项' }],
    inputType: 'device_status',
    inputProps: {
      placeholder: '请选择设备状态',
    },
  },
  manufacturer: {
    key: 'manufacturer',
    label: '厂家',
    rules: [{ required: true, message: '厂家是必填项' }],
    inputType: 'input',
    inputProps: {
      placeholder: '请输入厂家',
    },
  },
  model: {
    key: 'model',
    label: '型号',
    rules: [{ required: true, message: '型号是必填项' }],
    inputType: 'input',
    inputProps: {
      placeholder: '请输入型号',
    },
  },
  erpno: {
    key: 'erpno',
    label: 'ERP编号',
    rules: [{ required: true, message: 'ERP编号是必填项' }],
    inputType: 'input',
    inputProps: {
      placeholder: '请输入ERP编号',
    },
  },
  sn: {
    key: 'sn',
    label: '设备序号',
    rules: [{ required: true, message: '设备序号是必填项' }],
    inputType: 'input',
    inputProps: {
      placeholder: '请输入设备序号',
    },
  },
  btaddr: {
    key: 'btaddr',
    label: '蓝牙地址',
    inputType: 'input',
    inputProps: {
      placeholder: '请输入蓝牙地址',
    },
  },
  wifiaddr: {
    key: 'wifiaddr',
    label: 'wifi地址',
    inputType: 'input',
    inputProps: {
      placeholder: '请输入wifi地址',
    },
  },
};

export const subDeviceFormDescriptions = {
  subDeviceScreen: {
    key: 'subDeviceScreen',
    label: '扫描输入',
    inputProps: {
      placeholder: '请使用扫码枪扫描输入',
    },
  },
  subDeviceId: {
    key: 'subDeviceId',
    label: 'ID',
    inputProps: {
      disabled: true
    },
  },
  subDeviceName: {
    key: 'subDeviceName',
    label: '部件名称',
    inputProps: {
      placeholder: '请输入部件名称',
    },
  },
  subDeviceErpno: {
    key: 'subDeviceErpno',
    label: 'ERP编号',
    inputProps: {
      placeholder: '请输入ERP编号',
    },
  },
  subDeviceBtaddr: {
    key: 'subDeviceBtaddr',
    label: '蓝牙地址',
    inputProps: {
      placeholder: '请输入蓝牙地址',
    },
  },
  subDeviceWifiaddr: {
    key: 'subDeviceWifiaddr',
    label: 'WiFi地址',
    inputProps: {
      placeholder: '请输入wifi地址',
    },
  },
};

export const queryFormDescriptions = {
  devicename: {
    key: 'devicename',
    label: '设备名称',
  },
  type: {
    key: 'type',
    label: '设备类型',
  },
  status: {
    key: 'status',
    label: '设备状态',
  },
};

export default {
  modalFormDescriptions,
  queryFormDescriptions,
};
