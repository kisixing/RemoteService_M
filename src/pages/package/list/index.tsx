import React from 'react';
import { useFormTable } from '@lianmed/hooks';
import { Input, Button, Table, Form, Divider, Popconfirm } from 'antd';
import request from '@lianmed/request';
import ModalForm from "./components/ModalForm";
import { IProduct } from "@/modelTypes";

interface IProps {
}

export default (props: IProps) => {
  const [form] = Form.useForm()


  const columns: any[] = [
    {
      title: '套餐名称',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '商品图片',
      dataIndex: 'picture',
      key: 'picture',
    },
    {
      title: '价格',
      dataIndex: 'price',
      render: (price: string) => (
        <div dangerouslySetInnerHTML={{ __html: price }} />
      ),
    },
    {
      title: '所属产品',
      dataIndex: 'products',
      render: (products: IProduct[]) => {
        return products ? products.map(_ => _.name).join('、') : ''
      },
    },
    {
      title: '是否可用',
      dataIndex: 'isdeleted',
      render: (isdeleted: string) => (
        <div dangerouslySetInnerHTML={{ __html: isdeleted }} />
      ),
    },
    {
      title: '是否置顶',
      dataIndex: 'topflag',
      render: (topflag: string) => (
        <div dangerouslySetInnerHTML={{ __html: topflag }} />
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
              request.delete(`/servicepackages/${id}`).then(search)
            }}
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
      const res: IProduct[] = await request.get('/servicepackages');
      return {
        dataSource: res,
        total: res.length,
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
      <Form.Item label="产品名称" name="name">
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
      <Form.Item>
        <ModalForm onsubmit={search}>
          <Button>新增</Button>
        </ModalForm>

      </Form.Item>
    </Form>

    <Table
      style={{ marginTop: 20 }}
      columns={columns}
      rowKey="id"
      {...tableProps}
      bordered
    />
  </div>
}