import React, { PropsWithChildren, useEffect, } from 'react';
import { useModalForm } from '@lianmed/hooks';
import { DataSelect } from '@lianmed/components';
import { Modal, Input, Button, Form, Spin, InputNumber, Radio, DatePicker, Select } from 'antd';
import request from '@/utils/request';
import { IDevice } from "@/modelTypes";
// import { Editor } from "@lianmed/components";
interface IProps extends PropsWithChildren<{}> {
    id?: number
    onsubmit?: (data?: any) => void
}


export default (props: IProps) => {
    const { children, id, onsubmit } = props;
    const [form] = Form.useForm()
    const {
        modalProps,
        formProps,
        show,
        formLoading,
        defaultFormValuesLoading,

    } = useModalForm({
        defaultVisible: false,
        autoSubmitClose: true,
        form,
        async submit({ name }) {
            const formData = form.getFieldsValue() as { products: string[] }
            const data = { ...formData, products: formData.products.map(id => ({ id })), id }
            await request[id ? 'put' : 'post'](`/devices`, { data })
            onsubmit && onsubmit()
            return 'ok';
        },

    });
    useEffect(() => {
        modalProps.visible && id && request.get(`/devices/${id}`).then((r: IDevice) => {
            form.setFieldsValue({
                devicename: r.devicename,
                type: r.type,
                manufacturer: r.manufacturer,
                model: r.model,
                erpno: r.erpno,

                sn: r.sn,
                btaddr: r.btaddr,
                wifiaddr: r.wifiaddr,
                subdevice: r.subdevice,

            })
        })
    }, [id, modalProps.visible])
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
                    <Form form={form} labelCol={{ xs: 3 }} wrapperCol={{ xs: 20 }}  {...formProps} onFinish={v => console.log('v', v)}>

                        <Form.Item label="套餐名称" name="devicename" required>

                            <Input />

                        </Form.Item>

                        <Form.Item label="类型" name="type" required >

                            <DataSelect url="/products" mode="multiple" valueKey="id" labelKey="name" />

                        </Form.Item>
                        <Form.Item label="厂家" name="manufacturer" required>

                            <Input />

                        </Form.Item>
                        <Form.Item label="型号" name="model" required>

                            <InputNumber />

                        </Form.Item>



                        <Form.Item label=" 生产编号" name="erpno" required>

                            <InputNumber />
                        </Form.Item>
                        <Form.Item label="设备序号" name="sn" required>
                            <DataSelect dataSource={[
                                { value: 30, label: '30天' },
                                { value: 60, label: '60天' },
                                { value: 90, label: '90天' },
                                { value: 280, label: '一个孕周' },
                            ]} />
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
            {
                React.Children.map(children, _ => React.cloneElement(_ as any, { onClick: show }))
            }
        </>
    )
}