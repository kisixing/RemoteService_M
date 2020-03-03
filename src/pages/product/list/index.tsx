import React from 'react';
import { useFormTable } from '@lianmed/hooks';
import { Input, Button, Table, Form, Divider, Popconfirm } from 'antd';
import request from '@lianmed/request';
import ModalForm from './components/ModalForm';
import { IProduct } from '@/modelTypes';
import queryString from 'query-string';

interface IProps {}

export default (props: IProps) => {
  const [form] = Form.useForm();

  const columns: any[] = [
    {
      title: '编号',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
    },
    {
      title: '产品名称',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
    },
    {
      title: '产品图片',
      dataIndex: 'picture',
      key: 'picture',
      align: 'center',
    },
    {
      title: '产品规格',
      dataIndex: 'specification',
      align: 'center',
      render: (specification: string) => (
        <div dangerouslySetInnerHTML={{ __html: specification }} />
      ),
    },
    {
      title: '排序',
      key: 'sortorder',
      dataIndex: 'sortorder',
      align: 'center',
      render: (sortorder: any) => <span>{sortorder}</span>,
    },
    {
      title: '操作',
      key: 'action',
      align: 'center',
      render: (text: any, { id }: any) => (
        <span>
          <ModalForm id={id} onsubmit={search}>
            <a>编辑</a>
          </ModalForm>

          <Divider type="vertical" />

          <Popconfirm
            title={'确认删除？'}
            onConfirm={() => {
              request.delete(`/products/${id}`).then(search);
            }}
            // okText="Yes"
            // cancelText="No"
          >
            <a>删除</a>
          </Popconfirm>
        </span>
      ),
    },
  ];

  const { formProps, tableProps, search } = useFormTable({
    defaultPageSize: 10,
    form,
    async search(values) {
      const res: IProduct[] = await request.get(`/products?${queryString.stringify(values)}`);
      return {
        dataSource: res,
        total: res.length,
        pageSize: 10,
      } as any;
    },
  });
  tableProps.pagination.pageSize = 10;

  return (
    <div>
      <Form layout="inline" {...formProps}>
        <Form.Item label="产品名称" name="name">
          <Input />
        </Form.Item>

        <Form.Item>
          <Button onClick={() => form.resetFields()}>重置</Button>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            查询
          </Button>
        </Form.Item>
      </Form>

      <Table
        title={() => (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>产品列表</span>
            <ModalForm onsubmit={search}>
              <Button>添加产品</Button>
            </ModalForm>
          </div>
        )}
        style={{ marginTop: 20 }}
        columns={columns}
        rowKey="id"
        {...tableProps}
        bordered
      />
    </div>
  );
};
