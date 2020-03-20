import React from 'react';
import { Tree } from 'antd';
import { map } from 'lodash';
import request from '@/utils/request';

export default class PermissionSelect extends React.Component {
  state = {
    treeData: [],
  };

  async componentDidMount() {
    const treeData = this.transferMenus(await request.get('/permissions?size=100'));
    this.setState({ treeData });
  }

  transferMenus = (menus: any, parentid = 0) => {
    const temp: any = [];
    map(menus, item => {
      if (item.parentid === parentid) {
        item.title = item.name;
        item.key = item.id;
        item.children = this.transferMenus(menus, item.id);
        temp.push(item);
      }
    });
    return temp;
  };

  handleChange = ({ checked }) => {
    const { onChange } = this.props;
    onChange(checked);
  };

  render() {
    const { value } = this.props;
    const { treeData } = this.state;
    if (treeData.length > 0) {
      return (
        <Tree
          checkStrictly
          treeData={treeData}
          checkedKeys={value}
          defaultExpandAll
          checkable
          onCheck={this.handleChange}
          {...this.props}
        />
      );
    }
    return <span>权限加载中...</span>;
  }
}
