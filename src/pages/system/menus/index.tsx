import React, { Fragment } from 'react';
import Table from './components/table';
import MenuModal from './components/MenuModal';
import { tableColumns } from './config/table';
import { Popconfirm, Button } from 'antd';
import { get } from 'lodash';
import BaseList from '@/components/BaseList';
import styles from './index.less';
import { processFromApi } from './config/adapter';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import commonStyles from '@/common.less';
import CustomSpin from '@/components/GeneralComponents/CustomSpin';

export default class Menus extends BaseList {
  state = {
    total: 0,
    needPagination: true,
    defaultQuery: {
      page: 0,
      size: 100,
    },
    dataSource: [],
    visible: false,
    editable: false,
    id: undefined,
    showQuery: false,
    loding: true,
    baseUrl: '/permissions',
    baseTitle: '菜单/权限',
    processFromApi,
  };

  columns = [
    ...tableColumns,
    {
      title: '操作',
      align: 'center',
      render: (value, rowData, index) => {
        return (
          <Fragment>
            <Button
              className={commonStyles.tableActionBtn}
              type="primary"
              size="small"
              onClick={this.handleEdit(rowData)}
            >
              <EditOutlined />
            </Button>
            <Popconfirm
              title={`确定要删除这个${get(this.state, 'baseTitle')}吗?`}
              onConfirm={this.handleDelete(rowData)}
              okText="确定"
              cancelText="取消"
            >
              <Button className={commonStyles.tableActionBtn} type="danger" size="small">
                <DeleteOutlined />
              </Button>
            </Popconfirm>
          </Fragment>
        );
      },
    },
  ];

  render() {
    const {
      dataSource,
      visible,
      editable,
      id,
      baseTitle,
      total,
      defaultQuery,
      loding,
    } = this.state;

    return (
      <Fragment>
        {loding ? (
          <CustomSpin />
        ) : (
          <Table
            pagination={{
              total,
              showTotal: () => `一共${total}条记录`,
              pageSize: defaultQuery.size,
              defaultCurrent: 1,
              onChange: this.handlePageChange,
            }}
            expandable={{ expandRowByClick: true }}
            columns={this.columns}
            dataSource={dataSource}
            onAdd={this.handleAdd}
            baseTitle={baseTitle}
          />
        )}
        {visible && (
          <MenuModal
            visible={visible}
            editable={editable}
            id={id}
            onCancel={this.handleCancel}
            onSearch={this.handleSearch}
          />
        )}
      </Fragment>
    );
  }
}
