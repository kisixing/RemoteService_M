import React, { PropsWithChildren, useEffect } from 'react';
import { useModalForm } from '@lianmed/hooks';
import { DataSelect } from '@lianmed/components';
import { Modal, Input, Form, Spin, InputNumber, Tabs, Table } from 'antd';
import { get, omit } from 'lodash';
import request from '@/utils/request';
import { IDevice } from '@/modelTypes';
import DeviceStatusSelect from '../DeviceStatusSelect';

// import { Editor } from "@lianmed/components";
interface IProps extends PropsWithChildren<{}> {
  id?: number;
  editable?: boolean;
  callback?: (data?: any) => void;
}

export default (props: IProps) => {
  const { children, id, callback } = props;
  const [form] = Form.useForm();
  const subDevicesColumns = [
    {
      title: '部件名称',
      dataIndex: 'module',
      key: 'module',
    },
    {
      title: '生产编号',
      dataIndex: 'erpno',
      key: 'erpno',
    },
    {
      title: '蓝牙地址',
      dataIndex: 'btaddr',
      key: 'btaddr',
    },
    {
      title: 'WiFi地址',
      dataIndex: 'wifiaddr',
      key: 'wifiaddr',
    },
  ];
  const { modalProps, formProps, show, formLoading, defaultFormValuesLoading } = useModalForm({
    defaultVisible: false,
    autoSubmitClose: true,
    form,
    async submit(values: any) {
      console.log('values', values);
      const data = {
        ...omit(values, [
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
        id,
        subdevices: [
          {
            module: get(values, 'fhrModule'),
            erpno: get(values, 'fhrErpno'),
            btaddr: get(values, 'fhrBtaddr'),
            wifiaddr: get(values, 'fhrWifiaddr'),
          },
          {
            module: get(values, 'tocoModule'),
            erpno: get(values, 'tocoErpno'),
            btaddr: get(values, 'tocoBtaddr'),
            wifiaddr: get(values, 'tocoWifiaddr'),
          },
          {
            module: get(values, 'otherModule'),
            erpno: get(values, 'otherErpno'),
            btaddr: get(values, 'otherBtaddr'),
            wifiaddr: get(values, 'otherWifiaddr'),
          },
        ],
      };
      await request[id ? 'put' : 'post'](`/devices`, { data });
      callback && callback();
    },
  });

  useEffect(() => {
    (async () => {
      const result = modalProps.visible && id && (await request.get(`/devices/${id}`));
      id && form.setFieldsValue({
        devicename: get(result, 'devicename'),
        type: Number(get(result, 'type')),
        manufacturer: get(result, 'manufacturer'),
        model: get(result, 'model'),
        erpno: get(result, 'erpno'),
        status: get(result, 'status'),
        sn: get(result, 'sn'),
        btaddr: get(result, 'btaddr'),
        wifiaddr: get(result, 'wifiaddr'),
        fhrModule: get(result, 'subdevices.0.module'),
        fhrErpno: get(result, 'subdevices.0.erpno'),
        fhrBtaddr: get(result, 'subdevices.0.btaddr'),
        fhrWifiaddr: get(result, 'subdevices.0.wifiaddr'),
        tocoModule: get(result, 'subdevices.1.module'),
        tocoErpno: get(result, 'subdevices.1.erpno'),
        tocoBtaddr: get(result, 'subdevices.1.btaddr'),
        tocoWifiaddr: get(result, 'subdevices.1.wifiaddr'),
        othersModule: get(result, 'subdevices.2.module'),
        othersErpno: get(result, 'subdevices.2.erpno'),
        othersBtaddr: get(result, 'subdevices.2.btaddr'),
        othersWifiaddr: get(result, 'subdevices.2.wifiaddr'),
      });
    })();
  }, [id, modalProps.visible]);

  const renderSubDevice = () => {
    return (
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="FHR探头" key="1" forceRender>
          <Form.Item label="部件名称" name="fhrModule">
            <Input />
          </Form.Item>
          <Form.Item label="生产编号" name="fhrErpno">
            <Input />
          </Form.Item>
          <Form.Item label="蓝牙地址" name="fhrBtaddr">
            <Input />
          </Form.Item>
          <Form.Item label="WiFi地址" name="fhrWifiaddr">
            <Input />
          </Form.Item>
        </Tabs.TabPane>
        <Tabs.TabPane tab="TOCO探头" key="2" forceRender>
          <Form.Item label="部件名称" name="tocoModule">
            <Input />
          </Form.Item>
          <Form.Item label="生产编号" name="tocoErpno">
            <Input />
          </Form.Item>
          <Form.Item label="蓝牙地址" name="tocoBtaddr">
            <Input />
          </Form.Item>
          <Form.Item label="WiFi地址" name="tocoWifiaddr">
            <Input />
          </Form.Item>
        </Tabs.TabPane>
        <Tabs.TabPane tab="其它部件" key="3" forceRender>
          <Form.Item label="部件名称" name="otherModule">
            <Input />
          </Form.Item>
          <Form.Item label="生产编号" name="otherErpno">
            <Input />
          </Form.Item>
          <Form.Item label="蓝牙地址" name="otherBtaddr">
            <Input />
          </Form.Item>
          <Form.Item label="WiFi地址" name="otherWifiaddr">
            <Input />
          </Form.Item>
        </Tabs.TabPane>
      </Tabs>
    );
  };
  return (
    <>
      <Modal
        destroyOnClose={true}
        {...modalProps}
        title={id ? '编辑' : '新增'}
        okText="提交"
        width={1200}
      >
        <Spin spinning={formLoading || defaultFormValuesLoading}>
          <Form
            form={form}
            labelCol={{ xs: 3 }}
            wrapperCol={{ xs: 20 }}
            {...formProps}
            onFinish={v => console.log('v', v)}
          >
            <Form.Item label="套餐名称" name="devicename" required>
              <Input />
            </Form.Item>

            <Form.Item label="类型" name="type" required>
              <DataSelect
                url="/products"
                valueKey="id"
                labelKey="name"
                placeholder="请选择设备类型"
              />
            </Form.Item>
            <Form.Item label="状态" name="status" required>
              <DeviceStatusSelect />
            </Form.Item>
            <Form.Item label="厂家" name="manufacturer" required>
              <Input />
            </Form.Item>
            <Form.Item label="型号" name="model" required>
              <Input />
            </Form.Item>

            <Form.Item label=" 生产编号" name="erpno" required>
              <Input />
            </Form.Item>
            <Form.Item label="设备序号" name="sn" required>
              <Input />
            </Form.Item>
            <Form.Item label="蓝牙地址" name="btaddr" required>
              <Input />
            </Form.Item>
            <Form.Item label="wifi地址" name="wifiaddr" required>
              <Input />
            </Form.Item>
            <Form.Item label="部件信息" name="subdevice" required>
              {renderSubDevice()}
            </Form.Item>
            {/* <Form.Item label="绑定记录" name="service2amount" required>
              <InputNumber />
            </Form.Item> */}
          </Form>
        </Spin>
      </Modal>
      {React.Children.map(children, _ => React.cloneElement(_ as any, { onClick: show }))}
    </>
  );
};
