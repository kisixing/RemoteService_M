import React, { Fragment } from 'react';
import request from '@/utils/request';
import { get, isFunction } from 'lodash';
import { message } from 'antd';
import queryString from 'query-string';

export default class BaseList extends React.Component {
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
    showQuery: false,
    loding: true,
    baseUrl: '',
    baseTitle: '',
    processFromApi: undefined,
  };

  componentDidMount() {
    this.handleSearch();
  }

  handleDelete = rowData => async () => {
    const { baseUrl, baseTitle } = this.state;
    await request.delete(`${baseUrl}/${get(rowData, 'id')}`);
    message.success(`删除${baseTitle}成功`);
    this.handleSearch();
  };

  handleEdit = rowData => () => {
    this.setState({
      visible: true,
      editable: true,
      id: get(rowData, 'id'),
    });
  };

  handleAdd = () => {
    this.setState({
      visible: true,
      editable: true,
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
      editable: false,
      id: undefined,
    });
  };

  handleSearch = async () => {
    const { baseUrl, needPagination, processFromApi, defaultQuery } = this.state;
    const dataSource = isFunction(processFromApi)
      ? processFromApi(await request.get(`${baseUrl}${defaultQuery ? `?${queryString.stringify(defaultQuery)}` : ''}`))
      : await request.get(`${baseUrl}${defaultQuery ? `?${queryString.stringify(defaultQuery)}` : ''}`);
    let total = 0;
    if (needPagination) {
      total = await request.get(`${baseUrl}/count?criteria`);
    }
    this.setState({ dataSource, total, loding: false });
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
    return <Fragment></Fragment>;
  }
}
