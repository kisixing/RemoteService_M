export const modalFormDescriptions = {
  id: {
    key: 'id',
    label: '序号',
    inputType: 'id',
    inputProps: {
      disabled: true,
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
    inputType: 'product',
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
    rules: [{ required: true, message: '型号是必选项' }],
    inputType: 'input',
    inputProps: {
      placeholder: '请选择型号',
    },
  },
  erpno: {
    key: 'erpno',
    label: '生产编号',
    rules: [{ required: true, message: '生产编号是必填项' }],
    inputType: 'input',
    inputProps: {
      placeholder: '请输入生产编号',
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
    rules: [{ required: true, message: '蓝牙地址是必填项' }],
    inputType: 'input',
    inputProps: {
      placeholder: '请输入蓝牙地址',
    },
  },
  wifiaddr: {
    key: 'wifiaddr',
    label: 'wifi地址',
    rules: [{ required: true, message: 'wifi地址是必填项' }],
    inputType: 'input',
    inputProps: {
      placeholder: '请输入wifi地址',
    },
  },
  fhrModule: {
    key: 'fhrModule',
    label: '部件名称',
    inputType: 'input',
    isChild: true,
    inputProps: {
      placeholder: '请输入部件名称',
    },
  },
  fhrId: {
    key: 'fhrId',
    label: 'ID',
    inputType: 'input',
    isChild: true,
    inputProps: {
      disabled: true,
    },
  },
  tocoId: {
    key: 'tocoId',
    label: 'ID',
    inputType: 'input',
    isChild: true,
    inputProps: {
      disabled: true,
    },
  },
  othersId: {
    key: 'othersId',
    label: 'ID',
    inputType: 'input',
    isChild: true,
    inputProps: {
      disabled: true,
    },
  },
  fhrErpno: {
    key: 'fhrErpno',
    label: '生产编号',
    inputType: 'input',
    isChild: true,
    inputProps: {
      placeholder: '请输入生产编号',
    },
  },
  fhrBtaddr: {
    key: 'fhrBtaddr',
    label: '蓝牙地址',
    inputType: 'input',
    isChild: true,
    inputProps: {
      placeholder: '请输入蓝牙地址',
    },
  },
  fhrWifiaddr: {
    key: 'fhrWifiaddr',
    label: 'WiFi地址',
    inputType: 'input',
    isChild: true,
    inputProps: {
      placeholder: '请输入WiFi地址',
    },
  },
  tocoModule: {
    key: 'tocoModule',
    label: '部件名称',
    inputType: 'input',
    isChild: true,
    inputProps: {
      placeholder: '请输入部件名称',
    },
  },
  tocoErpno: {
    key: 'tocoErpno',
    label: '生产编号',
    inputType: 'input',
    isChild: true,
    inputProps: {
      placeholder: '请输入生产编号',
    },
  },
  tocoBtaddr: {
    key: 'tocoBtaddr',
    label: '蓝牙地址',
    inputType: 'input',
    isChild: true,
    inputProps: {
      placeholder: '请输入蓝牙地址',
    },
  },
  tocoWifiaddr: {
    key: 'tocoWifiaddr',
    label: 'WiFi地址',
    inputType: 'input',
    isChild: true,
    inputProps: {
      placeholder: '请输入WiFi地址',
    },
  },
  othersModule: {
    key: 'othersModule',
    label: '部件名称',
    inputType: 'input',
    isChild: true,
    inputProps: {
      placeholder: '请输入部件名称',
    },
  },
  othersErpno: {
    key: 'othersErpno',
    label: '生产编号',
    inputType: 'input',
    isChild: true,
    inputProps: {
      placeholder: '请输入生产编号',
    },
  },
  othersBtaddr: {
    key: 'othersBtaddr',
    label: '蓝牙地址',
    inputType: 'input',
    isChild: true,
    inputProps: {
      placeholder: '请输入蓝牙地址',
    },
  },
  othersWifiaddr: {
    key: 'othersWifiaddr',
    label: 'WiFi地址',
    inputType: 'input',
    isChild: true,
    inputProps: {
      placeholder: '请输入WiFi地址',
    },
  },
  subdevices: {
    key: 'btaddr',
    label: '部件信息',
    childs: [
      {
        tabTitle: 'FHR探头',
        key: '1',
        formDescription: {
          fhrId: {
            key: 'fhrId',
            label: 'ID',
            inputType: 'id',
            isChild: true,
            inputProps: {
              disabled: true,
            },
          },
          fhrModule: {
            key: 'fhrModule',
            label: '部件名称',
            inputType: 'input',
            inputProps: {
              placeholder: '请输入部件名称',
            },
          },
          fhrErpno: {
            key: 'fhrErpno',
            label: '生产编号',
            inputType: 'input',
            inputProps: {
              placeholder: '请输入生产编号',
            },
          },
          fhrBtaddr: {
            key: 'fhrBtaddr',
            label: '蓝牙地址',
            inputType: 'input',
            inputProps: {
              placeholder: '请输入蓝牙地址',
            },
          },
          fhrWifiaddr: {
            key: 'fhrWifiaddr',
            label: 'WiFi地址',
            inputType: 'input',
            inputProps: {
              placeholder: '请输入WiFi地址',
            },
          },
        },
      },
      {
        tabTitle: 'TOCO探头',
        key: '2',
        formDescription: {
          tocoId: {
            key: 'tocoId',
            label: 'ID',
            inputType: 'id',
            isChild: true,
            inputProps: {
              disabled: true,
            },
          },
          tocoModule: {
            key: 'tocoModule',
            label: '部件名称',
            inputType: 'input',
            inputProps: {
              placeholder: '请输入部件名称',
            },
          },
          tocoErpno: {
            key: 'tocoErpno',
            label: '生产编号',
            inputType: 'input',
            inputProps: {
              placeholder: '请输入生产编号',
            },
          },
          tocoBtaddr: {
            key: 'tocoBtaddr',
            label: '蓝牙地址',
            inputType: 'input',
            inputProps: {
              placeholder: '请输入蓝牙地址',
            },
          },
          tocoWifiaddr: {
            key: 'tocoWifiaddr',
            label: 'WiFi地址',
            inputType: 'input',
            inputProps: {
              placeholder: '请输入WiFi地址',
            },
          },
        },
      },
      {
        tabTitle: '其它部件',
        key: '3',
        formDescription: {
          othersId: {
            key: 'othersId',
            label: 'ID',
            inputType: 'id',
            isChild: true,
            inputProps: {
              disabled: true,
            },
          },
          othersModule: {
            key: 'othersModule',
            label: '部件名称',
            inputType: 'input',
            inputProps: {
              placeholder: '请输入部件名称',
            },
          },
          othersErpno: {
            key: 'othersErpno',
            label: '生产编号',
            inputType: 'input',
            inputProps: {
              placeholder: '请输入生产编号',
            },
          },
          othersBtaddr: {
            key: 'othersBtaddr',
            label: '蓝牙地址',
            inputType: 'input',
            inputProps: {
              placeholder: '请输入蓝牙地址',
            },
          },
          othersWifiaddr: {
            key: 'othersWifiaddr',
            label: 'WiFi地址',
            inputType: 'input',
            inputProps: {
              placeholder: '请输入WiFi地址',
            },
          },
        },
      },
    ],
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
