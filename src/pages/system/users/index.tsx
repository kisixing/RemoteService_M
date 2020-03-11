import React, { Fragment } from 'react';
import Table from './components/table';
import UsersModal from './components/UsersModal';
import { tableColumns } from './config/table';
// import { processFromApi } from './config/adapter';
import { Popconfirm } from 'antd';
import { get } from 'lodash';
import BaseList from '@/components/BaseList';
import styles from './index.less';

export default class Users extends BaseList {
  // static defaultProps = {
  //   processFromApi
  // }

  state = {
    total: 0,
    // needPagination: true,
    dataSource: [],
    visible: false,
    editable: false,
    id: undefined,
    showQuery: false,
    baseUrl: '/users',
    baseTitle: '用户',
  };

  columns = [
    ...tableColumns,
    {
      title: '是否禁用',
      dataIndex: 'activated',
      key: 'activated',
      align: 'center',
      render: value => (!value ? '是' : '否'),
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

  render() {
    const { dataSource, visible, editable, id, baseTitle, total, needPagination } = this.state;

    return (
      <Fragment>
        <Table
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
            onCancel={this.handleCancel}
            onSearch={this.handleSearch}
          />
        )}
      </Fragment>
    );
  }
}
