import React, { PropsWithChildren, useEffect, useState } from 'react';
import { useModalForm } from '@lianmed/hooks';
import { DataSelect } from '@lianmed/components';
import { Modal, Input, Button, Form, Spin, InputNumber, Radio, DatePicker, Select } from 'antd';
import request from '@/utils/request';
import { IServicepackage, IProduct } from "@/modelTypes";
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
        initialValues,
    } = useModalForm({
        defaultVisible: false,
        autoSubmitClose: true,
        form,
        async submit({ name }) {
            const formData = form.getFieldsValue() as { products: string[] }
            const data = { ...formData, products: formData.products.map(id => ({ id })), id }
            await request[id ? 'put' : 'post'](`/servicepackages`, { data })
            onsubmit && onsubmit()
            return 'ok';
        },

    });
    useEffect(() => {
        modalProps.visible && id && request.get(`/servicepackages/${id}`).then((r: IServicepackage) => {
            form.setFieldsValue({
                name: r.name,
                sortorder: r.sortorder,
                summary: r.summary,
                price: r.price,
                suggestedprice: r.suggestedprice,
                validdate: r.validdate,
                service1amount: r.service1amount,
                service2amount: r.service2amount,
                isdeleted: r.isdeleted,
                topflag: r.topflag,
                products: r.products ? r.products.map(r => r.id) : []
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
                    <Form labelCol={{ xs: 3 }} wrapperCol={{ xs: 20 }}  {...formProps} onFinish={v => console.log('v', v)}>

                        <Form.Item label="套餐名称" name="name" required>

                            <Input />

                        </Form.Item>

                        <Form.Item label="包含产品（多选）" name="products" required >

                            <DataSelect url="/products" mode="multiple" valueKey="id" labelKey="name" />

                        </Form.Item>
                        <Form.Item label="套餐总概" name="summary" required>

                            <Input.TextArea />

                        </Form.Item>
                        <Form.Item label="套餐价格（元）" name="price" required>

                            <InputNumber />

                        </Form.Item>
                        <Form.Item label=" 建议售价（元）" name="suggestedprice" required>

                            <InputNumber />
                        </Form.Item>
                        <Form.Item label="有效期" name="validdate" required>
                            <DataSelect dataSource={[
                                { id: 30, name: '30天' },
                                { id: 60, name: '60天' },
                                { id: 90, name: '90天' },
                                { id: 280, name: '一个孕周' },
                            ]} valueKey="id" labelKey="name" />
                        </Form.Item>
                        <Form.Item label="胎监判图次数" name="service1amount" required>

                            <InputNumber />
                        </Form.Item>
                        <Form.Item label="在线咨询次数" name="service2amount" required>

                            <InputNumber />

                        </Form.Item>
                        <Form.Item label="排序" name="sortorder" required>

                            <InputNumber />

                        </Form.Item>
                        <Form.Item label="是否可用" name="isdeleted" required>

                            <Radio.Group>
                                <Radio value={1}>是</Radio>
                                <Radio value={0}>否</Radio>
                            </ Radio.Group >

                        </Form.Item>
                        <Form.Item label="是否置顶" name="topflag" required>

                            <Radio.Group>
                                <Radio value={1}>是</Radio>
                                <Radio value={0}>否</Radio>
                            </ Radio.Group >

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