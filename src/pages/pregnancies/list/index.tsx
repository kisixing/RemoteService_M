import React, { Fragment } from 'react';
import Table from './components/table';
import CtgFeesModal from './components/VersionModal';
import { tableColumns } from './config/table';
import { Popconfirm, Button } from 'antd';
import BaseList from '@/components/BaseList';
import request from '@/utils/request';
import queryString from 'query-string';
import { get, isFunction } from 'lodash';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import commonStyles from '@/common.less';
import CustomSpin from '@/components/GeneralComponents/CustomSpin';
import { router } from 'umi';

export default class Versions extends BaseList {
  state = {
    total: 0,
    defaultQuery: {
      page: 0,
      size: 20,
    },
    needPagination: true,
    dataSource: [],
    visible: false,
    editable: false,
    id: undefined,
    showQuery: false,
    loding: true,
    baseUrl: '/pregnanciespage',
    baseTitle: '孕妇',
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

  handleAdd = () => {
    router.push('/pregnancies/add');
  };

  handleEdit = rowData => () => {
    router.push(`/pregnancies/edit?id=${get(rowData, 'id')}`);
  };

  handleSearch = async () => {
    const { baseUrl, needPagination, processFromApi, defaultQuery } = this.state;
    const dataSource = isFunction(processFromApi)
      ? processFromApi(await request.get(`${baseUrl}?${queryString.stringify(defaultQuery)}`))
      : await request.get(`${baseUrl}?${queryString.stringify(defaultQuery)}`);
    let total = 0;
    if (needPagination) {
      total = await request.get(`/pregnancies/count?criteria`);
    }
    this.setState({ dataSource, total, loding: false });
  };

  render() {
    const { dataSource, visible, editable, id, baseTitle, total, defaultQuery, needPagination, loding } = this.state;

    return (
      <Fragment>
        {loding ? (
          <CustomSpin />
        ) : (
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
        )}
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
