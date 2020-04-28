import React from 'react';
import { Tabs, Form, Divider, Button } from 'antd';
import { MinusCircleOutlined } from '@ant-design/icons';
import { map, get, cloneDeep, set, filter, split, isFunction, isEmpty } from 'lodash';
import { getFormDescriptionByModuleName } from '@/components/BaseModalForm/FormSection';
import FoetalAppendageFormSection from './FoetalAppendageFormSection';
import { DynamicForm } from '@lianmed/components';
import { fromApi, toApi } from './config';
import styles from './index.less';

const TAB_TITLE = '胎儿';
// 胎儿附属物
export default class FoetalAppendage extends DynamicForm {
  constructor(props: any) {
    super(props);
    const data: any = [
      {
        key: '0',
      },
    ];
    this.state = {
      form: {},
      data,
    };
    this.index = 0;
    this.nativeFormDescriptions = {};
  }

  async componentDidMount() {
    const { value } = this.props;
    const data: any = [];
    this.nativeFormDescriptions = await getFormDescriptionByModuleName('foetalAppendage');
    let result: any = [{}];
    if (!isEmpty(value)) {
      result = fromApi(value, this.nativeFormDescriptions);
    }
    map(result, (item, i) => {
      this.index = i;
      data.push({
        key: `${i}`,
        ...item,
      });
    });
    this.formRef.current && this.formRef.current.setFieldsValue(this.transferDataToForm(data));
    this.throwDataByOnChange(data);
    this.setState({
      form: this.formRef.current,
      data,
    });
  }

  transferDataToForm = (data: any) => {
    const tempData = {};
    map(data, (item, index) => {
      map(item, (value, key) => {
        set(tempData, `${key}_${index}`, value);
      });
    });
    return tempData;
  };

  handleAddFetus = () => {
    const { data } = this.state;
    this.index += 1;
    data.push({
      key: `${this.index}`,
    });
    this.setState({
      data,
    });
  };

  handleRemoveFetus = ({ key }: any) => () => {
    const { data } = this.state;
    const newData = filter(data, item => {
      return item.key !== key;
    });

    this.setState({
      data: newData,
    });
    this.throwDataByOnChange(newData);
  };

  // 获取表单数据
  handleFieldsChange = (changedFields: any[], allFields: any[]) => {
    const { data } = this.state;
    let keys: any = [];
    map(allFields, (field: any) => {
      const names = split(get(field, 'name.0'), '_');
      keys.push(get(names, '1'));
    });
    keys = Array.from(new Set(keys));
    map(keys, (key, index) => {
      set(data, `${index}.key`, key);
      map(allFields, (field: any) => {
        const names = split(get(field, 'name.0'), '_');
        if (get(names, '1') === key) {
          set(data, `${index}.${get(names, '0')}`, get(field, 'value'));
        }
      });
    });
    this.throwDataByOnChange(data);
  };

  throwDataByOnChange = (data: any) => {
    const { onChange } = this.props;
    onChange && onChange(toApi(data, this.nativeFormDescriptions));
  };

  renderContent = (item: any, index: any) => {
    const newFormDescriptions = {};
    map(cloneDeep(this.nativeFormDescriptions), (formDescription, formDescriptionKey) => {
      set(formDescription, 'key', `${formDescriptionKey}_${item.key}`);
      set(formDescription, 'native_key', formDescriptionKey);
      set(newFormDescriptions, `${formDescriptionKey}_${item.key}`, formDescription);
    });
    const renderEditItem = this.generateRenderEditItem(newFormDescriptions);
    return (
      <div className={styles.foetalPanel}>
        <div className={styles.foetalPanelContent}>
          <Divider orientation="left">
            <span style={{ fontSize: 12 }}>
              {TAB_TITLE}
              {index + 1}
            </span>
          </Divider>
          <FoetalAppendageFormSection formDescriptions={newFormDescriptions} renderEditItem={renderEditItem} />
        </div>
        <div className={styles.foetalPanelDelete} title="删除" onClick={this.handleRemoveFetus(item)}>
          <MinusCircleOutlined />
        </div>
      </div>
    );
  };

  render() {
    const { data } = this.state;
    return (
      <Form ref={this.formRef} onFieldsChange={this.handleFieldsChange}>
        <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
          <Button size="small" type="primary" onClick={this.handleAddFetus}>
            添加{TAB_TITLE}
          </Button>
        </div>
        {map(data, (item, index) => this.renderContent(item, index))}
      </Form>
    );
  }
}
