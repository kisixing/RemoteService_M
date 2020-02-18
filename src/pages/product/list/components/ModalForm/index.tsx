import React, { PropsWithChildren, useEffect, useState } from 'react';
import { useModalForm } from 'sunflower-antd';
import { Modal, Input, Button, Form, Spin, InputNumber } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import request from '@/utils/request';
import { IProduct } from "@/modelTypes";
import { Editor } from "@lianmed/components";
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
            await request[id ? 'put' : 'post'](`/products`, { data })
            onsubmit && onsubmit()
            return 'ok';
        },
        async defaultFormValues() {

            return {
            }
        },
    });
    useEffect(() => {
        modalProps.visible && id && request.get(`/products/${id}`).then((r: IProduct) => {
            form.setFieldsValue({
                name: r.name,
                sortorder: r.sortorder,
                introduction: r.introduction,
                specification: r.specification,
                note: r.note

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

                        <Form.Item label="产品名称">
                            {
                                form.getFieldDecorator('name', {
                                    rules: [
                                        { required: true }
                                    ]
                                })(
                                    <Input placeholder="name" />
                                )
                            }
                        </Form.Item>
                        <Form.Item label="产品介绍" >
                            {
                                form.getFieldDecorator('introduction', {
                                    rules: [
                                        { required: true }
                                    ]
                                })(
                                    <Editor bordered style={{ height: '300px',overflowY:'hidden' }} />
                                )
                            }
                        </Form.Item>
                        <Form.Item label="产品规格" >
                            {
                                form.getFieldDecorator('specification', {
                                    rules: [
                                        { required: true }
                                    ]
                                })(
                                    <Editor bordered style={{ height: '300px',overflowY:'hidden' }}  />
                                )
                            }
                        </Form.Item>
                        <Form.Item label="使用或注意事项">
                            {
                                form.getFieldDecorator('note', {
                                    rules: [
                                        { required: true }
                                    ]
                                })(
                                    <Editor bordered style={{ height: '300px',overflowY:'hidden' }} />
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

                    </Form>
                </Spin>
            </Modal>
            {
                React.Children.map(children, _ => React.cloneElement(_, { onClick: show }))
            }
        </>
    )
});