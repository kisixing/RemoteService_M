import React, { useState, useEffect } from 'react';
import { Select, Cascader, Row, Col, Input } from 'antd';
import { map, get, isEmpty } from 'lodash';
import options, { getStreets } from './cascader-address-options';

export default (props: any) => {
  const [streets, setStreets] = useState([]);
  const [address, setAddress] = useState({});

  useEffect(() => {
    if (!isEmpty(get(props, 'value'))) {
      const value = JSON.parse(get(props, 'value'));
      setAddress(value);
      setStreets(getStreets(get(value, 'province'), get(value, 'city'), get(value, 'area')) || []);
    }
  }, []);

  const handleProvinceChange = data => {
    const { onChange } = props;
    const province = get(data, 0);
    const city = get(data, 1);
    const area = get(data, 2);
    setStreets([]);
    if (province && city && area) {
      setStreets(getStreets(province, city, area) || []);
    }
    const params = {
      ...address,
      province,
      city,
      area,
    };
    setAddress(params);
    onChange && onChange(JSON.stringify(params));
  };

  const handleStreetChange = data => {
    const { onChange } = props;
    const params = {
      ...address,
      street: data,
    };
    setAddress(params);
    onChange && onChange(JSON.stringify(params));
  };

  const handleInputChange = e => {
    const { onChange } = props;
    const params = {
      ...address,
      detail: e.target.value,
    };
    setAddress(params);
    onChange && onChange(JSON.stringify(params));
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
            allowClear
            value={[get(address, 'province'), get(address, 'city'), get(address, 'area')]}
          />
        </Col>
        <Col span={6}>
          <Select
            size="small"
            disabled={isEmpty(address)}
            placeholder="选择街道、社区"
            onChange={handleStreetChange}
            allowClear
            value={get(address, 'street')}
          >
            {map(streets, street => (
              <Select.Option value={get(street, 'value')}>{get(street, 'label')}</Select.Option>
            ))}
          </Select>
        </Col>
        <Col span={12}>
          <Input
            size="small"
            disabled={isEmpty(address)}
            placeholder="详细地址"
            onChange={handleInputChange}
            allowClear
            value={get(address, 'detail')}
          />
        </Col>
      </Row>
    </>
  );
};
