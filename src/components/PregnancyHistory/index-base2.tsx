import React from 'react';
import { Tabs, Form, Input, Row, Col, Radio, InputNumber, Button, DatePicker, Divider, Select } from 'antd';
import { map, get, set, keyBy, isEmpty, isNil, filter, isFunction, toArray, cloneDeep, isEqual } from 'lodash';
import moment, { Moment } from 'moment';
import { DynamicForm } from '@lianmed/components';
import request from '@/utils/request';
import { formDescriptionsFromApi, formDescriptionsWithoutSectionApi } from '@/utils/adapter';
import PregnancyHistoryFormSection from './PregnancyHistoryFormSection';

export const fixedSelects = {
  // 分娩方式
  deliverWays: ['vaginalDelivery', 'cesareanSection', 'forceps', 'vacuumAssisted', 'breechMidwifery'],
  // 流产方式
  abortionWays: ['medicalAbortion', 'surgicalAbortion', 'naturalAbortion', 'currettage'],
  // 不良生育史
  badPregnancies: ['inducedLabor', 'fetusdeath', 'ectopicPregnancy', 'hydatidMole', 'multiple'],
};

const TAB_TITLE = '孕次';
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

interface IProps {
  value?: any;
  onChange?: any;
}

export default class PregnancyHistory extends DynamicForm {
  constructor(props: IProps) {
    super(props);
    this.newTabIndex = 1;
    this.state = {
      tabPanes: [],
      activeKey: undefined,
      pregnancyHistories: [],
      form: null,
      formData: {},
    };
  }

  nativeFormDescriptions = {};

  async componentDidMount() {
    const nativeFormDescriptions = formDescriptionsWithoutSectionApi(
      formDescriptionsFromApi(await request.get('/form-descriptions?moduleName=pregnantHistorySetting')),
    );

    this.nativeFormDescriptions = nativeFormDescriptions;
    setTimeout(() => {
      this.setState({
        form: this.formRef.current,
      });
    }, 100);
  }

  /**
   *
   * this.state.formData 作为重渲染的关键，form 中字段改变后，
   * 需要对比 formData 和 form.getFieldsValue()，如果不一致，
   * form.getFieldsValue() 再赋值一次给 this.state.formData
   */
  componentDidUpdate(prevProps, prevState) {
    const { form } = this.state;
    const { formData: prevFormData } = prevState;
    if (form) {
      if (!isEqual(prevFormData, form.getFieldsValue())) {
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({
          formData: form.getFieldsValue(),
        });
      }
    }
  }

  handleChange = activeKey => {
    this.setState({ activeKey });
  };

  handleEdit = (targetKey, action) => {
    this[action](targetKey);
  };

  add = () => {
    const { tabPanes, pregnancyHistories } = this.state;
    const activeKey = `${TAB_TITLE}${this.newTabIndex++}`;
    tabPanes.push({ title: activeKey, key: activeKey });
    this.setState({ tabPanes, activeKey, pregnancyHistories: [...pregnancyHistories, { key: activeKey }] });
  };

  remove = targetKey => {
    let { activeKey, tabPanes, pregnancyHistories } = this.state;
    const { onChange } = this.props;
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
    const newPregnancyHistories = filter(
      pregnancyHistories,
      pregnancyHistory => get(pregnancyHistory, 'key') !== targetKey,
    );
    onChange && onChange(newPregnancyHistories);
    this.setState({ tabPanes: panes, activeKey, pregnancyHistories: newPregnancyHistories });
  };

  saveSregnancyHistories = async () => {
    const { form, formData } = this.state;
    console.log(form.getFieldsValue());

    await form.validateFields();
  };

  // 设置表单数据
  setFormData = () => {
    const { form } = this.state;
    this.setState({
      formData: form.getFieldsValue(),
    });
  };

  renderChildrens = (index, formDescriptions) => {
    const { form, formData } = this.state;
    const childrens = [];
    const fetalcount = get(formData, `fetalcount_${index}`);
    let renderEditItem;
    const newFormDescriptions = {};

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < fetalcount; i++) {
      map(formDescriptions, (formDescription, formDescriptionKey) => {
        set(newFormDescriptions, `${formDescriptionKey}_${i}`, formDescription);
      });
      renderEditItem = this.generateRenderEditItem(newFormDescriptions);
      const temp = (
        <div>
          <Divider key={`fetalcount-${index + 1}`} orientation="left">
            <span style={{ fontSize: 12 }}>胎儿{i + 1}</span>
          </Divider>
          <Row>
            <Col
              span={get(this.nativeFormDescriptions, 'childDeath.span')}
              offset={get(this.nativeFormDescriptions, 'childDeath.offset')}
            >
              {renderEditItem(
                `childDeath_${index}_${i}`,
                <Radio.Group
                  size="small"
                  onChange={e => {
                    this.setFormData();
                  }}
                >
                  <Radio value={false}>健在</Radio>
                  <Radio value={true}>死亡</Radio>
                </Radio.Group>,
              )}
            </Col>
            {get(formData, `childDeath_${index}_${i}`) && (
              <Col
                span={get(this.nativeFormDescriptions, 'childDeathNote.span')}
                offset={get(this.nativeFormDescriptions, 'childDeathNote.offset')}
              >
                {renderEditItem(
                  `childDeathNote_${index}_${i}`,
                  <Input size="small" {...get(this.nativeFormDescriptions, 'childDeathNote.inputProps')} />,
                )}
              </Col>
            )}
          </Row>
          {get(formData, `childDeath_${index}_${i}`) === false && (
            <>
              <Row>
                <Col
                  span={get(this.nativeFormDescriptions, 'childGender.span')}
                  offset={get(this.nativeFormDescriptions, 'childGender.offset')}
                >
                  {renderEditItem(
                    `childGender_${index}_${i}`,
                    <Select size="small" {...get(this.nativeFormDescriptions, 'childGender.inputProps')}>
                      <Select.Option value={0}>男</Select.Option>
                      <Select.Option value={1}>女</Select.Option>
                      <Select.Option value={2}>未知</Select.Option>
                    </Select>,
                  )}
                </Col>
                <Col
                  span={get(this.nativeFormDescriptions, 'sequela.span')}
                  offset={get(this.nativeFormDescriptions, 'sequela.offset')}
                >
                  {renderEditItem(
                    `sequela_${index}_${i}`,
                    <Radio.Group size="small" {...get(this.nativeFormDescriptions, 'sequela.inputProps')}>
                      <Radio value={false}>无</Radio>
                      <Radio value={true}>有</Radio>
                    </Radio.Group>,
                  )}
                </Col>
                <Col
                  span={get(this.nativeFormDescriptions, 'childDeformity.span')}
                  offset={get(this.nativeFormDescriptions, 'childDeformity.offset')}
                >
                  {renderEditItem(
                    `childDeformity_${index}_${i}`,
                    <Radio.Group size="small" {...get(this.nativeFormDescriptions, 'childDeformity.inputProps')}>
                      <Radio value={false}>无</Radio>
                      <Radio value={true}>有</Radio>
                    </Radio.Group>,
                  )}
                </Col>
              </Row>
              <Row>
                <Col
                  span={get(this.nativeFormDescriptions, 'neonateWeight.span')}
                  offset={get(this.nativeFormDescriptions, 'neonateWeight.offset')}
                >
                  {renderEditItem(
                    `neonateWeight_${index}_${i}`,
                    <InputNumber
                      size="small"
                      min={0}
                      {...get(this.nativeFormDescriptions, 'neonateWeight.inputProps')}
                    />,
                  )}
                </Col>
                <Col
                  span={get(this.nativeFormDescriptions, 'neonateHeight.span')}
                  offset={get(this.nativeFormDescriptions, 'neonateHeight.offset')}
                >
                  {renderEditItem(
                    `neonateHeight_${index}_${i}`,
                    <InputNumber
                      size="small"
                      min={0}
                      {...get(this.nativeFormDescriptions, 'neonateHeight.inputProps')}
                    />,
                  )}
                </Col>
              </Row>
            </>
          )}
        </div>
      );
      childrens.push(temp);
    }
    return childrens;
  };

  renderTabContent = (key, index) => {
    const { formData, form } = this.state;
    const newFormDescriptions = {};
    map(cloneDeep(this.nativeFormDescriptions), (formDescription, formDescriptionKey) => {
      set(formDescription, 'key', `${formDescriptionKey}_${index}`);
      set(formDescription, 'native_key', formDescriptionKey);
      set(newFormDescriptions, `${formDescriptionKey}_${index}`, formDescription);
    });
    const renderEditItem = this.generateRenderEditItem(newFormDescriptions);
    return (
      <>
        {isFunction(renderEditItem) && (
          <PregnancyHistoryFormSection
            tabIndex={index}
            formData={formData}
            form={form}
            formDescriptions={toArray(newFormDescriptions)}
            events={{ setFormData: this.setFormData }}
            renderEditItem={renderEditItem}
          />
        )}
        {get(formData, `hasPregnancy_${index}`) && this.renderChildrens(index, newFormDescriptions)}
      </>
    );
  };

  render() {
    const { tabPanes, activeKey } = this.state;
    // const { form } = this.props;
    // console.log(form.getFieldsValue());
    return (
      <Form ref={this.formRef}>
        <div style={{ marginTop: 8, marginBottom: 8 }}>
          <Button onClick={this.add} size="small" type="default">
            添加孕产史信息
          </Button>
          <Button style={{ marginLeft: 8 }} onClick={this.saveSregnancyHistories} size="small" type="primary">
            保存孕产史信息
          </Button>
        </div>
        {!isEmpty(tabPanes) && (
          <Tabs
            type="editable-card"
            hideAdd
            onChange={this.handleChange}
            activeKey={activeKey}
            onEdit={this.handleEdit}
          >
            {map(tabPanes, (pane, index) => {
              return (
                <Tabs.TabPane key={get(pane, 'key')} tab={get(pane, 'title')}>
                  {this.renderTabContent(get(pane, 'key'), index)}
                </Tabs.TabPane>
              );
            })}
          </Tabs>
        )}
      </Form>
    );
  }
}
