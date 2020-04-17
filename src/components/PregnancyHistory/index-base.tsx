import React from 'react';
import { Tabs, Form, Input, Row, Col, Radio, InputNumber, Button, DatePicker, Divider, Select } from 'antd';
import { map, get, set, keyBy, isEmpty, isNil, filter } from 'lodash';
import moment, { Moment } from 'moment';

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

export default class PregnancyHistory extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
    this.newTabIndex = 1;
    this.state = {
      tabPanes: [],
      activeKey: undefined,
      pregnancyHistories: [],
    };
  }

  componentDidMount() {
    const { value: pregnancyHistories } = this.props;

    if (!isEmpty(pregnancyHistories)) {
      const tabPanes = map(pregnancyHistories, (pregnancyHistory, index) => {
        const activeKey = `${TAB_TITLE}${index + 1}`;
        set(pregnancyHistory, 'key', activeKey);
        return {
          title: activeKey,
          key: activeKey,
        };
      });
      this.newTabIndex = tabPanes.length + 1;

      this.setState({
        pregnancyHistories,
        activeKey: isEmpty(tabPanes) ? undefined : tabPanes[0].key,
        tabPanes,
      });
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

  handleUpdatePregnancy = (key, name, others = {}) => e => {
    const { onChange } = this.props;
    const { pregnancyHistories } = this.state;
    const { index } = others;
    let newPregnancyHistories = [];
    switch (name) {
      case 'badPregnancy':
        newPregnancyHistories = map(pregnancyHistories, history => {
          if (history.key === key) {
            map(e, item => {
              set(history, item, true);
            });
            set(history, name, e);
          }
          return history;
        });
        break;
      case 'abortionWay':
      case 'deliverWay':
        newPregnancyHistories = map(pregnancyHistories, history => {
          map(get(fixedSelects, `${name}s`), item => {
            set(history, item, false);
          });
          if (history.key === key) {
            set(history, e, true);
            set(history, name, e);
          }
          return history;
        });
        break;

      case 'puerperalFever':
      case 'hemorrhage':
      case 'gestationalWeek':
      case 'hospital':
        newPregnancyHistories = map(pregnancyHistories, history => {
          if (history.key === key) {
            map(e, item => {
              set(history, name, get(e, 'target.value'));
            });
          }
          return history;
        });
        break;
      case 'pregnancyEnd':
        newPregnancyHistories = map(pregnancyHistories, history => {
          if (history.key === key) {
            set(history, 'year', (e as Moment).year());
            set(history, 'month', (e as Moment).month() + 1);
            set(history, 'pregnancyEnd', (e as Moment).format('YYYY-MM'));
          }
          return history;
        });
        break;
      case 'hasPregnancy':
        newPregnancyHistories = map(pregnancyHistories, history => {
          if (history.key === key) {
            set(history, 'hasPregnancy', get(e, 'target.value'));
            get(e, 'target.value') === false && set(history, 'fetalcount', 0);
          }
          return history;
        });
        break;
      case 'fetalcount':
        newPregnancyHistories = map(pregnancyHistories, history => {
          if (history.key === key) {
            set(history, 'fetalcount', e);
          }
          return history;
        });
        break;
      case 'neonateWeight':
      case 'neonateHeight':
      case 'childGender':
        newPregnancyHistories = map(pregnancyHistories, history => {
          if (history.key === key) {
            set(history, `children.${index}.${name}`, e);
          }
          return history;
        });
        break;
      case 'sequela':
      case 'childDeformity':
      case 'childDeath':
      case 'childDeathNote':
        newPregnancyHistories = map(pregnancyHistories, history => {
          if (history.key === key) {
            set(history, `children.${index}.${name}`, get(e, 'target.value'));
          }
          return history;
        });
        break;
      default:
        newPregnancyHistories = map(pregnancyHistories, history => {
          if (history.key === key) {
            set(history, name, get(e, 'target.value'));
          }
          return history;
        });
        break;
    }

    this.setState({
      pregnancyHistories: newPregnancyHistories,
    });
    onChange && onChange(newPregnancyHistories);
  };

  renderCondition = (key, pregnancyHistory) => {
    const { required } = this.props;
    if (get(pregnancyHistory, 'hasPregnancy')) {
      return (
        <>
          <Row>
            <Col span={7}>
              <Form.Item {...layout} label="分娩医院" required={required}>
                <Input
                  size="small"
                  placeholder="请输入分娩医院"
                  onChange={this.handleUpdatePregnancy(key, 'hospital')}
                  value={get(pregnancyHistory, 'hospital')}
                />
              </Form.Item>
            </Col>
            <Col span={7} offset={1}>
              <Form.Item {...layout} label="分娩孕周" required={required}>
                <Input
                  size="small"
                  placeholder="请输入分娩孕周"
                  onChange={this.handleUpdatePregnancy(key, 'gestationalWeek')}
                  value={get(pregnancyHistory, 'gestationalWeek')}
                />
              </Form.Item>
            </Col>
            <Col span={7} offset={1}>
              <Form.Item {...layout} label="胎数" required={required}>
                <InputNumber
                  size="small"
                  placeholder="请输入胎数"
                  onChange={this.handleUpdatePregnancy(key, 'fetalcount')}
                  value={get(pregnancyHistory, 'fetalcount')}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={7}>
              <Form.Item {...layout} label="分娩方式" required={required}>
                <Select
                  size="small"
                  placeholder="请选择分娩方式"
                  onChange={this.handleUpdatePregnancy(key, 'deliverWay')}
                  value={get(pregnancyHistory, 'deliverWay')}
                >
                  {/* <Select.Option value="term">足月产</Select.Option> */}
                  <Select.Option value="vaginalDelivery">顺产</Select.Option>
                  <Select.Option value="cesareanSection">剖宫产</Select.Option>
                  <Select.Option value="forceps">钳产</Select.Option>
                  <Select.Option value="vacuumAssisted">吸引产</Select.Option>
                  <Select.Option value="breechMidwifery">臀助产</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={7} offset={1}>
              <Form.Item {...layout} label="产溽热" required={required}>
                <Radio.Group
                  size="small"
                  onChange={this.handleUpdatePregnancy(key, 'puerperalFever')}
                  value={get(pregnancyHistory, 'puerperalFever')}
                >
                  <Radio value={true}>是</Radio>
                  <Radio value={false}>否</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={7} offset={1}>
              <Form.Item {...layout} label="产后出血" required={required}>
                <Radio.Group
                  size="small"
                  onChange={this.handleUpdatePregnancy(key, 'hemorrhage')}
                  value={get(pregnancyHistory, 'hemorrhage')}
                >
                  <Radio value={true}>是</Radio>
                  <Radio value={false}>否</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
        </>
      );
    }
    if (!isNil(get(pregnancyHistory, 'hasPregnancy'))) {
      return (
        <Row>
          <Col span={7}>
            <Form.Item {...layout} label="流产方式" required={required}>
              <Select
                size="small"
                placeholder="请选择流产方式"
                onChange={this.handleUpdatePregnancy(key, 'abortionWay')}
                value={get(pregnancyHistory, 'abortionWay')}
              >
                <Select.Option value="medicalAbortion">药物流产</Select.Option>
                <Select.Option value="surgicalAbortion">手术流产</Select.Option>
                <Select.Option value="naturalAbortion">自然流产</Select.Option>
                <Select.Option value="currettage">清宫</Select.Option>
                {/* <Select.Option value="inducedLabor">引产</Select.Option> */}
              </Select>
            </Form.Item>
          </Col>
          <Col span={7} offset={1}>
            <Form.Item {...layout} label="不良生育史" required={required}>
              <Select
                size="small"
                placeholder="请选择不良生育史"
                onChange={this.handleUpdatePregnancy(key, 'badPregnancy')}
                value={get(pregnancyHistory, 'badPregnancy')}
                mode="multiple"
              >
                <Select.Option value="inducedLabor">死产</Select.Option>
                <Select.Option value="fetusdeath">死胎</Select.Option>
                <Select.Option value="ectopicPregnancy">异位妊娠</Select.Option>
                <Select.Option value="hydatidMole">葡萄胎</Select.Option>
                <Select.Option value="multiple">多胎妊娠</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
      );
    }

    return <></>;
  };

  renderChildrens = (key, pregnancyHistory) => {
    const childrens = [];

    for (let index = 0; index < get(pregnancyHistory, 'fetalcount'); index++) {
      const temp = (
        <div>
          <Divider key={`fetalcount-${index + 1}`} orientation="left">
            <span style={{ fontSize: 12 }}>胎儿{index + 1}</span>
          </Divider>
          <Row>
            <Col span={7}>
              <Form.Item {...layout} label="新生儿当前情况">
                <Radio.Group
                  size="small"
                  onChange={this.handleUpdatePregnancy(key, 'childDeath', { index })}
                  value={get(pregnancyHistory, `children.${index}.childDeath`)}
                >
                  <Radio value={false}>健在</Radio>
                  <Radio value={true}>死亡</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            {get(pregnancyHistory, `children.${index}.childDeath`) && (
              <Col span={7} offset={1}>
                <Form.Item {...layout} label="死亡原因">
                  <Input
                    size="small"
                    placeholder="请输入死亡原因"
                    onChange={this.handleUpdatePregnancy(key, 'childDeathNote', { index })}
                    value={get(pregnancyHistory, `children.${index}.childDeathNote`)}
                  />
                </Form.Item>
              </Col>
            )}
          </Row>
          {!get(pregnancyHistory, `children.${index}.childDeath`) && (
            <>
              <Row>
                <Col span={7}>
                  <Form.Item {...layout} label="性别">
                    <Select
                      size="small"
                      placeholder="请选择新生儿性别"
                      onChange={this.handleUpdatePregnancy(key, 'childGender', { index })}
                      value={get(pregnancyHistory, `children.${index}.childGender`)}
                    >
                      <Select.Option value={0}>男</Select.Option>
                      <Select.Option value={1}>女</Select.Option>
                      <Select.Option value={2}>未知</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={7} offset={1}>
                  <Form.Item {...layout} label="后遗症">
                    <Radio.Group
                      size="small"
                      onChange={this.handleUpdatePregnancy(key, 'sequela', { index })}
                      value={get(pregnancyHistory, `children.${index}.sequela`)}
                    >
                      <Radio value={false}>无</Radio>
                      <Radio value={true}>有</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Col>
                <Col span={7} offset={1}>
                  <Form.Item {...layout} label="畸形">
                    <Radio.Group
                      size="small"
                      onChange={this.handleUpdatePregnancy(key, 'childDeformity', { index })}
                      value={get(pregnancyHistory, `children.${index}.childDeformity`)}
                    >
                      <Radio value={false}>无</Radio>
                      <Radio value={true}>有</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={7}>
                  <Form.Item {...layout} label="出生体重(kg)">
                    <InputNumber
                      size="small"
                      placeholder="请输入出生体重(kg)"
                      onChange={this.handleUpdatePregnancy(key, 'neonateWeight', { index })}
                      value={get(pregnancyHistory, `children.${index}.neonateWeight`)}
                    />
                  </Form.Item>
                </Col>
                <Col span={7} offset={1}>
                  <Form.Item {...layout} label="出生身长(cm)">
                    <InputNumber
                      size="small"
                      placeholder="请输入出生身长(cm)"
                      onChange={this.handleUpdatePregnancy(key, 'neonateHeight', { index })}
                      value={get(pregnancyHistory, `children.${index}.neonateHeight`)}
                    />
                  </Form.Item>
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

  renderTabContent = key => {
    const { pregnancyHistories } = this.state;
    const { required, rules } = this.props;
    const pregnancyHistory = get(keyBy(pregnancyHistories, 'key'), key);
    return (
      <>
        <Row>
          <Col span={7}>
            <Form.Item {...layout} label="妊娠终止时间" required={required}>
              <DatePicker
                size="small"
                placeholder="请输入妊娠终止时间"
                picker="month"
                onChange={this.handleUpdatePregnancy(key, 'pregnancyEnd')}
                value={get(pregnancyHistory, 'pregnancyEnd') ? moment(get(pregnancyHistory, 'pregnancyEnd')) : null}
              />
            </Form.Item>
          </Col>
          <Col span={7} offset={1}>
            <Form.Item {...layout} label="并发症" required={required}>
              <Input
                size="small"
                placeholder="请输入并发症(可多选)"
                onChange={this.handleUpdatePregnancy(key, 'complicationNote')}
                value={get(pregnancyHistory, 'complicationNote')}
              />
            </Form.Item>
          </Col>
          <Col span={7} offset={1}>
            <Form.Item {...layout} label="是否分娩" required={required}>
              <Radio.Group
                size="small"
                onChange={this.handleUpdatePregnancy(key, 'hasPregnancy')}
                value={get(pregnancyHistory, 'hasPregnancy')}
              >
                <Radio value={true}>是</Radio>
                <Radio value={false}>否</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>
        {this.renderCondition(key, pregnancyHistory)}
        {this.renderChildrens(key, pregnancyHistory)}
      </>
    );
  };

  render() {
    const { tabPanes, activeKey } = this.state;
    return (
      <>
        <div style={{ marginTop: 8, marginBottom: 8 }}>
          <Button onClick={this.add} size="small" type="primary">
            添加孕产史信息
          </Button>
        </div>
        {!isEmpty(tabPanes) && (
          <Tabs
            type="editable-card"
            size="small"
            hideAdd
            onChange={this.handleChange}
            activeKey={activeKey}
            onEdit={this.handleEdit}
          >
            {map(tabPanes, (pane, index) => {
              return (
                <Tabs.TabPane key={get(pane, 'key')} tab={get(pane, 'title')}>
                  {this.renderTabContent(get(pane, 'key'))}
                </Tabs.TabPane>
              );
            })}
          </Tabs>
        )}
      </>
    );
  }
}
