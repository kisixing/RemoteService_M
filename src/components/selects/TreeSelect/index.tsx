import React from 'react';
import { Tree } from 'antd';

const treeData = [
  {
    title: '所有权限',
    key: 'all',
    children: [
      {
        title: '产品管理',
        key: 'product',
        children: [
          {
            title: '产品列表',
            key: 'product_list',
          },
        ],
      },
      {
        title: '套餐管理',
        key: 'package',
        children: [
          {
            title: '套餐列表',
            key: 'package_list',
          },
        ],
      },
      {
        title: '订单管理',
        key: 'order',
        children: [
          {
            title: '订单列表',
            key: 'order_list',
          },
        ],
      },
      {
        title: '设备管理',
        key: 'device',
        children: [
          {
            title: '设备列表',
            key: 'device_list',
          },
        ],
      },
      {
        title: '服务记录',
        key: 'service',
      },
      {
        title: '判图费管理',
        key: 'ctg_fee',
      },
      {
        title: '在线咨询',
        key: 'im',
      },
      {
        title: '系统管理',
        key: 'system',
        children: [
          {
            title: '用户管理',
            key: 'system_user',
          },
          {
            title: '角色管理',
            key: 'system_role',
          },
          {
            title: '菜单管理',
            key: 'system_menu',
          },
          {
            title: '任务管理',
            key: 'system_task',
          },
          {
            title: '审计管理',
            key: 'system_audit',
          },
        ],
      },
    ],
  },
];

interface IProps {
  treeData: any;
  defaultExpandedKeys: any;
}

export default class BaseTree extends React.Component<IProps> {
  static defaultProps = {
    treeData,
    defaultExpandedKeys: ['all'],
  };

  handleCheck = (checkedKeys) => {
    console.log(checkedKeys)
  }

  render() {
    const { treeData, defaultExpandedKeys } = this.props;

    return <Tree treeData={treeData} checkable defaultExpandedKeys={defaultExpandedKeys} onCheck={this.handleCheck} />;
  }
}
