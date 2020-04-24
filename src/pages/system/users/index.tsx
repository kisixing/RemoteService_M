import React, { Fragment } from 'react';
import Table from './components/table';
import UsersModal from './components/UsersModal';
import { tableColumns } from './config/table';
import { processFromApi, toApi } from './config/adapter';
import { Popconfirm, Switch, Button, message } from 'antd';
import { get } from 'lodash';
import BaseList from '@/components/BaseList';
import request from '@/utils/request';
import { EditOutlined, DeleteOutlined, RedoOutlined } from '@ant-design/icons';
import commonStyles from '@/common.less';
import CustomSpin from '@/components/GeneralComponents/CustomSpin';
import ResetPasswordModal from './components/ResetPasswordModal';

export default class Users extends BaseList {
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
    resetEditable: false,
    resetVisible: false,
    id: undefined,
    paramryKey: undefined,
    showQuery: false,
    loding: true,
    baseUrl: '/users',
    baseTitle: '用户',
    processFromApi,
  };

  columns = [
    ...tableColumns,
    {
      title: '活跃状态',
      dataIndex: 'activated',
      key: 'activated',
      align: 'center',
      // render: value => (!value ? '是' : '否'),
      render: (value, rowData) => {
        return <Switch defaultChecked={value} onChange={this.handleDisableUser(rowData)} />;
      },
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
            <Button
              className={commonStyles.tableActionBtn}
              type="primary"
              size="small"
              onClick={this.handleResetEdit(rowData)}
            >
              <RedoOutlined />
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

  handleEdit = rowData => () => {
    this.setState({
      visible: true,
      editable: true,
      id: get(rowData, 'id'),
      paramryKey: get(rowData, 'login'),
    });
  };

  handleResetCancel = () => {
    this.setState({
      resetVisible: false,
      resetEditable: false,
    });
  };

  handleResetEdit = rowData => () => {
    this.setState({
      resetVisible: true,
      resetEditable: true,
      id: get(rowData, 'id'),
      paramryKey: get(rowData, 'login'),
    });
  };

  handleDisableUser = rowData => async () => {
    const { baseUrl } = this.state;
    try {
      await request.put(baseUrl, {
        data: toApi({
          ...rowData,
          roles: get(rowData, 'roles'),
          activated: !get(rowData, 'activated'),
        }),
      });
      message.success('切换用户状态成功');
    } catch (error) {
      console.log(error);
    }

    this.handleSearch();
  };

  render() {
    const {
      dataSource,
      visible,
      editable,
      id,
      baseTitle,
      total,
      defaultQuery,
      loding,
      paramryKey,
      resetVisible,
      resetEditable,
    } = this.state;

    return (
      <Fragment>
        {loding ? (
          <CustomSpin />
        ) : (
          <Table
            // pagination={{
            //   total,
            //   showTotal: () => `一共${total}条记录`,
            //   pageSize: defaultQuery.size,
            //   defaultCurrent: 1,
            //   onChange: this.handlePageChange,
            // }}
            columns={this.columns}
            dataSource={dataSource}
            onAdd={this.handleAdd}
            baseTitle={baseTitle}
          />
        )}
        {visible && (
          <UsersModal
            visible={visible}
            editable={editable}
            id={id}
            paramryKey={paramryKey}
            onCancel={this.handleCancel}
            onSearch={this.handleSearch}
          />
        )}
        {resetVisible && (
          <ResetPasswordModal
            visible={resetVisible}
            editable={resetEditable}
            id={id}
            paramryKey={paramryKey}
            onCancel={this.handleResetCancel}
            onSearch={this.handleSearch}
          />
        )}
      </Fragment>
    );
  }
}
