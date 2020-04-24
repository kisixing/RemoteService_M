import React, { Fragment } from 'react';
import RoleTable from './components/RoleTable';
import RolesModal from './components/RolesModal';
import { tableColumns, menuColumns } from './config/table';
import { Popconfirm, Button, Row, Col, message } from 'antd';
import { get, map } from 'lodash';
import { processFromApi, toApi } from './config/adapter';
import BaseList from '@/components/BaseList';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import commonStyles from '@/common.less';
import CustomSpin from '@/components/GeneralComponents/CustomSpin';
import request from '@/utils/request';
import queryString from 'query-string';
import { transferMenus } from '@/utils/format';
import MenuPermissionCard from './components/MenuPermissionCard';
import ApiPermissionCard from './components/ApiPermissionCard';

export default class Roles extends BaseList {
  state = {
    dataSource: [],
    menuDataSource: [],
    visible: false,
    editable: false,
    id: undefined,
    showQuery: false,
    loding: true,
    baseUrl: '/groups',
    baseTitle: '角色',
    defaultCheckedMenu: [],
    activeRole: {},
  };

  roleColumns = [
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

  handleSearch = async () => {
    const { baseUrl, needPagination, defaultQuery } = this.state;
    const dataSource = processFromApi(
      await request.get(`${baseUrl}?${queryString.stringify(defaultQuery)}`),
    );
    // console.log(dataSource);
    // const menuDataSource = transferMenus(await request.get('/permissions?size=100'));
    // console.log(menuDataSource);
    let total = 0;
    if (needPagination) {
      total = await request.get(`${baseUrl}/count?criteria`);
    }
    this.setState({ dataSource, total, loding: false });
  };

  handleRowClick = rowData => e => {
    this.setState({
      defaultCheckedMenu: get(rowData, 'permissions'),
      activeRole: rowData,
    });
  };

  setRowClassName = rowData => {
    const { activeRole } = this.state;
    if (get(rowData, 'id') === get(activeRole, 'id')) {
      return 'table-row-active';
    }
    return '';
  };

  handleSaveApiPermission = async checkedData => {
    const { baseUrl, activeRole } = this.state;
    try {
      await request.put(`${baseUrl}`, {
        data: toApi({ ...activeRole, authorities: checkedData }),
      });
      message.success('保存 API 权限成功');
      await this.handleSearch();
    } catch (error) {
      console.log(error);
    }
  };

  handleSaveMenuPermission = async checkedData => {
    const { baseUrl, activeRole } = this.state;
    try {
      await request.put(`${baseUrl}`, {
        data: toApi({ ...activeRole, permissions: checkedData }),
      });
      message.success('保存菜单/权限成功');
      await this.handleSearch();
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const {
      dataSource,
      visible,
      editable,
      id,
      baseTitle,
      loding,
      defaultCheckedMenu,
      activeRole,
    } = this.state;

    return (
      <Fragment>
        {loding ? (
          <CustomSpin />
        ) : (
          <Row>
            <Col span={13}>
              <RoleTable
                columns={this.roleColumns}
                dataSource={dataSource}
                onAdd={this.handleAdd}
                pagination={false}
                rowClassName={this.setRowClassName}
                onRow={record => {
                  return {
                    onClick: this.handleRowClick(record),
                  };
                }}
                baseTitle={baseTitle}
              />
            </Col>
            <Col span={4} offset={1}>
              <MenuPermissionCard
                key={get(activeRole, 'id')}
                role={activeRole}
                onSaveMenuPermission={this.handleSaveMenuPermission}
              />
            </Col>
            <Col span={5} offset={1}>
              <ApiPermissionCard
                key={get(activeRole, 'id')}
                role={activeRole}
                onSaveApiPermission={this.handleSaveApiPermission}
              />
            </Col>
          </Row>
        )}
        {visible && (
          <RolesModal
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
