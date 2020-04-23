import React from 'react';
import { Row, Col, Radio } from 'antd';
import { map } from 'lodash';

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

export default (props: any) => {
  const handleRadioChange = (row: number, column: number) => e => {
    console.log(row, column, e.target.value);
  };

  const renderContent = () => {
    const element = [];
    const titleArray = ['一分钟:', '五分钟:', '十分钟:'];
    for (let i = 0; i < 3; i++) {
      element.push(
        <Row style={{ marginTop: 8 }}>
          <Col span={2}>
            <div style={{ textAlign: 'right' }}>{titleArray[i]}</div>
          </Col>
          {renderRadioGroup(i)}
        </Row>,
      );
    }
    return element;
  };

  const renderRadioGroup = (row: number) => {
    return map(scoreHeaderData, (item, column) => {
      if (column === 0) {
        return <></>;
      }
      if (column === scoreHeaderData.length - 1) {
        return (
          <Col span={item.span} offset={item.offset}>
            <div>10</div>
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

  return (
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
  );
};
