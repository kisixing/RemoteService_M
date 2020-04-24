import React, { Fragment } from 'react';
import Table from './components/table';
import ProductModal from './components/ProductModal';
import { tableColumns } from './config/table';
import { Popconfirm, Button } from 'antd';
import styles from './index.less';
import BaseList from '@/components/BaseList';
import Query from './components/query';
import { get } from 'lodash';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import commonStyles from '@/common.less';
import CustomSpin from '@/components/GeneralComponents/CustomSpin';

export default class ProductsList extends BaseList {
  state = {
    total: 0,
    defaultQuery: {
      page: 0,
      size: 20,
      sort: 'sortorder,desc',
    },
    needPagination: false,
    dataSource: [],
    visible: false,
    editable: false,
    id: undefined,
    showQuery: false,
    loding: true,
    baseUrl: '/products',
    baseTitle: '产品',
  };

  columns = [
    ...tableColumns,
    // {
    //   title: '产品规格',
    //   dataIndex: 'specification',
    //   width: '20%',
    //   ellipsis: true,
    //   render: (specification: string) => (
    //     <div className={styles.editorCell} dangerouslySetInnerHTML={{ __html: specification }} />
    //   ),
    // },
    // {
    //   title: '产品介绍',
    //   dataIndex: 'introduction',
    //   // width: '20%',
    //   ellipsis: true,
    //   render: (specification: string) => (
    //     <div className={styles.editorCell} dangerouslySetInnerHTML={{ __html: specification }} />
    //   ),
    // },
    // {
    //   title: '注意事项',
    //   dataIndex: 'note',
    //   // width: '20%',
    //   ellipsis: true,
    //   render: (specification: string) => (
    //     <div className={styles.editorCell} dangerouslySetInnerHTML={{ __html: specification }} />
    //   ),
    // },
    {
      title: '排序',
      key: 'sortorder',
      dataIndex: 'sortorder',
      align: 'center',
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

  render() {
    const { dataSource, visible, editable, id, baseTitle, needPagination, loding } = this.state;
    return (
      <Fragment>
        {/* <Query />
        <br /> */}
        {loding ? (
          <CustomSpin />
        ) : (
          <Table
            columns={this.columns}
            dataSource={dataSource}
            onAdd={this.handleAdd}
            baseTitle={baseTitle}
            pagination={needPagination}
          />
        )}
        {visible && (
          <ProductModal
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
