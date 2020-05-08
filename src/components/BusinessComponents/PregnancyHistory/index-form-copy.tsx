import React from 'react';
import { Tabs, Input, Row, Col, Radio, InputNumber, Button, Divider, Select } from 'antd';
import { map, get, set, isEmpty, isFunction, toArray, cloneDeep, isEqual } from 'lodash';
import moment from 'moment';
import { DynamicForm } from '@lianmed/components';
import PregnancyHistoryFormSection from './PregnancyHistoryFormSection';
import { getPregnancyHistoryFormDescriptions } from '.';
import NormalSelect from '@/components/selects/NormalSelect';

const TAB_TITLE = '孕次';

interface IProps {
  value?: any;
  onChange?: any;
}

export default class PregnancyHistoryForm extends DynamicForm {
  constructor(props: IProps) {
    super(props);
    this.newTabIndex = 1;
    this.state = {
      tabPanes: [],
      activeKey: undefined,
      formData: {},
    };
  }

  nativeFormDescriptions = {};

  /**
   * 获取表单配置以及渲染数据
   */
  async componentDidMount() {
    const { value: pregnancyHistories, form } = this.props;
    const nativeFormDescriptions = await getPregnancyHistoryFormDescriptions();

    this.nativeFormDescriptions = nativeFormDescriptions;

    // 渲染数据
    if (!isEmpty(pregnancyHistories)) {
      const tabPanes: any = [];
      map(pregnancyHistories, (pregnancyHistory, index) => {
        const activeKey = `${TAB_TITLE}${this.newTabIndex++}`;
        tabPanes.push({ title: activeKey, key: activeKey });

        form.setFieldsValue({
          [`pregnancyEnd_${index}`]: moment(get(pregnancyHistory, 'pregnancyEnd')),
          [`complicationNote_${index}`]: get(pregnancyHistory, 'complicationNote'),
          [`hasPregnancy_${index}`]: get(pregnancyHistory, 'hasPregnancy'),
          [`hospital_${index}`]: get(pregnancyHistory, 'hospital'),
          [`fetalcount_${index}`]: get(pregnancyHistory, 'fetalcount'),
          [`gestationalWeek_${index}`]: get(pregnancyHistory, 'gestationalWeek'),
          [`deliverWay_${index}`]: get(pregnancyHistory, 'deliverWay'),
          [`puerperalFever_${index}`]: get(pregnancyHistory, 'puerperalFever'),
          [`hemorrhage_${index}`]: get(pregnancyHistory, 'hemorrhage'),
          [`abortionWay_${index}`]: get(pregnancyHistory, 'abortionWay'),
          [`badPregnancy_${index}`]: get(pregnancyHistory, 'badPregnancy'),
        });
        map(get(pregnancyHistory, 'children'), (children, i) => {
          form.setFieldsValue({
            [`childDeath_${index}_${i}`]: get(children, 'childDeath'),
            [`childDeathNote_${index}_${i}`]: get(children, 'childDeathNote'),
            [`childGender_${index}_${i}`]: get(children, 'childGender'),
            [`sequela_${index}_${i}`]: get(children, 'sequela'),
            [`childDeformity_${index}_${i}`]: get(children, 'childDeformity'),
            [`neonateWeight_${index}_${i}`]: get(children, 'neonateWeight'),
            [`neonateHeight_${index}_${i}`]: get(children, 'neonateHeight'),
          });
        });
      });
      this.setState({
        tabPanes,
        activeKey: isEmpty(tabPanes) ? undefined : get(tabPanes, '0.key'),
      });
    }
  }

  /**
   *
   * this.state.formData 作为重渲染的关键，form 中字段改变后，
   * 需要对比 formData 和 form.getFieldsValue()，如果不一致，
   * form.getFieldsValue() 再赋值一次给 this.state.formData
   */
  componentDidUpdate(prevProps, prevState) {
    const { form } = this.props;
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

  // 改变 active Tab
  handleChange = activeKey => {
    this.setState({ activeKey });
  };

  // 更新 tab
  handleEdit = (targetKey, action) => {
    this[action](targetKey);
  };

  // 添加 tab
  add = () => {
    const { tabPanes } = this.state;
    const activeKey = `${TAB_TITLE}${this.newTabIndex++}`;
    tabPanes.push({ title: activeKey, key: activeKey });
    this.setState({ tabPanes, activeKey });
  };

  // 删除 tab
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
    this.setState({ tabPanes: panes, activeKey });
  };

  // 设置表单数据
  setFormData = () => {
    const { form } = this.props;
    this.setState({
      formData: form.getFieldsValue(),
    });
  };

  // 渲染胎儿信息
  renderChildrens = (index, formDescriptions) => {
    const { formData } = this.state;
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
                { customFormItemLayout: get(this.nativeFormDescriptions, 'childDeath.formItemLayout') || {} },
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
                  { customFormItemLayout: get(this.nativeFormDescriptions, 'childDeathNote.formItemLayout') || {} },
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
                    <NormalSelect
                      type="genderMapping"
                      {...get(this.nativeFormDescriptions, 'childGender.inputProps')}
                    />,
                    { customFormItemLayout: get(this.nativeFormDescriptions, 'childGender.formItemLayout') || {} },
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
                    { customFormItemLayout: get(this.nativeFormDescriptions, 'sequela.formItemLayout') || {} },
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
                    { customFormItemLayout: get(this.nativeFormDescriptions, 'childDeformity.formItemLayout') || {} },
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
                    { customFormItemLayout: get(this.nativeFormDescriptions, 'neonateWeight.formItemLayout') || {} },
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
                    { customFormItemLayout: get(this.nativeFormDescriptions, 'neonateHeight.formItemLayout') || {} },
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

  // 渲染孕次
  renderTabContent = (key, index) => {
    const { formData } = this.state;
    const { form } = this.props;
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
    return (
      <>
        <div style={{ marginTop: 8, marginBottom: 8 }}>
          <Button onClick={this.add} size="small" type="default">
            添加孕产史信息
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
                <Tabs.TabPane forceRender key={get(pane, 'key')} tab={get(pane, 'title')}>
                  {this.renderTabContent(get(pane, 'key'), index)}
                </Tabs.TabPane>
              );
            })}
          </Tabs>
        )}
      </>
    );
  }
}
