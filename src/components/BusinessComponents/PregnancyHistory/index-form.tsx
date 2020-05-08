import React from 'react';
import { Input, Row, Col, Radio, InputNumber, Button, Divider, Form } from 'antd';
import { map, get, set, isEmpty, isFunction, toArray, isArray, isNil, filter, indexOf, keyBy } from 'lodash';
import PregnancyHistoryFormSection from './PregnancyHistoryFormSection';
import { getPregnancyHistoryFormDescriptions } from '.';
import NormalSelect from '@/components/selects/NormalSelect';
import { MinusCircleOutlined } from '@ant-design/icons';
import styles from './index.less';

// 默认展示字段
const defaultFormFields = ['pregnancyEnd', 'complicationNote', 'hasPregnancy'];

// 已分娩字段
const hasPregnancyFormFields = [
  'hospital',
  'gestationalWeek',
  'fetalcount',
  'deliverWay',
  'puerperalFever',
  'hemorrhage',
];

// 未分娩字段
const noPregnancyFormFields = ['abortionWay', 'badPregnancy'];

// 胎数大于0 默认字段
const fetalcountLgZeroDefaultFormFields = ['childDeath'];

// 胎数大于0 孩子死亡展示字段
const fetalcountLgZeroChildDeathFormFields = ['childDeathNote'];

// 胎数大于0 孩子存活展示字段
const fetalcountLgZeroChildLiveFormFields = [
  'childGender',
  'sequela',
  'childDeformity',
  'neonateWeight',
  'neonateHeight',
];

export const horizontalFormItemLayout = {
  labelCol: {
    span: 12,
  },
  wrapperCol: {
    span: 12,
  },
};

export default class PregnancyHistoryForm extends React.Component {
  newTabIndex: number = 1;

  nativeFormDescriptions: object = {};

  state = {
    formDescriptionsArray: [] as any[],
    fetalcountArray: [],
  };

  /**
   * 获取表单配置以及渲染数据
   */
  async componentDidMount() {
    const { value: pregnancyHistories } = this.props;
    const nativeFormDescriptions = await getPregnancyHistoryFormDescriptions();
    this.nativeFormDescriptions = nativeFormDescriptions;
    let formDescriptionsArray: any[] = [];
    const fetalcountArray: any[] = [];

    // 渲染数据
    if (!isEmpty(pregnancyHistories)) {
      // 渲染表单配置
      map(pregnancyHistories, (pregnancyHistory, index) => {
        let tempFieldsArray = defaultFormFields;
        const fetalcount = get(pregnancyHistory, 'fetalcount');
        const hasPregnancy = !isNil(fetalcount) && !isNil(get(pregnancyHistory, 'hospital'));
        if (hasPregnancy) {
          tempFieldsArray = [...tempFieldsArray, ...hasPregnancyFormFields];
        } else {
          tempFieldsArray = [...tempFieldsArray, ...noPregnancyFormFields];
        }
        if (fetalcount > 0) {
          set(fetalcountArray, index, fetalcount);
        }
        formDescriptionsArray.push(this.getFormDescriptions(tempFieldsArray));
      });
    } else {
      formDescriptionsArray = [this.getFormDescriptions()];
    }
    this.setState({
      formDescriptionsArray,
      fetalcountArray,
    });
  }

  generateRenderEditItem = (formDescriptions: any, { formItemLayout = horizontalFormItemLayout, isBind = true }) => {
    return (key: any, reactNode: React.ReactNode, others: object = {}) => {
      const config = isArray(key) ? get(formDescriptions, get(key, 1)) : get(formDescriptions, key);
      const { label, rules } = config;
      const bindProps = isBind ? { name: key } : {};
      return (
        <Form.Item
          {...formItemLayout}
          {...get(others, 'customFormItemLayout')}
          style={{ ...get(others, 'styles') }}
          key={key}
          label={label}
          rules={rules}
          {...bindProps}
        >
          {reactNode}
        </Form.Item>
      );
    };
  };

  // 设置表单数据
  setFormChildrenData = (pregnancyIndex: any, childIndex: any, type: string) => async (e: any) => {
    const { form } = this.props;
    const pregnancyHistories = form.getFieldValue('pregnancyHistories');
    switch (type) {
      case 'childGender':
      case 'neonateHeight':
      case 'neonateWeight':
        set(pregnancyHistories, `${pregnancyIndex}.children.${childIndex}.${type}`, e);
        break;
      default:
        set(pregnancyHistories, `${pregnancyIndex}.children.${childIndex}.${type}`, get(e, 'target.value'));
        break;
    }
    await form.setFieldsValue({
      pregnancyHistories,
    });
  };

  // 渲染胎儿信息
  renderChildrens = (index: any, fetalcount: number) => {
    const { form } = this.props;
    const pregnancyHistories = form.getFieldValue('pregnancyHistories');
    const childrens = [];
    const renderEditItem = this.generateRenderEditItem(this.nativeFormDescriptions, { isBind: false });
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < fetalcount; i++) {
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
                'childDeath',
                <Radio.Group
                  size="small"
                  value={get(pregnancyHistories, `${index}.children.${i}.childDeath`)}
                  onChange={this.setFormChildrenData(index, i, 'childDeath')}
                >
                  <Radio value={false}>健在</Radio>
                  <Radio value={true}>死亡</Radio>
                </Radio.Group>,
                { customFormItemLayout: get(this.nativeFormDescriptions, 'childDeath.formItemLayout') || {} },
              )}
            </Col>
            {get(pregnancyHistories, `${index}.children.${i}.childDeath`) === true && (
              <Col
                span={get(this.nativeFormDescriptions, 'childDeathNote.span')}
                offset={get(this.nativeFormDescriptions, 'childDeathNote.offset')}
              >
                {renderEditItem(
                  'childDeathNote',
                  <Input
                    size="small"
                    value={get(pregnancyHistories, `${index}.children.${i}.childDeathNote`)}
                    {...get(this.nativeFormDescriptions, 'childDeathNote.inputProps')}
                    onChange={this.setFormChildrenData(index, i, 'childDeathNote')}
                  />,
                  { customFormItemLayout: get(this.nativeFormDescriptions, 'childDeathNote.formItemLayout') || {} },
                )}
              </Col>
            )}
          </Row>
          {get(pregnancyHistories, `${index}.children.${i}.childDeath`) === false && (
            <>
              <Row>
                <Col
                  span={get(this.nativeFormDescriptions, 'childGender.span')}
                  offset={get(this.nativeFormDescriptions, 'childGender.offset')}
                >
                  {renderEditItem(
                    'childGender',
                    <NormalSelect
                      type="genderMapping"
                      value={get(pregnancyHistories, `${index}.children.${i}.childGender`)}
                      {...get(this.nativeFormDescriptions, 'childGender.inputProps')}
                      onChange={this.setFormChildrenData(index, i, 'childGender')}
                    />,
                    { customFormItemLayout: get(this.nativeFormDescriptions, 'childGender.formItemLayout') || {} },
                  )}
                </Col>
                <Col
                  span={get(this.nativeFormDescriptions, 'sequela.span')}
                  offset={get(this.nativeFormDescriptions, 'sequela.offset')}
                >
                  {renderEditItem(
                    'sequela',
                    <Radio.Group
                      size="small"
                      value={get(pregnancyHistories, `${index}.children.${i}.sequela`)}
                      {...get(this.nativeFormDescriptions, 'sequela.inputProps')}
                      onChange={this.setFormChildrenData(index, i, 'sequela')}
                    >
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
                    'childDeformity',
                    <Radio.Group
                      size="small"
                      value={get(pregnancyHistories, `${index}.children.${i}.childDeformity`)}
                      {...get(this.nativeFormDescriptions, 'childDeformity.inputProps')}
                      onChange={this.setFormChildrenData(index, i, 'childDeformity')}
                    >
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
                    'neonateWeight',
                    <InputNumber
                      size="small"
                      min={0}
                      value={get(pregnancyHistories, `${index}.children.${i}.neonateWeight`)}
                      {...get(this.nativeFormDescriptions, 'neonateWeight.inputProps')}
                      onChange={this.setFormChildrenData(index, i, 'neonateWeight')}
                    />,
                    { customFormItemLayout: get(this.nativeFormDescriptions, 'neonateWeight.formItemLayout') || {} },
                  )}
                </Col>
                <Col
                  span={get(this.nativeFormDescriptions, 'neonateHeight.span')}
                  offset={get(this.nativeFormDescriptions, 'neonateHeight.offset')}
                >
                  {renderEditItem(
                    'neonateHeight',
                    <InputNumber
                      size="small"
                      min={0}
                      value={get(pregnancyHistories, `${index}.children.${i}.neonateHeight`)}
                      {...get(this.nativeFormDescriptions, 'neonateHeight.inputProps')}
                      onChange={this.setFormChildrenData(index, i, 'neonateHeight')}
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

  handleAddPregnancy = (add: () => void) => () => {
    const { formDescriptionsArray } = this.state;
    formDescriptionsArray.push(this.getFormDescriptions());
    add();
    this.setState({
      formDescriptionsArray,
    });
  };

  handleRemovePregnancy = (remove: (index: number) => void, field: any) => () => {
    remove(field.name);
  };

  getFormDescriptions = (formFields: string[] = defaultFormFields) =>
    keyBy(
      filter(this.nativeFormDescriptions, (formDescription, key) => indexOf(formFields, key) > -1),
      'key',
    );

  updateFormDescriptions = (type: string, field: any) => (e: any) => {
    const { formDescriptionsArray, fetalcountArray } = this.state;
    const { form } = this.props;
    const key = get(field, 'key');
    switch (type) {
      case 'has_pregnancy':
        if (get(e, 'target.value')) {
          const fetalcount = get(form.getFieldValue('pregnancyHistories'), `${key}.fetalcount`);
          set(fetalcountArray, key, fetalcount);
          set(formDescriptionsArray, key, this.getFormDescriptions([...defaultFormFields, ...hasPregnancyFormFields]));
        } else {
          set(fetalcountArray, key, 0);
          set(formDescriptionsArray, key, this.getFormDescriptions([...defaultFormFields, ...noPregnancyFormFields]));
        }
        break;
      case 'fetal_count':
        set(fetalcountArray, key, e);
        break;
      default:
        set(formDescriptionsArray, key, this.getFormDescriptions());
        break;
    }
    this.setState({
      formDescriptionsArray,
      fetalcountArray,
    });
  };

  renderPregnancyContent = (field: any, formDescriptions: object) => {
    const { fetalcountArray } = this.state;
    const fetalcount = get(fetalcountArray, get(field, 'key'));
    const renderEditItem = this.generateRenderEditItem(formDescriptions, {});
    return (
      <div>
        {isFunction(renderEditItem) && (
          <PregnancyHistoryFormSection
            formDescriptions={toArray(formDescriptions)}
            field={field}
            events={{ updateFormDescriptions: this.updateFormDescriptions }}
            renderEditItem={renderEditItem}
          />
        )}
        {fetalcount > 0 && this.renderChildrens(get(field, 'key'), fetalcount)}
      </div>
    );
  };

  render() {
    const { formDescriptionsArray } = this.state;
    return (
      <Form.List name="pregnancyHistories">
        {(fields, { add, remove }) => {
          return (
            <div>
              <div style={{ marginTop: 8, marginBottom: 8 }}>
                <Button onClick={this.handleAddPregnancy(add)} size="small" type="default">
                  添加孕产史信息
                </Button>
              </div>
              {map(fields, (field, index) => {
                return (
                  <Row className={styles.indexFormPregnancy}>
                    <Col span={23}>
                      <Divider orientation="left">
                        <span style={{ fontSize: 14 }}>孕次{index + 1}</span>
                      </Divider>
                      {this.renderPregnancyContent(field, get(formDescriptionsArray, field.key))}
                    </Col>
                    <Col span={1} className={styles.indexFormDeleteIconBlock}>
                      <MinusCircleOutlined
                        className={styles.indexFormDeleteIcon}
                        onClick={this.handleRemovePregnancy(remove, field)}
                      />
                    </Col>
                  </Row>
                );
              })}
            </div>
          );
        }}
      </Form.List>
    );
  }
}
