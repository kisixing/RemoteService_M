import React from 'react';
import { useFormTable } from '@lianmed/hooks';
import { Input, Button, Table, Form, Divider, Popconfirm } from 'antd';
import request from '@lianmed/request';
import ModalForm from './components/ModalForm';
import { IProduct } from '@/modelTypes';
import { DataSelect } from '@lianmed/components';

interface IProps {}

export default (props: IProps) => {
  const [form] = Form.useForm();

  const columns: any[] = [
    {
      title: '套餐名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '商品图片',
      dataIndex: 'picture',
      key: 'picture',
    },
    {
      title: '价格',
      dataIndex: 'price',
      render: (price: string) => <div dangerouslySetInnerHTML={{ __html: price }} />,
    },
    {
      title: '所属产品',
      dataIndex: 'products',
      render: (products: IProduct[]) => {
        return products ? products.map(_ => _.name).join('、') : '';
      },
    },
    {
      title: '是否可用',
      dataIndex: 'isdeleted',
      render: (isdeleted: string) => <div dangerouslySetInnerHTML={{ __html: isdeleted }} />,
    },
    {
      title: '是否置顶',
      dataIndex: 'topflag',
      render: (topflag: string) => <div dangerouslySetInnerHTML={{ __html: topflag }} />,
    },
    {
      title: '排序',
      key: 'sortorder',
      dataIndex: 'sortorder',
      render: (sortorder: any) => <span>{sortorder}</span>,
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
              request.delete(`/servicepackages/${id}`).then(search);
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
  tableProps.pagination.pageSize = 10;

  return (
    <div>
      {/* <Form layout="inline" {...formProps}>
        <Form.Item label="套餐名称" name="name">
          <Input placeholder="请输入套餐名称" />
        </Form.Item>
        <Form.Item label="所属产品" name="product">
          <DataSelect
            url="/products"
            valueKey="id"
            labelKey="name"
            placeholder="请输入选择所属产品"
            style={{ width: 150 }}
            allowClear
          />
        </Form.Item>

        <Form.Item>
          <Button onClick={() => form.resetFields()}>重置</Button>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            查询
          </Button>
        </Form.Item>
      </Form> */}

      <Table
        title={() => (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>套餐列表</span>
            <ModalForm onsubmit={search}>
              <Button>添加套餐</Button>
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
