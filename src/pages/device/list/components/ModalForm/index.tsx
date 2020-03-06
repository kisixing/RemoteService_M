import React, { PropsWithChildren, useEffect } from 'react';
import { useModalForm } from '@lianmed/hooks';
import { DataSelect } from '@lianmed/components';
import { Modal, Input, Form, Spin, InputNumber } from 'antd';
import request from '@/utils/request';
import { IDevice } from '@/modelTypes';
import DeviceStatusSelect from '../DeviceStatusSelect';

// import { Editor } from "@lianmed/components";
interface IProps extends PropsWithChildren<{}> {
  id?: number;
  onsubmit?: (data?: any) => void;
}

export default (props: IProps) => {
  const { children, id, onsubmit } = props;
  const [form] = Form.useForm();
  const { modalProps, formProps, show, formLoading, defaultFormValuesLoading } = useModalForm({
    defaultVisible: false,
    autoSubmitClose: true,
    form,
    async submit(d: any) {
      console.log('name', d);
      const formData = form.getFieldsValue();
      const data = { ...formData, id };
      await request[id ? 'put' : 'post'](`/devices`, { data });
      onsubmit && onsubmit();
      return 'ok';
    },
  });
  
  useEffect(() => {
    (async () => {
      const result = modalProps.visible && id && (await request.get(`/devices/${id}`));
      form.setFieldsValue({
        devicename: result.devicename,
        type: +result.type,
        manufacturer: result.manufacturer,
        model: result.model,
        erpno: result.erpno,
        status: result.status,
        sn: result.sn,
        btaddr: result.btaddr,
        wifiaddr: result.wifiaddr,
        subdevice: result.subdevice,
      });
    })();
  }, [id, modalProps.visible]);

  return (
    <>
      <Modal
        destroyOnClose={true}
        {...modalProps}
        title={id ? '编辑' : '新增'}
        okText="submit"
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
              <InputNumber />
            </Form.Item>
            <Form.Item label="绑定记录" name="service2amount" required>
              <InputNumber />
            </Form.Item>
          </Form>
        </Spin>
      </Modal>
      {React.Children.map(children, _ => React.cloneElement(_ as any, { onClick: show }))}
    </>
  );
};
