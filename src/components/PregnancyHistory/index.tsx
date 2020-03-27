import React from 'react';
import { Tabs } from 'antd';
import { map, get } from 'lodash';

export default class PregnancyHistory extends React.Component {
  constructor(props) {
    super(props);
    this.newTabIndex = 0;
    // const panes = [{ title: 'Tab 1', content: 'Content of Tab 1', key: '1' }];
    this.state = {
      tabPanes: [],
      activeKey: undefined,
    };
  }

  handleChange = activeKey => {
    this.setState({ activeKey });
  };

  handleEdit = (targetKey, action) => {
    this[action](targetKey);
  };

  renderTabContent = () => {
    return <span>{Math.random()}</span>;
  };

  add = () => {
    const { tabPanes } = this.state;
    const activeKey = `newTab${this.newTabIndex++}`;
    tabPanes.push({ title: 'New Tab', content: this.renderTabContent(), key: activeKey });
    this.setState({ tabPanes, activeKey });
  };

  remove = targetKey => {
    let { activeKey, tabPanes } = this.state;
    let lastIndex;
    tabPanes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const panes = tabPanes.filter(pane => pane.key !== targetKey);
    if (panes.length && activeKey === targetKey) {
      if (lastIndex >= 0) {
        activeKey = panes[lastIndex].key;
      } else {
        activeKey = panes[0].key;
      }
    }
    this.setState({ panes, activeKey });
  };

  render() {
    const { tabPanes, activeKey } = this.state;
    return (
      <Tabs type="editable-card" onChange={this.handleChange} activeKey={activeKey} onEdit={this.handleEdit}>
        {map(tabPanes, (pane, index) => {
          return <Tabs.TabPane tab={pane.title}>{pane.content}</Tabs.TabPane>;
        })}
      </Tabs>
    );
  }
}
