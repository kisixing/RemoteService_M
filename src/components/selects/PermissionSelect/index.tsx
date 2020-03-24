import React from 'react';
import { Tree } from 'antd';
import { map, isEqual, get, isEmpty } from 'lodash';
import request from '@/utils/request';

export default class PermissionSelect extends React.Component {
  state = {
    treeData: [],
    checkedData: [],
    isUpdated: false,
  };

  async componentDidMount() {
    const treeData = this.transferMenus(await request.get('/permissions?size=100'));
    this.setState({ treeData });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { checkedData, isUpdated } = prevState;
    const { value } = nextProps;
    if (
      !isEqual(
        map(value, item => item.name),
        checkedData,
      ) &&
      value &&
      !isUpdated
    ) {
      return {
        checkedData: value,
      };
    }

    return null;
  }

  handleChange = ({ checked }) => {
    const { onChange } = this.props;
    this.setState({ checkedData: checked, isUpdated: true });
    onChange && onChange(checked);
  };

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

  render() {
    const { disabled } = this.props;
    const { treeData, checkedData } = this.state;
    if (treeData.length > 0) {
      return (
        <Tree
          checkStrictly
          treeData={treeData}
          checkedKeys={checkedData}
          defaultExpandAll
          checkable
          disabled={disabled}
          onCheck={this.handleChange}
          {...this.props}
        />
      );
    }
    return <span>权限加载中...</span>;
  }
}
