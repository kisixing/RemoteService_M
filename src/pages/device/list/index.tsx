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
      title: '设备编号',
      dataIndex: 'erpno',
      key: 'erpno'
    },
    {
      title: '设备名称',
      dataIndex: 'devicename',
      key: 'devicename'
    },
    {
      title: '厂家',
      dataIndex: 'manufacturer',
      key: 'manufacturer'
    },
    {
      title: '型号',
      dataIndex: 'model',
      key: 'model'
    },
    {
      title: '设备类型',
      dataIndex: 'type',
      key: 'type'
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status'
    },
    {
      title: '绑定信息',
      dataIndex: 'devicename',
      key: 'devicename'
    },
    {
      title: '操作内容',
      dataIndex: 'devicename',
      key: 'devicename'
    },
    {
      title: '操作时间',
      dataIndex: 'devicename',
      key: 'devicename'
    },
    {
      title: '操作者',
      dataIndex: 'devicename',
      key: 'devicename'
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
              request.delete(`/devices/${id}`).then(search)
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
      const res: IProduct[] = await request.get('/devices');
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
      <Form.Item label="产品名称" name="devicename">
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
      bordered
      style={{ marginTop: 20 }}
      columns={columns}
      rowKey="id"
      {...tableProps}
    />
  </div>
}