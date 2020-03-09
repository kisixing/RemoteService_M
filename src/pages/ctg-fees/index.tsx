import React, { Fragment } from 'react';
import Table from './components/table';
import CtgFeesModal from './components/CtgFeesModal';
import { tableColumns } from './config/table';
import request from '@/utils/request';
import { get } from 'lodash';
import { Popconfirm, message } from 'antd';
import styles from './index.less';

export default class CtgFees extends React.Component {
  state = {
    dataSource: [],
    visible: false,
    editable: false,
    ctgFeesId: undefined,
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
              title="确定要删除这条记录吗?"
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

  componentDidMount() {
    this.handleSearch();
  }

  handleDelete = rowData => async () => {
    await request.delete(`/ctgapplyfees/${get(rowData, 'id')}`);
    message.success('删除判图费成功');
    this.handleSearch();
  };

  handleEdit = rowData => () => {
    this.setState({
      visible: true,
      editable: true,
      ctgFeesId: get(rowData, 'id'),
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
      ctgFeesId: undefined,
    });
  };

  handleSearch = async () => {
    const dataSource = await request.get('/ctgapplyfees');
    this.setState({ dataSource });
  };

  render() {
    const { dataSource, visible, editable, ctgFeesId } = this.state;

    return (
      <Fragment>
        <Table columns={this.columns} dataSource={dataSource} onAdd={this.handleAdd} />
        {visible && (
          <CtgFeesModal
            visible={visible}
            editable={editable}
            ctgFeesId={ctgFeesId}
            onCancel={this.handleCancel}
            onSearch={this.handleSearch}
          />
        )}
      </Fragment>
    );
  }
}
