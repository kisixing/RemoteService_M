import React from 'react';
import { useFormTable } from '@lianmed/hooks';
import { Input, Button, Table, Form, Divider, Popconfirm } from 'antd';
import request from '@lianmed/request';
import ModalForm from "./components/ModalForm";
import { IProduct } from "@/modelTypes";

interface IProps {
}

export default ((props: IProps) => {
  const [form] = Form.useForm()


  const columns: any[] = [
    {
      title: '产品名称',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '产品图片',
      dataIndex: 'picture',
      key: 'picture',
    },
    {
      title: '产品规格',
      dataIndex: 'specification',
      render: (specification: string) => (
        <div dangerouslySetInnerHTML={{ __html: specification }} />
      ),
    },
    {
      title: '排序',
      key: 'sortorder',
      dataIndex: 'sortorder',
      render: (sortorder: any) => (
        <span>
          {sortorder}
        </span>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (text: any, { id }: any) => (
        <span>

          <ModalForm id={id} onsubmit={search}>
            <a>编辑</a>
          </ModalForm>

          <Divider type="vertical" />

          <Popconfirm
            title={'确认删除？'}
            onConfirm={() => {
              request.delete(`/products/${id}`).then(search)
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
    async search() {
      const res: IProduct[] = await request.get('/products');
      return {
        dataSource: res,
        total: res.length,
        pageSize: 10
      } as any;
    },
    async defaultFormValues() {
      await new Promise(r => setTimeout(r, 200));
      return {
        username: 'j',
      };
    },
  });
  tableProps.pagination.pageSize = 10

  return <div>
    <Form layout="inline" {...formProps}>
      <Form.Item label="产品名称" name="name" >

        <Input />

      </Form.Item>

      <Form.Item>
        <Button onClick={() => form.resetFields()}>
          Reset
        </Button>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Search
        </Button>
      </Form.Item>

    </Form>

    <Table
      title={() => (
        <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center' }}>
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
});