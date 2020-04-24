import React from 'react';
import { Tabs, Form } from 'antd';
import { map, get } from 'lodash';
import MultipleInputWithLabel from '@/components/GeneralComponents/MultipleInputWithLabel';
import CheckboxWithInput from '@/components/GeneralComponents/CheckboxWithInput';
import { getFormDescriptionByModuleName } from '@/components/BaseModalForm/FormSection';

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

  async componentDidMount() {
    const formDesc = await getFormDescriptionByModuleName('foetalAppendage');
    console.log(formDesc);
  }

  onTabChange = () => {};

  onEdit = () => {};

  renderContent = () => {
    return (
      <div>
        <Form.Item name="胎盘完整性">
          {/* <CheckboxWithInput /> */}
        </Form.Item>
      </div>
    );
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
