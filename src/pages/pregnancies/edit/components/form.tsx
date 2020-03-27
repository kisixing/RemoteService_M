import React from 'react';
import { DynamicForm } from '@lianmed/components';
import { Form, Input, Col, Row, Divider, InputNumber, Radio, Button } from 'antd';
import { get, map, isFunction, isEmpty, isEqual } from 'lodash';
import { defaultFormDescriptions, pregnancyHistoryForm } from '../config/form';
import CascaderAddress from '@/components/selects/CascaderAddress';
import FormSection from '@/components/BaseModalForm/FormSection';

const formItemLayout = {
  labelCol: {
    span: 10,
  },
  wrapperCol: {
    span: 14,
  },
};

export default class PregnanciesForm extends DynamicForm {
  state = {
    isChildbirth: undefined,
    formDescriptionsWithoutSection: [],
    formDescriptions: [],
    renderEditItem: undefined,
  };

  // renderEditItem = this.generateRenderEditItem(formDescriptionsWithoutSection, {
  //   formItemLayout,
  // });

  componentDidMount() {
    setTimeout(() => {
      this.form = this.formRef.current;
      // const { formDescriptionsWithoutSection, formDescriptions, data } = this.props;
      // console.log(formDescriptionsWithoutSection);
      // console.log(data);
      // const renderEditItem = this.generateRenderEditItem(formDescriptionsWithoutSection, {
      //   formItemLayout,
      // });
      // this.setState({
      //   formDescriptionsWithoutSection,
      //   formDescriptions,
      //   renderEditItem,
      // });
      // if (get(data, 'id')) {
      //   this.form.setFieldsValue({
      //     data,
      //   });
      // }
    }, 100);
  }

  componentWillReceiveProps(nextprops) {
    if (this.form) {
      const { formDescriptionsWithoutSection, formDescriptions, data } = nextprops;
      const renderEditItem = this.generateRenderEditItem(formDescriptionsWithoutSection, {
        formItemLayout,
      });
      if (isEqual(formDescriptionsWithoutSection, get(this.props, 'formDescriptionsWithoutSection')))
        this.setState({
          formDescriptionsWithoutSection,
          formDescriptions,
          renderEditItem,
        });
      if (get(data, 'id') === get(nextprops, 'data.id')) {
        this.form.setFieldsValue && this.form.setFieldsValue(data);
      }
    }
  }

  // renderPregnancyHistoryItem = this.generateRenderEditItem(pregnancyHistoryForm, {
  //   formItemLayout,
  // });

  renderRowContent = (rows = [], customOptions = {}) => {
    const { formDescriptionFlag = 'default', customFormItemLayout } = customOptions;
    let renderItem = this.renderEditItem;
    if (formDescriptionFlag === 'pregnancyHistory') {
      renderItem = this.renderPregnancyHistoryItem;
    }

    return (
      <Row>
        {map(rows, (col, index) => {
          return (
            <Col span={get(col, 'span') || 7} offset={index !== 0 ? get(col, 'offset') || 1 : 0}>
              {renderItem(get(col, 'key'), get(col, 'inputNode'), {
                customFormItemLayout,
              })}
            </Col>
          );
        })}
      </Row>
    );
  };

  // renderPregnanciesInfoEditContent = () => {
  //   return (
  //     <>
  //       <Divider orientation="left">孕妇基本信息</Divider>

  //       {/* {this.renderRowContent([
  //         {
  //           key: 'outpatientNO',
  //           inputNode: <Input size="small" {...get(defaultFormDescriptions, 'outpatientNO.inputProps')} />,
  //         },
  //       ])} */}
  //       {this.renderRowContent([
  //         {
  //           key: 'name',
  //           inputNode: <Input size="small" {...get(defaultFormDescriptions, 'name.inputProps')} />,
  //         },
  //         {
  //           key: 'telephone',
  //           inputNode: <Input size="small" {...get(defaultFormDescriptions, 'telephone.inputProps')} />,
  //         },
  //       ])}
  //       {this.renderRowContent([
  //         {
  //           key: 'idType',
  //           inputNode: <Input size="small" {...get(defaultFormDescriptions, 'idType.inputProps')} />,
  //         },
  //         {
  //           key: 'idNO',
  //           inputNode: <Input size="small" {...get(defaultFormDescriptions, 'idNO.inputProps')} />,
  //         },
  //       ])}
  //       {this.renderRowContent([
  //         {
  //           key: 'dob',
  //           inputNode: <Input size="small" {...get(defaultFormDescriptions, 'dob.inputProps')} />,
  //         },
  //         {
  //           key: 'nationality',
  //           inputNode: <Input size="small" {...get(defaultFormDescriptions, 'nationality.inputProps')} />,
  //         },
  //         {
  //           key: 'nativeplace',
  //           inputNode: <Input size="small" {...get(defaultFormDescriptions, 'nativeplace.inputProps')} />,
  //         },
  //       ])}
  //       {this.renderRowContent([
  //         {
  //           key: 'age',
  //           inputNode: <InputNumber size="small" {...get(defaultFormDescriptions, 'age.inputProps')} />,
  //         },
  //         {
  //           key: 'ethnic',
  //           inputNode: <Input size="small" {...get(defaultFormDescriptions, 'nationality.inputProps')} />,
  //         },
  //         {
  //           key: 'occupation',
  //           inputNode: <Input size="small" {...get(defaultFormDescriptions, 'occupation.inputProps')} />,
  //         },
  //       ])}

  //       {this.renderRowContent([
  //         {
  //           key: 'maritalStatus',
  //           inputNode: <InputNumber size="small" {...get(defaultFormDescriptions, 'maritalStatus.inputProps')} />,
  //         },
  //         {
  //           key: 'birthCertificate',
  //           inputNode: <Input size="small" {...get(defaultFormDescriptions, 'birthCertificate.inputProps')} />,
  //         },
  //         //   {
  //         //     key: 'occupation',
  //         //     inputNode: (
  //         //       <Input size="small" {...get(defaultFormDescriptions, 'occupation.inputProps')} />
  //         //     ),
  //         //   },
  //       ])}

  //       {this.renderRowContent(
  //         [
  //           {
  //             key: 'householdAddress',
  //             inputNode: (
  //               <CascaderAddress size="small" {...get(defaultFormDescriptions, 'householdAddress.inputProps')} />
  //             ),
  //             span: 24,
  //           },
  //         ],
  //         {
  //           customFormItemLayout: {
  //             labelCol: {
  //               span: 3,
  //             },
  //             wrapperCol: {
  //               span: 20,
  //             },
  //           },
  //         },
  //       )}
  //       {this.renderRowContent(
  //         [
  //           {
  //             key: 'residenceAddress',
  //             inputNode: (
  //               <CascaderAddress size="small" {...get(defaultFormDescriptions, 'residenceAddress.inputProps')} />
  //             ),
  //             span: 24,
  //           },
  //         ],
  //         {
  //           customFormItemLayout: {
  //             labelCol: {
  //               span: 3,
  //             },
  //             wrapperCol: {
  //               span: 20,
  //             },
  //           },
  //         },
  //       )}
  //       {this.renderRowContent(
  //         [
  //           {
  //             key: 'postpartumAddress',
  //             inputNode: (
  //               <CascaderAddress size="small" {...get(defaultFormDescriptions, 'postpartumAddress.inputProps')} />
  //             ),
  //             span: 24,
  //           },
  //         ],
  //         {
  //           customFormItemLayout: {
  //             labelCol: {
  //               span: 3,
  //             },
  //             wrapperCol: {
  //               span: 20,
  //             },
  //           },
  //         },
  //       )}
  //     </>
  //   );
  // };

  // renderHusbandInfoEditContent = () => {
  //   return (
  //     <>
  //       <Divider orientation="left">丈夫基本信息</Divider>
  //       {/* {this.renderRowContent([
  //         {
  //           key: 'outpatientNO',
  //           inputNode: <Input size="small" {...get(defaultFormDescriptions, 'outpatientNO.inputProps')} />,
  //         },
  //       ])} */}
  //       {this.renderRowContent([
  //         {
  //           key: 'partnerName',
  //           inputNode: <Input size="small" {...get(defaultFormDescriptions, 'partnerName.inputProps')} />,
  //         },
  //         {
  //           key: 'partnerTelephone',
  //           inputNode: <Input size="small" {...get(defaultFormDescriptions, 'partnerTelephone.inputProps')} />,
  //         },
  //         {
  //           key: 'partnerOutpatientNO',
  //           inputNode: <Input size="small" {...get(defaultFormDescriptions, 'partnerOutpatientNO.inputProps')} />,
  //         },
  //       ])}
  //       {this.renderRowContent([
  //         {
  //           key: 'partnerIdType',
  //           inputNode: <Input size="small" {...get(defaultFormDescriptions, 'partnerIdType.inputProps')} />,
  //         },
  //         {
  //           key: 'partnerIdNO',
  //           inputNode: <Input size="small" {...get(defaultFormDescriptions, 'partnerIdNO.inputProps')} />,
  //         },
  //       ])}
  //       {this.renderRowContent([
  //         {
  //           key: 'partnerAge',
  //           inputNode: <Input size="small" {...get(defaultFormDescriptions, 'partnerAge.inputProps')} />,
  //         },
  //         {
  //           key: 'partnerNationality',
  //           inputNode: <Input size="small" {...get(defaultFormDescriptions, 'partnerNationality.inputProps')} />,
  //         },
  //         {
  //           key: 'partnerNativeplace',
  //           inputNode: <Input size="small" {...get(defaultFormDescriptions, 'partnerNativeplace.inputProps')} />,
  //         },
  //       ])}
  //       {this.renderRowContent([
  //         {
  //           key: 'partnerEthnic',
  //           inputNode: <Input size="small" {...get(defaultFormDescriptions, 'partnerEthnic.inputProps')} />,
  //         },
  //         {
  //           key: 'partnerOccupation',
  //           inputNode: <Input size="small" {...get(defaultFormDescriptions, 'partnerOccupation.inputProps')} />,
  //         },
  //       ])}
  //       {this.renderRowContent([
  //         {
  //           key: 'partnerCigarette',
  //           inputNode: <Input size="small" {...get(defaultFormDescriptions, 'partnerCigarette.inputProps')} />,
  //         },
  //         {
  //           key: 'partnerDrink',
  //           inputNode: <Input size="small" {...get(defaultFormDescriptions, 'partnerDrink.inputProps')} />,
  //         },
  //       ])}
  //       {this.renderRowContent([
  //         {
  //           key: 'partnerDisease',
  //           inputNode: <Input size="small" {...get(defaultFormDescriptions, 'partnerDisease.inputProps')} />,
  //         },
  //       ])}
  //     </>
  //   );
  // };

  // renderMaternityInfoContent = () => {
  //   return (
  //     <>
  //       <Divider orientation="left">本次孕产信息</Divider>
  //       {this.renderRowContent([
  //         {
  //           key: 'recordDate',
  //           inputNode: <Input size="small" {...get(defaultFormDescriptions, 'recordDate.inputProps')} />,
  //         },
  //         {
  //           key: 'recordNo',
  //           inputNode: <Input size="small" {...get(defaultFormDescriptions, 'recordNo.inputProps')} />,
  //         },
  //       ])}
  //       {this.renderRowContent([
  //         {
  //           key: 'lmp',
  //           inputNode: <Input size="small" {...get(defaultFormDescriptions, 'lmp.inputProps')} />,
  //         },
  //         {
  //           key: 'edd',
  //           inputNode: <Input size="small" {...get(defaultFormDescriptions, 'edd.inputProps')} />,
  //         },
  //         {
  //           key: 'eddB',
  //           inputNode: <Input size="small" {...get(defaultFormDescriptions, 'eddB.inputProps')} />,
  //         },
  //       ])}
  //       {this.renderRowContent([
  //         {
  //           key: 'weightBefore',
  //           inputNode: <Input size="small" {...get(defaultFormDescriptions, 'weightBefore.inputProps')} />,
  //         },
  //         {
  //           key: 'weightNow',
  //           inputNode: <Input size="small" {...get(defaultFormDescriptions, 'weightNow.inputProps')} />,
  //         },
  //         {
  //           key: 'height',
  //           inputNode: <Input size="small" {...get(defaultFormDescriptions, 'height.inputProps')} />,
  //         },
  //       ])}
  //       {this.renderRowContent([
  //         {
  //           key: 'systolicPressure',
  //           inputNode: <Input size="small" {...get(defaultFormDescriptions, 'systolicPressure.inputProps')} />,
  //         },
  //         {
  //           key: 'diastolicPressure',
  //           inputNode: <Input size="small" {...get(defaultFormDescriptions, 'diastolicPressure.inputProps')} />,
  //         },
  //         {
  //           key: 'pulse',
  //           inputNode: <Input size="small" {...get(defaultFormDescriptions, 'pulse.inputProps')} />,
  //         },
  //       ])}
  //       {this.renderRowContent([
  //         {
  //           key: 'menarche',
  //           inputNode: <Input size="small" {...get(defaultFormDescriptions, 'menarche.inputProps')} />,
  //         },
  //         {
  //           key: 'menstrualCycle',
  //           inputNode: <Input size="small" {...get(defaultFormDescriptions, 'menstrualCycle.inputProps')} />,
  //         },
  //         {
  //           key: 'menstrualPeriod',
  //           inputNode: <Input size="small" {...get(defaultFormDescriptions, 'menstrualPeriod.inputProps')} />,
  //         },
  //       ])}
  //       {this.renderRowContent([
  //         {
  //           key: 'selfCigarette',
  //           inputNode: <Input size="small" {...get(defaultFormDescriptions, 'selfCigarette.inputProps')} />,
  //         },
  //         {
  //           key: 'selfDrink',
  //           inputNode: <Input size="small" {...get(defaultFormDescriptions, 'selfDrink.inputProps')} />,
  //         },
  //         {
  //           key: 'hazardousSubstance',
  //           inputNode: <Input size="small" {...get(defaultFormDescriptions, 'hazardousSubstance.inputProps')} />,
  //         },
  //       ])}
  //       {this.renderRowContent([
  //         {
  //           key: 'dysmenorrhea',
  //           inputNode: <Input size="small" {...get(defaultFormDescriptions, 'dysmenorrhea.inputProps')} />,
  //         },
  //         {
  //           key: 'nearRelation',
  //           inputNode: <Input size="small" {...get(defaultFormDescriptions, 'nearRelation.inputProps')} />,
  //         },
  //         {
  //           key: 'maritalYears',
  //           inputNode: <Input size="small" {...get(defaultFormDescriptions, 'maritalYears.inputProps')} />,
  //         },
  //       ])}
  //       {this.renderRowContent([
  //         {
  //           key: 'radioactivity',
  //           inputNode: <Input size="small" {...get(defaultFormDescriptions, 'radioactivity.inputProps')} />,
  //         },
  //         {
  //           key: 'hypertension',
  //           inputNode: <Input size="small" {...get(defaultFormDescriptions, 'hypertension.inputProps')} />,
  //         },
  //         {
  //           key: 'diabetes',
  //           inputNode: <Input size="small" {...get(defaultFormDescriptions, 'diabetes.inputProps')} />,
  //         },
  //       ])}
  //       {this.renderRowContent([
  //         {
  //           key: 'cardiacDisease',
  //           inputNode: <Input size="small" {...get(defaultFormDescriptions, 'cardiacDisease.inputProps')} />,
  //         },
  //         {
  //           key: 'familyHistory',
  //           inputNode: <Input size="small" {...get(defaultFormDescriptions, 'familyHistory.inputProps')} />,
  //         },
  //       ])}
  //     </>
  //   );
  // };

  handleIsChildbirth = e => {
    this.setState({
      isChildbirth: get(e, 'target.value'),
    });
  };

  // renderMaternityHistoryInfoContent = () => {
  //   const { isChildbirth } = this.state;

  //   return (
  //     <>
  //       <Divider orientation="left">孕产史</Divider>
  //       {this.renderRowContent(
  //         [
  //           {
  //             key: 'pregnancyEnd',
  //             inputNode: <Input size="small" {...get(defaultFormDescriptions, 'pregnancyEnd.inputProps')} />,
  //           },
  //           {
  //             key: 'complication',
  //             inputNode: <Input size="small" {...get(defaultFormDescriptions, 'complication.inputProps')} />,
  //           },
  //           {
  //             key: 'isChildbirth',
  //             inputNode: (
  //               <Radio.Group onChange={this.handleIsChildbirth}>
  //                 <Radio value={0}>是</Radio>
  //                 <Radio value={1}>否</Radio>
  //               </Radio.Group>
  //             ),
  //           },
  //         ],
  //         { formDescriptionFlag: 'pregnancyHistory' },
  //       )}
  //       {isChildbirth === 1 &&
  //         this.renderRowContent(
  //           [
  //             {
  //               key: 'abortionMode',
  //               inputNode: <Input size="small" {...get(defaultFormDescriptions, 'abortionMode.inputProps')} />,
  //             },
  //             {
  //               key: 'badBirth',
  //               inputNode: <Input size="small" {...get(defaultFormDescriptions, 'badBirth.inputProps')} />,
  //             },
  //           ],
  //           { formDescriptionFlag: 'pregnancyHistory' },
  //         )}
  //       {isChildbirth === 0 &&
  //         this.renderRowContent(
  //           [
  //             {
  //               key: 'maternityHospital',
  //               inputNode: <Input size="small" {...get(defaultFormDescriptions, 'maternityHospital.inputProps')} />,
  //             },
  //             {
  //               key: 'gestationalAge',
  //               inputNode: <Input size="small" {...get(defaultFormDescriptions, 'gestationalAge.inputProps')} />,
  //             },
  //             {
  //               key: 'foetusNumber',
  //               inputNode: <Input size="small" {...get(defaultFormDescriptions, 'foetusNumber.inputProps')} />,
  //             },
  //           ],
  //           { formDescriptionFlag: 'pregnancyHistory' },
  //         )}
  //       {isChildbirth === 0 &&
  //         this.renderRowContent(
  //           [
  //             {
  //               key: 'deliveryMode',
  //               inputNode: <Input size="small" {...get(defaultFormDescriptions, 'deliveryMode.inputProps')} />,
  //             },
  //             {
  //               key: 'postpartumFever',
  //               inputNode: <Input size="small" {...get(defaultFormDescriptions, 'postpartumFever.inputProps')} />,
  //             },
  //             {
  //               key: 'hemorrhage',
  //               inputNode: <Input size="small" {...get(defaultFormDescriptions, 'hemorrhage.inputProps')} />,
  //             },
  //           ],
  //           { formDescriptionFlag: 'pregnancyHistory' },
  //         )}
  //     </>
  //   );
  // };

  handleFinish = async values => {
    const { onFinish, data } = this.props;
    await this.form.validateFields();
    onFinish && onFinish({ ...values, id: get(data, 'id') });
  };

  renderSection = section => {
    const { data } = this.props;
    const { renderEditItem } = this.state;

    return (
      <div>
        <Divider key={`${get(section, 'flag')}-divider`} orientation="left">
          {get(section, 'name')}
        </Divider>
        {isFunction(renderEditItem) && (
          <FormSection
            key={`${get(section, 'flag')}-section`}
            data={data}
            formDescriptions={get(section, 'fields')}
            renderEditItem={renderEditItem}
          />
        )}
      </div>
    );
  };

  renderEditContent = () => {
    const { formDescriptions } = this.state;
    // console.log('renderEditContent');
    // console.log(formDescriptions);
    return (
      <>
        {map(formDescriptions, section => {
          return this.renderSection(section);
        })}
      </>
    );
  };

  render() {
    const { formDescriptions } = this.state;
    return (
      <Form style={{ minWidth: '80%' }} ref={this.formRef} {...formItemLayout} onFinish={this.handleFinish}>
        {!isEmpty(formDescriptions) && this.renderEditContent()}
        <Form.Item key="action" wrapperCol={{ span: 4 }} style={{ display: 'flex', flexFlow: 'row-reverse' }}>
          <Button size="middle" htmlType="reset" style={{ marginLeft: 8 }}>
            重置
          </Button>
          <Button size="middle" style={{ marginLeft: 8 }} type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
