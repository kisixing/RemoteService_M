import React, { Fragment } from 'react';
import Table from './components/table';
import DeviceModal from './components/DeviceModal';
import { tableColumns } from './config/table';
import { Popconfirm } from 'antd';
import BaseList from '@/components/BaseList';
import styles from './index.less';
import { get, pick } from 'lodash';
import Query from './components/query';
import request from '@/utils/request';
import queryString from 'query-string';

export default class DeviceList extends BaseList {
  state = {
    dataSource: [],
    visible: false,
    editable: false,
    id: undefined,
    showQuery: false,
    baseUrl: '/devices',
    baseTitle: '设备',
    products: [],
  };

  columns = [
    ...tableColumns,
    {
      title: '设备类型',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => {
        const { products } = this.state;
        const t = products.find(product => get(product, 'id') === +type);
        return t ? get(t, 'name') : '';
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

  handleSearch = async (values = {}) => {
    const { baseUrl } = this.state;
    const params = {
      ...pick(values, ['current', 'pageSize']),
      'devicename.contains': get(values, 'devicename'),
      'type.equals': get(values, 'type'),
      'status.equals': get(values, 'status'),
    };
    const dataSource = await request.get(`${baseUrl}?${queryString.stringify(params)}`);
    const products = await request.get('/products');
    this.setState({ dataSource, products });
  };

  render() {
    const { dataSource, visible, editable, id, baseTitle } = this.state;

    return (
      <Fragment>
        <Query onSearch={this.handleSearch} />
        <br />
        <Table
          columns={this.columns}
          dataSource={dataSource}
          onAdd={this.handleAdd}
          baseTitle={baseTitle}
        />
        {visible && (
          <DeviceModal
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
