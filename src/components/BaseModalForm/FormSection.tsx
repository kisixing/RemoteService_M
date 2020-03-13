import React, { Fragment } from 'react';
import { Input, InputNumber, Tabs, Form, Radio } from 'antd';
import { map, get, keyBy } from 'lodash';
import { Editor } from '@lianmed/components';
import { DataSelect } from '@lianmed/components';
import DeviceStatusSelect from '@/components/selects/DeviceStatusSelect';
import request from '@/utils/request';
import BaseTreeSelect from '@/components/selects/TreeSelect';

interface IProps {
  renderEditItem: (key: any, reactNode: any) => any;
  formDescriptions: {};
  id?: Number | String;
  data?: any;
}

interface IState {
  products: Array<any>;
}

export default class FormSection extends React.Component<IProps, IState> {
  state = {
    products: [],
  };

  async componentDidMount() {
    const products = await request.get('/products');
    this.setState({ products });
  }

  renderItem = (formDescription: any) => {
    const { renderEditItem, id, data } = this.props;
    const { products } = this.state;

    switch (get(formDescription, 'inputType')) {
      case 'id':
        return <span></span>;
      // return (
      //   id &&
      //   renderEditItem(
      //     get(formDescription, 'key'),
      //     <Input {...get(formDescription, 'inputProps')} />,
      //   )
      // );
      case 'subdevice_id':
        return (
          id &&
          renderEditItem(
            get(formDescription, 'key'),
            <Input {...get(formDescription, 'inputProps')} />,
          )
        );
      case 'radio':
        return renderEditItem(
          get(formDescription, 'key'),
          <Radio.Group>
            <Radio value={1}>是</Radio>
            <Radio value={0}>否</Radio>
          </Radio.Group>,
        );
      case 'input':
        return renderEditItem(
          get(formDescription, 'key'),
          <Input {...get(formDescription, 'inputProps')} />,
        );
      case 'text_area':
        return renderEditItem(
          get(formDescription, 'key'),
          <Input.TextArea {...get(formDescription, 'inputProps')} />,
        );
      case 'tree_select':
        return renderEditItem(
          get(formDescription, 'key'),
          <BaseTreeSelect {...get(formDescription, 'inputProps')} />,
        );
      case 'input_number':
        return renderEditItem(
          get(formDescription, 'key'),
          <InputNumber min={0} {...get(formDescription, 'inputProps')} />,
        );
      case 'validdate':
        return renderEditItem(
          get(formDescription, 'key'),
          <DataSelect
            dataSource={[
              { id: 30, name: '30天' },
              { id: 60, name: '60天' },
              { id: 90, name: '90天' },
              { id: 280, name: '一个孕周' },
            ]}
            valueKey="id"
            labelKey="name"
          />,
        );
      case 'editor':
        return renderEditItem(
          get(formDescription, 'key'),
          <Editor {...get(formDescription, 'inputProps')} />,
        );
      case 'product':
        return get(formDescription, 'viewOnly')
          ? renderEditItem(
              get(formDescription, 'key'),
              <span>
                {get(keyBy(products, 'id'), `${get(data, get(formDescription, 'path'))}.name`)}
              </span>,
            )
          : renderEditItem(
              get(formDescription, 'key'),
              <DataSelect
                url="/products"
                valueKey="id"
                labelKey="name"
                {...get(formDescription, 'inputProps')}
              />,
            );
      case 'roles':
        return renderEditItem(
          get(formDescription, 'key'),
          <DataSelect
            url="/groups"
            valueKey="id"
            labelKey="nickname"
            {...get(formDescription, 'inputProps')}
          />,
        );
      case 'device_status':
        return renderEditItem(
          get(formDescription, 'key'),
          <DeviceStatusSelect {...get(formDescription, 'inputProps')} />,
        );
      case 'view_only':
        return renderEditItem(
          get(formDescription, 'key'),
          <span>{get(data, get(formDescription, 'path'))}</span>,
        );
      default:
        return renderEditItem(
          get(formDescription, 'key'),
          <Input {...get(formDescription, 'inputProps')} />,
        );
    }
  };

  render() {
    const { formDescriptions } = this.props;
    return (
      <Fragment>
        {map(formDescriptions, (formDescription, index) => {
          if (get(formDescription, 'childs')) {
            return (
              <Form.Item key={index} label="部件信息" name="subdevice">
                <Tabs defaultActiveKey="1">
                  {map(get(formDescription, 'childs'), child => {
                    return (
                      <Tabs.TabPane
                        tab={get(child, 'tabTitle')}
                        key={get(child, 'key')}
                        forceRender
                      >
                        {map(get(child, 'formDescription'), childrenFormDescription => {
                          return this.renderItem(childrenFormDescription);
                        })}
                      </Tabs.TabPane>
                    );
                  })}
                </Tabs>
              </Form.Item>
            );
          }
          if (get(formDescription, 'isChild')) {
            return;
          }
          return this.renderItem(formDescription);
        })}
      </Fragment>
    );
  }
}
