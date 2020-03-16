import React, { Fragment } from 'react';
import Table from './components/table';
import UsersModal from './components/UsersModal';
import { tableColumns } from './config/table';
import { processFromApi } from './config/adapter';
import { Popconfirm, Switch } from 'antd';
import { get } from 'lodash';
import BaseList from '@/components/BaseList';
import styles from './index.less';
import request from '@/utils/request';

export default class Users extends BaseList {
  state = {
    total: 0,
    needPagination: false,
    defaultQuery: {
      page: 0,
      size: 20,
    },
    dataSource: [],
    visible: false,
    editable: false,
    id: undefined,
    paramryKey: undefined,
    showQuery: false,
    baseUrl: '/users',
    baseTitle: '用户',
    processFromApi,
  };

  columns = [
    ...tableColumns,
    {
      title: '禁用',
      dataIndex: 'activated',
      key: 'activated',
      align: 'center',
      // render: value => (!value ? '是' : '否'),
      render: (value, rowData) => {
        return <Switch defaultChecked={value} onChange={this.handleDisableUser(rowData)} />;
      },
    },
    {
      title: '操作',
      align: 'center',
      render: (value, rowData, index) => {
        return (
          <Fragment>
            <span className={styles.label} onClick={this.handleEdit(rowData)}>
              编辑
            </span>
            <Popconfirm
              title={`确定要删除这个${get(this.state, 'baseTitle')}吗?`}
              onConfirm={this.handleDelete(rowData)}
              okText="确定"
              cancelText="取消"
            >
              <span className={styles.label}>删除</span>
            </Popconfirm>
          </Fragment>
        );
      },
    },
  ];

  handleEdit = rowData => () => {
    this.setState({
      visible: true,
      editable: true,
      id: get(rowData, 'id'),
      paramryKey: get(rowData, 'login'),
    });
  };

  handleDisableUser = rowData => async () => {
    const { baseUrl } = this.state;

    await request.put(baseUrl, {
      data: {
        id: get(rowData, 'id'),
        activated: !get(rowData, 'activated'),
      },
    });

    this.handleSearch();
  };

  render() {
    const {
      dataSource,
      visible,
      editable,
      id,
      baseTitle,
      total,
      defaultQuery,
      paramryKey,
    } = this.state;

    return (
      <Fragment>
        <Table
          // pagination={{
          //   total,
          //   showTotal: () => `一共${total}条记录`,
          //   pageSize: defaultQuery.size,
          //   defaultCurrent: 1,
          //   onChange: this.handlePageChange,
          // }}
          columns={this.columns}
          dataSource={dataSource}
          onAdd={this.handleAdd}
          baseTitle={baseTitle}
        />
        {visible && (
          <UsersModal
            visible={visible}
            editable={editable}
            id={id}
            paramryKey={paramryKey}
            onCancel={this.handleCancel}
            onSearch={this.handleSearch}
          />
        )}
      </Fragment>
    );
  }
}
