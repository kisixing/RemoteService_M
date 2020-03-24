import React from 'react';
import { DynamicForm } from '@lianmed/components';
import { Form, Input, Col, Row, Divider, InputNumber } from 'antd';
import { get, map } from 'lodash';
import { defaultFormDescriptions } from '../config/form';
import CascaderAddress from '@/components/selects/CascaderAddress';

const formItemLayout = {
  labelCol: {
    span: 10,
  },
  wrapperCol: {
    span: 14,
  },
};

export default class PregnanciesForm extends DynamicForm {
  renderEditItem = this.generateRenderEditItem(defaultFormDescriptions, {
    formItemLayout,
  });

  renderRowContent = (rows = [], customOptions = {}) => {
    return (
      <Row>
        {map(rows, (col, index) => {
          return (
            <Col span={get(col, 'span') || 7} offset={index !== 0 ? get(col, 'offset') || 1 : 0}>
              {this.renderEditItem(get(col, 'key'), get(col, 'inputNode'), {
                customFormItemLayout: get(customOptions, 'customFormItemLayout'),
              })}
            </Col>
          );
        })}
      </Row>
    );
  };

  renderPregnanciesInfoEditContent = () => {
    return (
      <>
        <Divider orientation="left">孕妇基本信息</Divider>

        {this.renderRowContent([
          {
            key: 'outpatientNO',
            inputNode: (
              <Input size="small" {...get(defaultFormDescriptions, 'outpatientNO.inputProps')} />
            ),
          },
        ])}
        {this.renderRowContent([
          {
            key: 'name',
            inputNode: <Input size="small" {...get(defaultFormDescriptions, 'name.inputProps')} />,
          },
          {
            key: 'telephone',
            inputNode: (
              <Input size="small" {...get(defaultFormDescriptions, 'telephone.inputProps')} />
            ),
          },
        ])}
        {this.renderRowContent([
          {
            key: 'idType',
            inputNode: (
              <Input size="small" {...get(defaultFormDescriptions, 'idType.inputProps')} />
            ),
          },
          {
            key: 'idNO',
            inputNode: <Input size="small" {...get(defaultFormDescriptions, 'idNO.inputProps')} />,
          },
        ])}
        {this.renderRowContent([
          {
            key: 'dob',
            inputNode: <Input size="small" {...get(defaultFormDescriptions, 'dob.inputProps')} />,
          },
          {
            key: 'nationality',
            inputNode: (
              <Input size="small" {...get(defaultFormDescriptions, 'nationality.inputProps')} />
            ),
          },
          {
            key: 'nativeplace',
            inputNode: (
              <Input size="small" {...get(defaultFormDescriptions, 'nativeplace.inputProps')} />
            ),
          },
        ])}
        {this.renderRowContent([
          {
            key: 'age',
            inputNode: (
              <InputNumber size="small" {...get(defaultFormDescriptions, 'age.inputProps')} />
            ),
          },
          {
            key: 'ethnic',
            inputNode: (
              <Input size="small" {...get(defaultFormDescriptions, 'nationality.inputProps')} />
            ),
          },
          {
            key: 'occupation',
            inputNode: (
              <Input size="small" {...get(defaultFormDescriptions, 'occupation.inputProps')} />
            ),
          },
        ])}

        {this.renderRowContent([
          {
            key: 'maritalStatus',
            inputNode: (
              <InputNumber
                size="small"
                {...get(defaultFormDescriptions, 'maritalStatus.inputProps')}
              />
            ),
          },
          {
            key: 'birthCertificate',
            inputNode: (
              <Input
                size="small"
                {...get(defaultFormDescriptions, 'birthCertificate.inputProps')}
              />
            ),
          },
          //   {
          //     key: 'occupation',
          //     inputNode: (
          //       <Input size="small" {...get(defaultFormDescriptions, 'occupation.inputProps')} />
          //     ),
          //   },
        ])}

        {this.renderRowContent(
          [
            {
              key: 'householdAddress',
              inputNode: (
                <CascaderAddress
                  size="small"
                  {...get(defaultFormDescriptions, 'householdAddress.inputProps')}
                />
              ),
              span: 24,
            },
          ],
          {
            customFormItemLayout: {
              labelCol: {
                span: 3,
              },
              wrapperCol: {
                span: 20,
              },
            },
          },
        )}
        {this.renderRowContent(
          [
            {
              key: 'liveAddress',
              inputNode: (
                <CascaderAddress
                  size="small"
                  {...get(defaultFormDescriptions, 'liveAddress.inputProps')}
                />
              ),
              span: 24,
            },
          ],
          {
            customFormItemLayout: {
              labelCol: {
                span: 3,
              },
              wrapperCol: {
                span: 20,
              },
            },
          },
        )}
      </>
    );
  };

  renderHusbandInfoEditContent = () => {
    return (
      <>
        <Divider orientation="left">丈夫基本信息</Divider>
        {this.renderRowContent([
          {
            key: 'partnerName',
            inputNode: (
              <Input size="small" {...get(defaultFormDescriptions, 'partnerName.inputProps')} />
            ),
          },
          {
            key: 'partnerTelephone',
            inputNode: (
              <Input
                size="small"
                {...get(defaultFormDescriptions, 'partnerTelephone.inputProps')}
              />
            ),
          },
          {
            key: 'partnerOutpatientNO',
            inputNode: (
              <Input
                size="small"
                {...get(defaultFormDescriptions, 'partnerOutpatientNO.inputProps')}
              />
            ),
          },
        ])}
        {this.renderRowContent([
          {
            key: 'partnerIdType',
            inputNode: (
              <Input size="small" {...get(defaultFormDescriptions, 'partnerIdType.inputProps')} />
            ),
          },
          {
            key: 'partnerIdNO',
            inputNode: (
              <Input size="small" {...get(defaultFormDescriptions, 'partnerIdNO.inputProps')} />
            ),
          },
        ])}
        {this.renderRowContent([
          {
            key: 'partnerAge',
            inputNode: (
              <Input size="small" {...get(defaultFormDescriptions, 'partnerAge.inputProps')} />
            ),
          },
          {
            key: 'partnerNationality',
            inputNode: (
              <Input
                size="small"
                {...get(defaultFormDescriptions, 'partnerNationality.inputProps')}
              />
            ),
          },
          {
            key: 'partnerNativeplace',
            inputNode: (
              <Input
                size="small"
                {...get(defaultFormDescriptions, 'partnerNativeplace.inputProps')}
              />
            ),
          },
        ])}
      </>
    );
  };

  renderMaternityInfoContent = () => {
    return (
      <>
        <Divider orientation="left">本次孕产信息</Divider>
        {this.renderRowContent([
          {
            key: 'recordDate',
            inputNode: (
              <Input size="small" {...get(defaultFormDescriptions, 'recordDate.inputProps')} />
            ),
          },
          {
            key: 'recordNo',
            inputNode: (
              <Input size="small" {...get(defaultFormDescriptions, 'recordNo.inputProps')} />
            ),
          },
        ])}
        {this.renderRowContent([
          {
            key: 'lmp',
            inputNode: <Input size="small" {...get(defaultFormDescriptions, 'lmp.inputProps')} />,
          },
          {
            key: 'edd',
            inputNode: <Input size="small" {...get(defaultFormDescriptions, 'edd.inputProps')} />,
          },
        ])}
      </>
    );
  };

  renderMaternityHistoryInfoContent = () => {
    return (
      <>
        <Divider orientation="left">孕产史</Divider>
      </>
    );
  };

  renderEditContent = () => {
    return (
      <>
        {this.renderPregnanciesInfoEditContent()}
        {this.renderHusbandInfoEditContent()}
        {this.renderMaternityInfoContent()}
        {this.renderMaternityHistoryInfoContent()}
      </>
    );
  };

  render() {
    return (
      <Form {...this.props} ref={this.formRef} {...formItemLayout}>
        {this.renderEditContent()}
      </Form>
    );
  }
}
