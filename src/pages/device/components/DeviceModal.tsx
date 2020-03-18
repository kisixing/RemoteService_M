import React from 'react';
import {
  modalFormDescriptions as formDescriptions,
  subDeviceFormDescriptions as deviceFormDescriptions,
} from '../config/form';
import { fromApi, toApi } from '../config/adapter';
import { startsWith, last, split, debounce, map, set, keys, get } from 'lodash';
import { DynamicForm } from '@lianmed/components';
import request from '@/utils/request';
import { message, Modal, Form, Input, Tabs, notification } from 'antd';
import DeviceStatusSelect from '@/components/selects/DeviceStatusSelect';

const formItemLayout = {
  labelCol: {
    span: 3,
  },
  wrapperCol: {
    span: 20,
  },
};

export default class BaseModalForm extends DynamicForm {
  static defaultProps = {
    url: 'devices',
    title: '设备',
    modalProps: {
      width: 1200,
    },
    fixedFormParams: {},
  };

  constructor(props: any) {
    super(props);
    this.state = {
      data: {},
      subDeviceActiveKey: '1',
      subDeviceFormDescriptions: {},
      subDevicePanes: [
        {
          key: '1',
          title: '部件',
          closable: false,
        },
      ],
    };
  }

  renderEditItem = this.generateRenderEditItem(formDescriptions, {
    formItemLayout,
  });

  componentDidMount() {
    const { id, paramryKey, url } = this.props;
    this.initSubDeviceFormDescriptions();
    setTimeout(async () => {
      this.form = this.formRef.current;
      if (id) {
        const values = fromApi(await request.get(`/${url}/${paramryKey || id}`));
        const initSubDevicePanes = map(get(values, 'subdevices'), (subDevice, index) => {
          return {
            key: `${Number(index) + 1}`,
            title: '部件',
            closable: Number(index) !== 0,
          };
        });
        this.setState({
          subDevicePanes: initSubDevicePanes,
        });
        this.initSubDeviceFormDescriptions();
        this.form.setFieldsValue(values);
        this.setState({ data: values, subDevicePanes: initSubDevicePanes });
      }
    }, 100);
  }

  initSubDeviceFormDescriptions = () => {
    const { subDevicePanes } = this.state;
    const newSubDeviceFormDescriptions = {};
    const deviceFormDescriptionsKeys = keys(deviceFormDescriptions);
    map(subDevicePanes, (pane, times) => {
      map(deviceFormDescriptionsKeys, key => {
        set(newSubDeviceFormDescriptions, `${key}${times + 1}`, {
          key: `${key}${times + 1}`,
          label: get(deviceFormDescriptions, `${key}.label`),
        });
      });
    });

    this.setState({
      subDeviceFormDescriptions: newSubDeviceFormDescriptions,
    });
  };

  handleSubmit = async () => {
    const { data, subDevicePanes } = this.state;
    const { id, onCancel, onSearch, title, url, fixedFormParams } = this.props;
    let tip = '';
    let method = '';

    await this.form.validateFields();
    // console.log(toApi(this.form.getFieldsValue(), { subDevicePanes }));
    // return;
    const values = toApi({ ...data, ...this.form.getFieldsValue(), id }, { subDevicePanes });
    if (id) {
      tip = `修改${title}成功`;
      method = 'put';
    } else {
      tip = `添加${title}成功`;
      method = 'post';
    }
    await request[method](`/${url}`, {
      data: {
        ...values,
        ...fixedFormParams,
      },
    });
    message.success(tip);
    onCancel();
    onSearch();
  };

  handleDeviceScreen = e => {
    const value = get(e, 'target.value') || '';

    debounce(() => {
      // 如果满足莲印设备规则
      if (value.length === 34 && split(value, '-').length === 4) {
        const screenCodeArr = split(value, '-') || [];
        let btaddr = '';
        map(last(screenCodeArr), (code, index) => {
          btaddr += String(code);
          if (index !== 0 && index % 2 !== 0 && index !== last(screenCodeArr).length - 1) {
            btaddr += ':';
          }
        });
        this.form.setFieldsValue({
          erpno: value,
          type: 'LMF0基座+单胎',
          manufacturer: '莲印',
          model: 'F0',
          sn: value,
          status: 0,
          btaddr,
        });
      } else if (value.length === 12 && startsWith(value, 'Q')) {
        this.form.setFieldsValue({
          erpno: value,
          type: 'XICCO-aVS02',
          manufacturer: '希科',
          model: 'aVS02',
          sn: value,
          status: 0,
        });
      }
    }, 500)();
  };

  handleSubDeviceScreen = key => e => {
    const value = get(e, 'target.value') || '';

    debounce(() => {
      // 如果满足莲印设备规则
      if (value.length === 34 && split(value, '-').length === 4) {
        const screenCodeArr = split(value, '-') || [];
        let btaddr = '';
        map(last(screenCodeArr), (code, index) => {
          btaddr += String(code);
          if (index !== 0 && index % 2 !== 0 && index !== last(screenCodeArr).length - 1) {
            btaddr += ':';
          }
        });
        this.form.setFieldsValue({
          [`subDeviceName${key}`]: key === '1' ? 'base' : '',
          [`subDeviceErpno${key}`]: value,
          [`subDeviceBtaddr${key}`]: btaddr,
        });
      }
    }, 500)();
  };

  handleTabChange = subDeviceActiveKey => {
    this.setState({ subDeviceActiveKey });
  };

  handleTabEdit = (targetKey, action) => {
    switch (action) {
      case 'add':
        this.handleAddTab();
        break;
      case 'remove':
        this.handleRemoveTab(targetKey);
        break;
      default:
        break;
    }
  };

  handleAddTab = () => {
    const { subDevicePanes } = this.state;
    if (subDevicePanes.length > 9) {
      notification.error({ message: '最多添加十个部件' });
      return;
    }
    subDevicePanes.push({
      key: `${subDevicePanes.length + 1}`,
      title: '部件',
      closable: true,
    });
    this.setState({
      subDevicePanes,
    });

    this.initSubDeviceFormDescriptions();
  };

  handleRemoveTab = targetKey => {
    let { subDeviceActiveKey, subDeviceFormDescriptions } = this.state;
    const { subDevicePanes } = this.state;
    let lastIndex = 0;
    subDevicePanes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const newPanes = subDevicePanes.filter(pane => pane.key !== targetKey);
    if (newPanes.length && subDeviceActiveKey === targetKey) {
      if (lastIndex >= 0) {
        subDeviceActiveKey = newPanes[lastIndex].key;
      } else {
        subDeviceActiveKey = newPanes[0].key;
      }
    }
    this.setState({ subDevicePanes: newPanes, subDeviceActiveKey });
  };

  renderDeviceForm = pane => {
    const { subDeviceFormDescriptions } = this.state;
    const { id } = this.props;

    const renderEditItem = this.generateRenderEditItem(subDeviceFormDescriptions, {
      formItemLayout: {
        labelCol: {
          span: 2,
        },
        wrapperCol: {
          span: 8,
        },
      },
    });
    return (
      <span>
        {map(deviceFormDescriptions, formDescription => {
          if (!id && formDescription.key === 'subDeviceId') {
            return;
          }
          if (formDescription.key === 'subDeviceScreen') {
            return renderEditItem(
              `${formDescription.key}${pane.key}`,
              <Input
                {...get(formDescription, 'inputProps')}
                onChange={this.handleSubDeviceScreen(pane.key)}
              />,
            );
          }
          return renderEditItem(
            `${formDescription.key}${pane.key}`,
            <Input {...get(formDescription, 'inputProps')} />,
          );
        })}
      </span>
    );
  };

  renderSubDevice = () => {
    const { subDeviceActiveKey, subDevicePanes } = this.state;

    return (
      <Form.Item key="subDevice" label="部件信息">
        <Tabs
          onChange={this.handleTabChange}
          activeKey={subDeviceActiveKey}
          type="editable-card"
          onEdit={this.handleTabEdit}
        >
          {subDevicePanes.map(pane => (
            <Tabs.TabPane tab={`${pane.title}${pane.key}`} key={pane.key} closable={pane.closable}>
              {this.renderDeviceForm(pane)}
            </Tabs.TabPane>
          ))}
        </Tabs>
      </Form.Item>
    );
  };

  renderEditContent = () => {
    return (
      <span>
        {this.renderEditItem(
          'screen',
          <Input placeholder="请使用扫码枪扫描输入" onChange={this.handleDeviceScreen} />,
        )}
        {this.renderEditItem('devicename', <Input placeholder="请输入设备名称" />)}
        {this.renderEditItem('type', <Input placeholder="请选择设备类型" />)}
        {this.renderEditItem('status', <DeviceStatusSelect placeholder="请选择设备状态" />)}
        {this.renderEditItem('manufacturer', <Input placeholder="请输入厂家" />)}
        {this.renderEditItem('model', <Input placeholder="请输入型号" />)}
        {this.renderEditItem('erpno', <Input placeholder="请输入ERP编号" />)}
        {this.renderEditItem('sn', <Input placeholder="请输入设备序号" />)}
        {this.renderEditItem('btaddr', <Input placeholder="请输入蓝牙地址" />)}
        {this.renderEditItem('wifiaddr', <Input placeholder="请输入wifi地址" />)}
        {this.renderSubDevice()}
      </span>
    );
  };

  render() {
    const { visible, onCancel, id, modalProps, title } = this.props;
    return (
      <Modal
        {...modalProps}
        visible={visible}
        onCancel={onCancel}
        onOk={this.handleSubmit}
        title={id ? `修改${title}` : `添加${title}`}
      >
        <Form ref={this.formRef} {...formItemLayout}>
          {this.renderEditContent()}
        </Form>
      </Modal>
    );
  }
}
