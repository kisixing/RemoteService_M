import React, { Fragment } from 'react';
import Table from './components/table';
import { tableColumns } from './config/table';
import { Popconfirm, Button } from 'antd';
import { get } from 'lodash';
import BaseList from '@/components/BaseList';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import commonStyles from '@/common.less';
import CustomSpin from '@/components/GeneralComponents/CustomSpin';
import { router } from 'umi';
import WithDynamicExport from '@/components/WithDynamicExport';

export class FollowUpQuestion extends BaseList {
  state = {
    total: 0,
    needPagination: false,
    dataSource: [],
    visible: false,
    editable: false,
    id: undefined,
    showQuery: false,
    loding: true,
    baseUrl: '/follow-up/questions',
    baseTitle: '随访问卷',
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

  handleEdit = rowData => () => {
    router.push(`/follow-up/question/edit?id=${get(rowData, 'id')}`);
  };

  handleAdd = () => {
    router.push('/follow-up/question/add');
  };

  render() {
    const { dataSource, visible, editable, id, baseTitle, needPagination, loding } = this.state;

    return (
      <Fragment>
        {loding ? (
          <CustomSpin />
        ) : (
          <Table
            pagination={needPagination}
            columns={this.columns}
            dataSource={dataSource}
            onAdd={this.handleAdd}
            baseTitle={baseTitle}
          />
        )}
      </Fragment>
    );
  }
}

export default WithDynamicExport(FollowUpQuestion);
