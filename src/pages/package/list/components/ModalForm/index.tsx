import React, { PropsWithChildren, useEffect, useState } from 'react';
import { useModalForm } from 'sunflower-antd';
import { Modal, Input, Button, Form, Spin, InputNumber, Radio, DatePicker, Select } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import request from '@/utils/request';
import { IServicepackage } from "@/modelTypes";
// import { Editor } from "@lianmed/components";
interface IProps extends PropsWithChildren<{}> {
    form: WrappedFormUtils
    id?: number
    onsubmit?: () => void
}


export default Form.create()((props: IProps) => {
    const { form, children, id, onsubmit } = props;

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
            const data = { ...form.getFieldsValue(), id }
            await request[id ? 'put' : 'post'](`/servicepackages`, { data })
            onsubmit && onsubmit()
            return 'ok';
        },
        async defaultFormValues() {

            return {
            }
        },
    });
    useEffect(() => {
        modalProps.visible && id && request.get(`/servicepackages/${id}`).then((r: IServicepackage) => {
            form.setFieldsValue({
                name: r.name,
                sortorder: r.sortorder,
                summary: r.summary,
                prodcut: r.prodcuts,
                price: r.price,
                suggestedprice: r.suggestedprice,
                validdate: r.validdate,
                service1amount: r.service1amount,
                service2amount: r.service2amount,
                isdeleted: r.isdeleted,
                topflag: r.topflag,
                products: r.prodcuts
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
                    <Form labelCol={{ xs: 3 }} wrapperCol={{ xs: 20 }}  {...formProps}>

                        <Form.Item label="套餐名称">
                            {
                                form.getFieldDecorator('name', {
                                    rules: [
                                        { required: true }
                                    ]
                                })(
                                    <Input />
                                )
                            }
                        </Form.Item>
                        <Form.Item label="包含产品（可多选）" >
                            {
                                form.getFieldDecorator('products', {
                                    rules: [
                                        { required: true }
                                    ]
                                })(
                                    <Select mode="multiple">
                                        <Select.Option value="0">aa</Select.Option>
                                        <Select.Option value="1">bb</Select.Option>
                                    </Select>
                                )
                            }
                        </Form.Item>
                        <Form.Item label="套餐总概">
                            {
                                form.getFieldDecorator('summary', {
                                    rules: [
                                        { required: true }
                                    ]
                                })(
                                    <Input.TextArea />
                                )
                            }
                        </Form.Item>
                        <Form.Item label="套餐价格（元）">
                            {
                                form.getFieldDecorator('price', {
                                    rules: [
                                        { required: true }
                                    ]
                                })(
                                    <InputNumber />
                                )
                            }
                        </Form.Item>
                        <Form.Item label=" 建议售价（元）">
                            {
                                form.getFieldDecorator('suggestedprice', {
                                    rules: [
                                        { required: true }
                                    ]
                                })(
                                    <InputNumber />
                                )
                            }
                        </Form.Item>
                        <Form.Item label="有效期">
                            {
                                form.getFieldDecorator('validdate', {
                                    rules: [
                                        { required: true }
                                    ]
                                })(
                                    <InputNumber />
                                )
                            }
                        </Form.Item>
                        <Form.Item label=" 胎监判图次数">
                            {
                                form.getFieldDecorator('service1amount', {
                                    rules: [
                                        { required: true }
                                    ]
                                })(
                                    <InputNumber />
                                )
                            }
                        </Form.Item>
                        <Form.Item label="在线咨询次数">
                            {
                                form.getFieldDecorator('service2amount', {
                                    rules: [
                                        { required: true }
                                    ]
                                })(
                                    <InputNumber />
                                )
                            }
                        </Form.Item>
                        <Form.Item label="排序">
                            {
                                form.getFieldDecorator('sortorder', {
                                    rules: [
                                        { required: true }
                                    ]
                                })(
                                    <InputNumber />
                                )
                            }
                        </Form.Item>
                        <Form.Item label="是否可用">
                            {
                                form.getFieldDecorator('isdeleted', {
                                    rules: [
                                        { required: true }
                                    ]
                                })(
                                    <Radio.Group>
                                        <Radio value={1}>是</Radio>
                                        <Radio value={0}>否</Radio>
                                    </ Radio.Group >
                                )
                            }
                        </Form.Item>
                        <Form.Item label="是否置顶">
                            {
                                form.getFieldDecorator('topflag', {
                                    rules: [
                                        { required: true }
                                    ]
                                })(
                                    <Radio.Group>
                                        <Radio value={1}>是</Radio>
                                        <Radio value={0}>否</Radio>
                                    </ Radio.Group >
                                )
                            }
                        </Form.Item>

                    </Form>
                </Spin>
            </Modal>
            {
                React.Children.map(children, _ => React.cloneElement(_ as any, { onClick: show }))
            }
        </>
    )
});