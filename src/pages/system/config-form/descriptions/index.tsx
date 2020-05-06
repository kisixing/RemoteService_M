import React, { Fragment } from 'react';
import Table from './components/table';
import ConfigFormModel from './components/ConfigFormModel';
import { tableColumns } from './config/table';
import { Popconfirm, Button } from 'antd';
import { get, isEmpty } from 'lodash';
import BaseList from '@/components/BaseList';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import commonStyles from '@/common.less';
import CustomSpin from '@/components/GeneralComponents/CustomSpin';
import WithDynamicExport from '@/components/WithDynamicExport';
import request from '@/utils/request';
import Query from './components/query';
import queryString from 'query-string';

export class CtgFees extends BaseList {
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
    loding: true,
    baseUrl: '/form-descriptions/descriptions',
    baseTitle: '表单详情',
  };

  columns = [
    ...tableColumns,
    {
      title: '操作',
      align: 'center',
      width: 150,
      fixed: 'right',
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

  handleSearch = async (value = {}) => {
    const { baseUrl, defaultQuery } = this.state;
    let params = {};
    if (!isEmpty(value)) {
      params = {
        ...defaultQuery,
        ...value,
        page: 0,
      };
      this.setState({
        defaultQuery: { ...defaultQuery, page: 0 },
      });
    } else {
      params = defaultQuery;
    }
    const result = await request.get(`${baseUrl}?${queryString.stringify(params)}`);
    const dataSource = get(result, 'data.data');
    const total = get(result, 'data.total');
    this.setState({ dataSource, total, loding: false });
  };

  render() {
    const { dataSource, visible, editable, id, baseTitle, total, defaultQuery, loding } = this.state;
    return (
      <Fragment>
        <Query onSearch={this.handleSearch} />

        {loding ? (
          <CustomSpin />
        ) : (
          <Table
            pagination={{
              total,
              showTotal: () => `一共${total}条记录`,
              pageSize: defaultQuery.size,
              defaultCurrent: 1,
              current: defaultQuery.page + 1,
              onChange: this.handlePageChange,
            }}
            columns={this.columns}
            dataSource={dataSource}
            onAdd={this.handleAdd}
            baseTitle={baseTitle}
            scroll={{ x: 1500 }}
          />
        )}
        {visible && (
          <ConfigFormModel
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

export default WithDynamicExport(CtgFees);
