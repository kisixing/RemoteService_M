import React, { useEffect, useState } from 'react';
import { Row, Col, Radio, Form, InputNumber, Divider } from 'antd';
import { map, isEmpty, get, set } from 'lodash';

const scoreHeaderData = [
  {
    span: 2,
    offset: 0,
    title: '',
    name: '',
  },
  {
    span: 3,
    offset: 1,
    title: '呼吸',
    name: 'breath',
  },
  {
    span: 3,
    offset: 0,
    title: '心率',
    name: 'heartRate',
  },
  {
    span: 3,
    offset: 0,
    title: '肌张力',
    name: 'tension',
  },
  {
    span: 3,
    offset: 0,
    title: '喉反射',
    name: 'reflex',
  },
  {
    span: 3,
    offset: 0,
    title: '皮肤颜色',
    name: 'color',
  },
  {
    span: 3,
    offset: 1,
    title: '总分',
    name: 'totalScore',
  },
];

const titleArray = ['一分钟:', '五分钟:', '十分钟:'];
const keyArray = ['apgar1', 'apgar5', 'apgar10'];

export default (props: any) => {
  const config = get(props, 'config');
  const specialConfig = get(config, 'special_config') && JSON.parse(get(config, 'special_config'));
  const { type } = specialConfig;

  const [rectRadios, setRectRadios] = useState([
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
  ]);

  const [scores, setScores] = useState([]);

  useEffect(() => {
    const { value } = props;
    if (!isEmpty(value)) {
      setScores(value);
    }
  }, [props.value]);

  const handleRadioChange = (row: number, column: number) => e => {
    const { onChange } = props;
    set(rectRadios, `${row}.${column}`, e.target.value);
    const newScores: any = {};
    map(rectRadios, (rectRadioRow, index) => {
      let tempSum = 0;
      map(rectRadioRow, (item: number) => {
        tempSum += Number(item);
      });
      set(newScores, keyArray[index], String(tempSum));
    });
    setRectRadios(rectRadios);
    setScores(newScores);
    onChange && onChange(newScores);
  };

  const handleInputChange = (index: any, inputType: any) => (inputValue: any) => {
    const { onChange } = props;
    const newScores = [...scores];
    set(newScores, `${index}.${inputType}`, inputValue);
    setScores(newScores);
    onChange && onChange(scores);
  };

  const renderContent = () => {
    const element = [];
    for (let i = 0; i < 3; i++) {
      element.push(
        <Row style={{ marginTop: 8 }}>
          <Col span={2}>
            <div style={{ textAlign: 'right' }}>{titleArray[i]}</div>
          </Col>
          {renderRadioGroup(i, keyArray[i])}
        </Row>,
      );
    }
    return element;
  };

  const renderRadioGroup = (row: number, key: string) => {
    return map(scoreHeaderData, (item, column) => {
      if (column === 0) {
        return <></>;
      }
      if (column === scoreHeaderData.length - 1) {
        return (
          <Col span={item.span} offset={item.offset}>
            <div>{get(scores, key)}</div>
          </Col>
        );
      }
      return (
        <Col span={item.span} offset={item.offset}>
          <Radio.Group name={item.name} onChange={handleRadioChange(row, column)}>
            <Radio value={0}>0</Radio>
            <Radio value={1}>1</Radio>
            <Radio value={2}>2</Radio>
          </Radio.Group>
        </Col>
      );
    });
  };

  const renderSimpleContent = () => {
    const { form } = props;
    const fetusAppendages = (form && form.getFieldValue('fetusAppendages')) || [{}];
    return map(fetusAppendages, (fetusAppendage, index) => {
      return (
        <>
          <Divider orientation="left">
            <span style={{ fontSize: 12 }}>胎儿{index + 1}</span>
          </Divider>
          <Row>
            <Col span={7}>
              <Form.Item label="一分钟" wrapperCol={{ span: 14 }} labelCol={{ span: 10 }}>
                <InputNumber
                  size="small"
                  value={get(scores, `${index}.apgar1`)}
                  onChange={handleInputChange(index, 'apgar1')}
                />
              </Form.Item>
            </Col>
            <Col span={7}>
              <Form.Item label="五分钟" wrapperCol={{ span: 14 }} labelCol={{ span: 10 }}>
                <InputNumber
                  size="small"
                  value={get(scores, `${index}.apgar5`)}
                  onChange={handleInputChange(index, 'apgar5')}
                />
              </Form.Item>
            </Col>
            <Col span={7}>
              <Form.Item label="十分钟" wrapperCol={{ span: 14 }} labelCol={{ span: 10 }}>
                <InputNumber
                  size="small"
                  value={get(scores, `${index}.apgar10`)}
                  onChange={handleInputChange(index, 'apgar10')}
                />
              </Form.Item>
            </Col>
          </Row>
        </>
      );
    });
  };

  return (
    <>
      {type === 'simple' ? (
        renderSimpleContent()
      ) : (
        <>
          <Row>
            {map(scoreHeaderData, item => {
              return (
                <Col span={item.span} offset={item.offset}>
                  {item.title}
                </Col>
              );
            })}
          </Row>
          {renderContent()}
        </>
      )}
    </>
  );
};
