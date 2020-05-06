import React, { useState, useEffect } from 'react';
import { Table, Input, InputNumber, Popconfirm, Form, message } from 'antd';
import { get } from 'lodash';
import request from '@/utils/request';

const baseUrl = '/form-descriptions/sections';

const EditableCell = ({ editing, dataIndex, title, inputType, record, index, children, ...restProps }) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `请输入 ${title}`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const EditableTable = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [editingId, setEditingId] = useState('');

  useEffect(() => {
    (async () => {
      const result = await request.get('/form-descriptions/sections');
      setData(get(result, 'data.data'));
    })();
  }, []);

  const isEditing = (record: any) => record.id === editingId;

  const handleEdit = (record: any) => {
    form.setFieldsValue({ ...record });
    setEditingId(record.id);
  };

  const handleCancel = () => {
    setEditingId('');
  };

  const handleSave = async (id: any) => {
    try {
      await form.validateFields();
      const formData = form.getFieldsValue();
      await request.put(`${baseUrl}/${id}`, { data: formData });
      message.success('修改成功');
      flashPage();
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const handleDelete = async (id: any) => {
    try {
      await request.delete(`${baseUrl}/${id}`);
      message.success('删除成功');
      flashPage();
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const flashPage = () => {
    console.log('flashPage');
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      editable: false,
    },
    {
      title: '名称',
      dataIndex: 'name',
      editable: true,
    },
    {
      title: '标志',
      dataIndex: 'flag',
      editable: true,
    },
    {
      title: '排序',
      dataIndex: 'sort',
      editable: true,
      inputType: 'number',
    },
    {
      title: '模块名',
      dataIndex: 'module_name',
      editable: true,
    },
    {
      title: '操作',
      dataIndex: 'operation',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <a
              href="javascript:;"
              onClick={() => handleSave(record.id)}
              style={{
                marginRight: 8,
              }}
            >
              保存
            </a>
            <span> | </span>
            <Popconfirm title="确定取消吗?" onConfirm={handleCancel}>
              <a>取消</a>
            </Popconfirm>
          </span>
        ) : (
          <>
            <a disabled={editingId !== ''} onClick={() => handleEdit(record)}>
              编辑
            </a>
            <span> | </span>
            <a disabled={editingId !== ''} onClick={() => handleDelete(record.id)}>
              删除
            </a>
          </>
        );
      },
    },
  ];

  const mergedColumns = columns.map(col => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: record => ({
        record,
        inputType: col.inputType ? col.inputType : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        size="small"
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: handleCancel,
        }}
      />
    </Form>
  );
};

export default EditableTable;
