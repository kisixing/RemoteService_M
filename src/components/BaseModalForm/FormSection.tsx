import React, { Fragment } from 'react';
import { Input, InputNumber, Tabs, Form, Radio, Row, Col, DatePicker } from 'antd';
import { map, get, keyBy, isNil } from 'lodash';
import DeviceStatusSelect from '@/components/selects/DeviceStatusSelect';
import request from '@/utils/request';
import PermissionSelect from '@/components/selects/PermissionSelect';
import ParentPermissionSelect from '../selects/ParentPermissionSelect';
import PermissionTypeSelect from '../selects/PermissionTypeSelect';
import UploadImg from '@/components/UploadImg';
import CustomEditor from '@/components/CustomEditor';
import DataSelect from '@/components/DataSelect';
import CascaderAddress from '@/components/selects/CascaderAddress';
import { connect } from 'dva';
import PregnancyHistory from '@/components/PregnancyHistory';

interface IProps {
  renderEditItem: (key: any, reactNode: any, options?: any) => any;
  formDescriptions: {};
  id?: Number | String;
  data?: any;
}

export class FormSection extends React.Component<IProps, IState> {
  renderRowAndCol = (formDescriptionArr = []) => {
    return (
      <Row>
        {map(formDescriptionArr, (formDescription, index) => {
          return (
            <Col key={index} span={get(formDescription, 'span')} offset={get(formDescription, 'offset')}>
              {this.renderItem(formDescription)}
            </Col>
          );
        })}
      </Row>
    );
  };

  renderItem = (formDescription: any) => {
    const { renderEditItem, id, data, products } = this.props;

    switch (get(formDescription, 'inputType')) {
      case 'id':
        return <span></span>;
      // return (
      //   id &&
      //   renderEditItem(
      //     get(formDescription, 'key'),
      //     <Input {...get(formDescription, 'inputProps')} />,
      //   )
      // );
      case 'subdevice_id':
        return id && renderEditItem(get(formDescription, 'key'), <Input {...get(formDescription, 'inputProps')} />);
      case 'radio':
        return renderEditItem(
          get(formDescription, 'key'),
          <Radio.Group>
            <Radio value={1}>是</Radio>
            <Radio value={0}>否</Radio>
          </Radio.Group>,
        );
      case 'dysmenorrhea_radio':
        return renderEditItem(
          get(formDescription, 'key'),
          <Radio.Group>
            <Radio value="0">无</Radio>
            <Radio value="1">偶尔</Radio>
            <Radio value="2">经常</Radio>
          </Radio.Group>,
          { customFormItemLayout: get(formDescription, 'formItemLayout') || {} },
        );
      case 'pregnant_radio':
        return renderEditItem(
          get(formDescription, 'key'),
          <Radio.Group>
            <Radio value="true">是</Radio>
            <Radio value="false">否</Radio>
          </Radio.Group>,
          { customFormItemLayout: get(formDescription, 'formItemLayout') || {} },
        );
      case 'pregnancy_histories':
        return renderEditItem(get(formDescription, 'key'), <PregnancyHistory />, {
          customFormItemLayout: get(formDescription, 'formItemLayout') || {},
        });
      case 'input':
        return renderEditItem(
          get(formDescription, 'key'),
          <Input size="small" {...get(formDescription, 'inputProps')} />,
          { customFormItemLayout: get(formDescription, 'formItemLayout') || {} },
        );
      case 'text_area':
        return renderEditItem(get(formDescription, 'key'), <Input.TextArea {...get(formDescription, 'inputProps')} />);
      case 'tree_select':
        return renderEditItem(
          get(formDescription, 'key'),
          <PermissionSelect {...get(formDescription, 'inputProps')} />,
        );
      case 'parent_select':
        return renderEditItem(
          get(formDescription, 'key'),
          <ParentPermissionSelect {...get(formDescription, 'inputProps')} />,
        );
      case 'input_number':
        return renderEditItem(
          get(formDescription, 'key'),
          <InputNumber min={0} {...get(formDescription, 'inputProps')} />,
        );
      case 'password':
        return renderEditItem(get(formDescription, 'key'), <Input.Password {...get(formDescription, 'inputProps')} />);
      case 'validdate':
        return renderEditItem(
          get(formDescription, 'key'),
          <DataSelect
            dataSource={[
              { id: 30, name: '30天' },
              { id: 60, name: '60天' },
              { id: 90, name: '90天' },
              { id: 280, name: '一个孕周' },
            ]}
            valueKey="id"
            labelKey="name"
          />,
        );
      case 'editor':
        return renderEditItem(get(formDescription, 'key'), <CustomEditor {...get(formDescription, 'inputProps')} />);
      case 'product':
        return get(formDescription, 'viewOnly')
          ? renderEditItem(
              get(formDescription, 'key'),
              <span>{get(keyBy(products, 'id'), `${get(data, get(formDescription, 'path'))}.name`)}</span>,
            )
          : renderEditItem(
              get(formDescription, 'key'),
              <DataSelect url="/products" valueKey="id" labelKey="name" {...get(formDescription, 'inputProps')} />,
            );
      case 'roles':
        return renderEditItem(
          get(formDescription, 'key'),
          <DataSelect
            url="/groups"
            valueKey="id"
            labelKey="nickname"
            mode="multiple"
            {...get(formDescription, 'inputProps')}
          />,
        );
      case 'device_status':
        return renderEditItem(
          get(formDescription, 'key'),
          <DeviceStatusSelect {...get(formDescription, 'inputProps')} />,
        );
      case 'address':
        return renderEditItem(
          get(formDescription, 'key'),
          <CascaderAddress {...get(formDescription, 'inputProps')} />,
          {
            customFormItemLayout: get(formDescription, 'formItemLayout') || {},
            styles: get(formDescription, 'styles'),
          },
        );
      case 'permission_type':
        return renderEditItem(
          get(formDescription, 'key'),
          <PermissionTypeSelect {...get(formDescription, 'inputProps')} />,
        );
      case 'upload_img':
        return renderEditItem(
          get(formDescription, 'key'),
          <UploadImg {...get(formDescription, 'inputProps')} allowUploadImages={10} />,
        );
      case 'single_date_picker':
        return renderEditItem(
          get(formDescription, 'key'),
          <DatePicker size="small" {...get(formDescription, 'inputProps')} />,
          { customFormItemLayout: get(formDescription, 'formItemLayout') || {} },
        );
      case 'view_only':
        return renderEditItem(get(formDescription, 'key'), <span>{get(data, get(formDescription, 'path'))}</span>);
      default:
        return renderEditItem(get(formDescription, 'key'), <Input {...get(formDescription, 'inputProps')} />);
    }
  };

  renderContent = () => {
    const { formDescriptions = [] } = this.props;
    let tempArr = [];
    let tempSpan = 0;
    let newRow = false;
    let formArray = [];

    map(formDescriptions, (formDescription, index) => {
      if (!isNil(get(formDescription, 'span')) && !isNil(get(formDescription, 'offset'))) {
        // console.log(tempSpan);
        if (get(formDescription, 'isNewRow')) {
          const renderArr = tempArr;
          tempSpan = 0;
          tempArr = [];
          formArray.push(this.renderRowAndCol(renderArr));
        }
        if (tempSpan < 25 && tempSpan + get(formDescription, 'span') + get(formDescription, 'offset') < 25) {
          tempSpan = tempSpan + get(formDescription, 'span') + get(formDescription, 'offset');
          tempArr.push(formDescription);
          // console.log(tempArr);
          if (Number(index) === formDescriptions.length - 1) {
            formArray.push(this.renderRowAndCol(tempArr));
          }
        } else {
          const renderArr = tempArr;
          tempArr = [];
          tempSpan = 0;
          formArray.push(this.renderRowAndCol(renderArr));
        }
      } else {
        formArray.push(this.renderItem(formDescription));
      }
    });
    // console.log(formArray);
    return formArray;
  };

  render() {
    return <>{this.renderContent()}</>;
  }
}

export default connect(({ select }) => ({
  products: get(select, 'products'),
}))(FormSection);
