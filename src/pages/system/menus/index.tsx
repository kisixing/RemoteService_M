import React, { Fragment } from 'react';
import Table from './components/table';
import MenuModal from './components/MenuModal';
import { tableColumns } from './config/table';
import { Popconfirm } from 'antd';
import { get } from 'lodash';
import BaseList from '@/components/BaseList';
import styles from './index.less';
import { processFromApi } from './config/adapter';

export default class Menus extends BaseList {
  state = {
    dataSource: [],
    visible: false,
    editable: false,
    id: undefined,
    showQuery: false,
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
    const { dataSource, visible, editable, id, baseTitle } = this.state;

    return (
      <Fragment>
        {dataSource.length > 0 && (
          <Table
            expandable={{ defaultExpandAllRows: true, expandRowByClick: true }}
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