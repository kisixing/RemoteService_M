import React, { Fragment } from 'react';
import Table from './components/table';
import DeviceModal from './components/DeviceModal';
import { tableColumns } from './config/table';
import { Popconfirm, Button } from 'antd';
import BaseList from '@/components/BaseList';
import commonStyles from '@/common.less';
import { get, pick } from 'lodash';
import Query from './components/query';
import request from '@/utils/request';
import queryString from 'query-string';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

export default class DeviceList extends BaseList {
  state = {
    total: 0,
    needPagination: true,
    defaultQuery: {
      page: 0,
      size: 20,
    },
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
      // render: (type: string) => {
      //   const { products } = this.state;
      //   const t = products.find(product => get(product, 'id') === +type);
      //   return t ? get(t, 'name') : '';
      // },
    },
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

  handleSearch = async (values = {}) => {
    const { baseUrl, defaultQuery, needPagination } = this.state;
    const params = {
      ...pick(values, ['current', 'pageSize']),
      'devicename.contains': get(values, 'devicename'),
      'type.equals': get(values, 'type'),
      'status.equals': get(values, 'status'),
      ...defaultQuery,
    };
    const dataSource = await request.get(`${baseUrl}?${queryString.stringify(params)}`);
    const products = await request.get('/products');
    let total = 0;
    if (needPagination) {
      total = await request.get(`${baseUrl}/count?criteria`);
    }
    this.setState({ dataSource, products, total });
  };

  handlePageChange = (page, pageSize) => {
    this.setState(
      {
        defaultQuery: {
          page: page - 1,
          size: pageSize,
        },
      },
      () => {
        this.handleSearch();
      },
    );
  };

  render() {
    const { dataSource, visible, editable, id, baseTitle, total, defaultQuery } = this.state;

    return (
      <Fragment>
        <Query onSearch={this.handleSearch} />
        <Table
          pagination={{
            total,
            showTotal: () => `一共${total}条记录`,
            pageSize: defaultQuery.size,
            defaultCurrent: 1,
            onChange: this.handlePageChange,
          }}
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
