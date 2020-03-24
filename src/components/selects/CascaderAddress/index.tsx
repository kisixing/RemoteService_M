import React, { useState } from 'react';
import { Select, Cascader, Row, Col, Input } from 'antd';
import { map, get, isEmpty } from 'lodash';
import options, { getStreets } from './cascader-address-options';

export default (props: any) => {
  const [streets = [], setStreets] = useState();

  const handleProvinceChange = data => {
    // const { onChange } = props;
    // onChange && onChange();
    // setStreets();
    if (get(data, 0) && get(data, 1) && get(data, 2)) {
      setStreets(getStreets(get(data, 0), get(data, 1), get(data, 2)) || []);
    } else {
      setStreets([]);
    }
  };

  return (
    <>
      <Row>
        <Col span={6}>
          <Cascader
            size="small"
            options={options}
            onChange={handleProvinceChange}
            placeholder="选择省市区"
          />
        </Col>
        <Col span={6}>
          <Select size="small" disabled={isEmpty(streets)} placeholder="选择街道、社区">
            {map(streets, street => (
              <Select.Option value={get(street, 'value')}>{get(street, 'label')}</Select.Option>
            ))}
          </Select>
        </Col>
        <Col span={12}>
          <Input size="small" disabled={isEmpty(streets)} placeholder="详细地址" />
        </Col>
      </Row>
    </>
  );
};
