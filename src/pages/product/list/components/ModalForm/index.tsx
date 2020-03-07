import React, { PropsWithChildren, useEffect, useState } from 'react';
import { useModalForm } from '@lianmed/hooks';
import { Modal, Input, Button, Form, Spin, InputNumber } from 'antd';
import request from '@/utils/request';
import { IProduct } from "@/modelTypes";
import { Editor } from "@lianmed/components";
interface IProps extends PropsWithChildren<{}> {
    id?: number
    onsubmit?: (data?:any) => void
}


export default ((props: IProps) => {
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
                width={1200}
            >
                <Spin spinning={formLoading || defaultFormValuesLoading}>
                    <Form labelCol={{ xs: 3 }} wrapperCol={{ xs: 20 }}  {...formProps}>

                        <Form.Item label="产品名称" name="name" required>
                            <Input placeholder="name" />
                        </Form.Item>
                        <Form.Item label="产品图片" name="picture" required>
                            <Input placeholder="name" />
                        </Form.Item>
                        <Form.Item label="产品介绍" name="introduction" required>

                            <Editor bordered style={{ height: '300px', overflowY: 'hidden' }} />

                        </Form.Item>
                        <Form.Item label="产品规格" name="specification" required>

                            <Editor bordered style={{ height: '300px', overflowY: 'hidden' }} />

                        </Form.Item>
                        <Form.Item label="使用或注意事项" name="note" required>

                            <Editor bordered style={{ height: '300px', overflowY: 'hidden' }} />

                        </Form.Item>
                        <Form.Item label="排序" name="sortorder" required>
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
});