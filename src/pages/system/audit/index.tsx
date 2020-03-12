import React, { Fragment } from 'react';
import Table from './components/table';
import CtgFeesModal from './components/CtgFeesModal';
import { tableColumns } from './config/table';
import { Popconfirm } from 'antd';
import { get } from 'lodash';
import BaseList from '@/components/BaseList';
import styles from './index.less';

export default class CtgFees extends BaseList {
  state = {
    total: 0,
    defaultQuery: {
      page: 0,
      size: 20,
    },
    needPagination: false,
    dataSource: [],
    visible: false,
    editable: false,
    id: undefined,
    showQuery: false,
    baseUrl: '/auditspage',
    baseTitle: '审计',
  };

  columns = [
    ...tableColumns,
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
    const {
      dataSource,
      visible,
      editable,
      id,
      baseTitle,
      total,
      defaultQuery,
      needPagination,
    } = this.state;

    return (
      <Fragment>
        <Table
          pagination={
            needPagination && {
              total,
              showTotal: () => `一共${total}条记录`,
              pageSize: defaultQuery.size,
              defaultCurrent: 1,
              onChange: this.handlePageChange,
            }
          }
          columns={this.columns}
          dataSource={dataSource}
          onAdd={this.handleAdd}
          baseTitle={baseTitle}
        />
        {visible && (
          <CtgFeesModal
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
