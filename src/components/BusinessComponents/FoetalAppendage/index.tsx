import React from 'react';
import { Tabs } from 'antd';
import { map, get } from 'lodash';

const TAB_TITLE = '胎儿';
// 胎儿附属物
export default class FoetalAppendage extends React.Component {
  state = {
    panes: [
      {
        key: '1',
        closable: false,
        title: `${TAB_TITLE}1`,
      },
    ],
    activeKey: '1',
  };

  onTabChange = () => {};

  onEdit = () => {};

  renderContent = () => {
    return <></>;
  };

  render() {
    const { panes } = this.state;
    return (
      <Tabs onChange={this.onTabChange} activeKey={this.state.activeKey} type="editable-card" onEdit={this.onEdit}>
        {map(panes, pane => (
          <Tabs.TabPane tab={pane.title} key={pane.key} closable={pane.closable}>
            {this.renderContent()}
          </Tabs.TabPane>
        ))}
      </Tabs>
    );
  }
}
