import React, { Fragment } from 'react';
import Table from './components/table';
import PackageModal from './components/PackageModal';
import { tableColumns } from './config/table';
import { Popconfirm, Switch, message } from 'antd';
import { get } from 'lodash';
import BaseList from '@/components/BaseList';
import styles from './index.less';
import request from '@/utils/request';

export default class PackageList extends BaseList {
  state = {
    total: 0,
    needPagination: false,
    dataSource: [],
    visible: false,
    editable: false,
    id: undefined,
    showQuery: false,
    baseUrl: '/servicepackages',
    baseTitle: '套餐',
  };

  columns = [
    ...tableColumns,
    {
      title: '是否可用',
      dataIndex: 'isdeleted',
      render: (isdeleted, rowData) => {
        return (
          <Switch
            defaultChecked={isdeleted}
            onChange={this.handleChangeFields('isdeleted', rowData)}
          />
        );
      },
    },
    {
      title: '是否置顶',
      dataIndex: 'topflag',
      render: (topflag, rowData) => {
        return (
          <Switch defaultChecked={topflag} onChange={this.handleChangeFields('topflag', rowData)} />
        );
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

  handleChangeFields = (field, rowData) => async value => {
    const { baseUrl } = this.state;
    await request.put(baseUrl, {
      data: {
        id: get(rowData, 'id'),
        [field]: value ? 1 : 0,
      },
    });
    message.success('切换成功');
    this.handleSearch();
  };

  render() {
    const { dataSource, visible, editable, id, baseTitle, needPagination } = this.state;

    return (
      <Fragment>
        <Table
          columns={this.columns}
          dataSource={dataSource}
          onAdd={this.handleAdd}
          baseTitle={baseTitle}
          pagination={needPagination}
        />
        {visible && (
          <PackageModal
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
