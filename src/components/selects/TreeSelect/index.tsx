import React from 'react';
import { Tree } from 'antd';

// const treeData = [
//   {
//     title: '所有权限',
//     key: 'all',
//     children: [
//       {
//         title: '产品管理',
//         key: 'menu_PRODUCT',
//         disabled: true,
//         children: [
//           {
//             title: '产品列表',
//             key: 'menu_PRODUCTLIST',
//             disabled: true,
//             children: [
//               {
//                 title: '查看',
//                 key: 'permission_PRODUCTLIST_view',
//               },
//               {
//                 title: '添加',
//                 key: 'permission_PRODUCTLIST_add',
//               },
//               {
//                 title: '编辑',
//                 key: 'permission_PRODUCTLIST_edit',
//               },
//               {
//                 title: '删除',
//                 key: 'permission_PRODUCTLIST_delete',
//               },
//             ],
//           },
//         ],
//       },
//       {
//         title: '套餐管理',
//         key: 'menu_PACKAGE',
//         children: [
//           {
//             title: '套餐列表',
//             key: 'menu_PACKAGELIST',
//           },
//         ],
//       },
//       {
//         title: '订单管理',
//         key: 'menu_ORDER',
//         children: [
//           {
//             title: '订单列表',
//             key: 'menu_ORDERLIST',
//           },
//         ],
//       },
//       {
//         title: '设备管理',
//         key: 'menu_DEVICE',
//         children: [
//           {
//             title: '设备列表',
//             key: 'menu_DEVICELIST',
//           },
//         ],
//       },
//       {
//         title: '服务记录',
//         key: 'menu_SERVICE',
//       },
//       {
//         title: '判图费管理',
//         key: 'menu_CTGFEE',
//       },
//       {
//         title: '在线咨询',
//         key: 'menu_IM',
//       },
//       {
//         title: '系统管理',
//         key: 'menu_SYSTEM',
//         children: [
//           {
//             title: '用户管理',
//             key: 'menu_SYSTEMUSER',
//           },
//           {
//             title: '角色管理',
//             key: 'menu_SYSTEMROLE',
//           },
//           {
//             title: '菜单管理',
//             key: 'menu_SYSTEMMENU',
//           },
//           {
//             title: '任务管理',
//             key: 'menu_system_task',
//           },
//           {
//             title: '审计管理',
//             key: 'menu_system_audit',
//           },
//         ],
//       },
//     ],
//   },
// ];

interface IProps {
  treeData: any;
  onChange: any;
  checkStrictly?: any;
  checkedKeys?: any;
  value?: any;
}

export default class BaseTree extends React.Component<IProps> {
  handleCheck = (checkedKeys, { halfCheckedKeys }) => {
    const { onChange } = this.props;
    onChange({ checkedKeys, halfCheckedKeys });
  };

  render() {
    const { treeData, value, ...others } = this.props;

    return (
      <Tree defaultExpandAll treeData={treeData} checkable onCheck={this.handleCheck} {...others} />
    );
  }
}
