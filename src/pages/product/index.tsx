import React, { Fragment } from 'react';
import Table from './components/table';
import ProductModal from './components/ProductModal';
import { tableColumns } from './config/table';
import { Popconfirm } from 'antd';
import styles from './index.less';
import BaseList from '@/components/BaseList';
import Query from './components/query';
import { get } from 'lodash';

export default class ProductsList extends BaseList {
  state = {
    total: 0,
    needPagination: false,
    dataSource: [],
    visible: false,
    editable: false,
    id: undefined,
    showQuery: false,
    baseUrl: '/products',
    baseTitle: '产品',
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
    const { dataSource, visible, editable, id, baseTitle, needPagination } = this.state;
    return (
      <Fragment>
        {/* <Query />
        <br /> */}
        <Table
          columns={this.columns}
          dataSource={dataSource}
          onAdd={this.handleAdd}
          baseTitle={baseTitle}
          pagination={needPagination}
        />
        {visible && (
          <ProductModal
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
