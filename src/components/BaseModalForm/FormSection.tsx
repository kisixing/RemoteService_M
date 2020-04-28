import React from 'react';
import { Input, InputNumber, Radio, Row, Col, DatePicker } from 'antd';
import { map, get, keyBy, isNil, isEmpty } from 'lodash';
import DeviceStatusSelect from '@/components/selects/DeviceStatusSelect';
import PermissionSelect from '@/components/selects/PermissionSelect';
import ParentPermissionSelect from '../selects/ParentPermissionSelect';
import PermissionTypeSelect from '../selects/PermissionTypeSelect';
import UploadImg from '@/components/GeneralComponents/UploadImg';
import CustomEditor from '@/components/GeneralComponents/CustomEditor';
import DataSelect from '@/components/DataSelect';
import CascaderAddress from '@/components/selects/CascaderAddress';
import { connect } from 'dva';
import PregnancyHistory from '@/components/BusinessComponents/PregnancyHistory';
import TriggerTypeSelect from '@/components/selects/TriggerTypeSelect';
import CronSelect from '@/components/selects/CronSelect';
import RadioWithInput from '@/components/selects/RadioWithInput';
import RadioWithInputNumber from '@/components/selects/RadioWithInputNumber';
import DiseaseSelect from '@/components/selects/DiseaseSelect';
import NormalSelect from '@/components/selects/NormalSelect';
import CountrySelect from '@/components/selects/CountrySelect';
import CheckboxWithInput from '@/components/ConfigComponents/CheckboxWithInput';
import ApgarScoreInput from '@/components/selects/ApgarScoreInput';
import MultipleInputWithLabel from '@/components/ConfigComponents/MultipleInputWithLabel';
import FoetalAppendage from '@/components/BusinessComponents/FoetalAppendage';
import { formDescriptionsFromApi, formDescriptionsWithoutSectionApi } from '@/utils/adapter';
import request from '@/utils/request';
import CheckboxGroup from '@/components/ConfigComponents/CheckboxGroup';
import InputWithLabel from '../ConfigComponents/InputWithLabel';
import NormalCheckboxWithInput from '../ConfigComponents/NormalCheckboxWithInput';

export const getFormDescriptionByModuleName = async (moduleName: string) => {
  return formDescriptionsWithoutSectionApi(
    formDescriptionsFromApi(await request.get(`/form-descriptions?moduleName=${moduleName}`)),
  );
};

interface IProps {
  renderEditItem: (key: any, reactNode: any, options?: any) => any;
  formDescriptions: {};
  id?: Number | String;
  data?: any;
  form?: any;
}

export class FormSection extends React.Component<IProps> {
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
    const { renderEditItem, id, data, products, events, form } = this.props;

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
        return (
          id &&
          renderEditItem(get(formDescription, 'key'), <Input size="small" {...get(formDescription, 'inputProps')} />)
        );
      case 'radio':
        return renderEditItem(
          get(formDescription, 'key'),
          <Radio.Group>
            <Radio value={1}>是</Radio>
            <Radio value={0}>否</Radio>
          </Radio.Group>,
          {
            customFormItemLayout: get(formDescription, 'formItemLayout') || {},
            styles: get(formDescription, 'styles'),
          },
        );
      case 'normal_select':
        return renderEditItem(
          get(formDescription, 'key'),
          <NormalSelect
            type={get(JSON.parse(get(formDescription, 'special_config')), 'type')}
            showSearch={get(JSON.parse(get(formDescription, 'special_config')), 'showSearch')}
            placeholder="请选择证件类型"
          />,
          {
            customFormItemLayout: get(formDescription, 'formItemLayout') || {},
            styles: get(formDescription, 'styles'),
          },
        );
      case 'country_select':
        return renderEditItem(
          get(formDescription, 'key'),
          <CountrySelect language="zh-CN" placeholder="请选择国籍" />,
          {
            customFormItemLayout: get(formDescription, 'formItemLayout') || {},
            styles: get(formDescription, 'styles'),
          },
        );
      case 'dysmenorrhea_radio':
        return renderEditItem(
          get(formDescription, 'key'),
          <Radio.Group>
            <Radio value={true}>是</Radio>
            <Radio value={false}>否</Radio>
          </Radio.Group>,
          {
            customFormItemLayout: get(formDescription, 'formItemLayout') || {},
            styles: get(formDescription, 'styles'),
          },
        );
      case 'pregnant_radio':
        return renderEditItem(
          get(formDescription, 'key'),
          <Radio.Group>
            <Radio value={false}>否</Radio>
            <Radio value={true}>是</Radio>
          </Radio.Group>,
          {
            customFormItemLayout: get(formDescription, 'formItemLayout') || {},
            styles: get(formDescription, 'styles'),
          },
        );
      case 'radio_with_input':
        return renderEditItem(get(formDescription, 'key'), <RadioWithInput config={formDescription} />, {
          customFormItemLayout: get(formDescription, 'formItemLayout') || {},
          styles: get(formDescription, 'styles'),
        });
      case 'checkbox_with_input':
        return renderEditItem(get(formDescription, 'key'), <CheckboxWithInput config={formDescription} />, {
          customFormItemLayout: get(formDescription, 'formItemLayout') || {},
          styles: get(formDescription, 'styles'),
        });
      case 'normal_checkbox_with_input':
        return renderEditItem(get(formDescription, 'key'), <NormalCheckboxWithInput config={formDescription} />, {
          customFormItemLayout: get(formDescription, 'formItemLayout') || {},
        });
      case 'checkbox_group':
        return renderEditItem(get(formDescription, 'key'), <CheckboxGroup config={formDescription} />, {
          customFormItemLayout: get(formDescription, 'formItemLayout') || {},
          styles: get(formDescription, 'styles'),
        });
      case 'disease_select':
        return renderEditItem(get(formDescription, 'key'), <DiseaseSelect config={formDescription} />, {
          customFormItemLayout: get(formDescription, 'formItemLayout') || {},
          styles: get(formDescription, 'styles'),
        });
      case 'radio_with_input_number':
        return renderEditItem(get(formDescription, 'key'), <RadioWithInputNumber config={formDescription} />, {
          customFormItemLayout: get(formDescription, 'formItemLayout') || {},
          styles: get(formDescription, 'styles'),
        });
      case 'pregnancy_history':
        return renderEditItem(get(formDescription, 'key'), <PregnancyHistory config={formDescription} form={form} />, {
          customFormItemLayout: get(formDescription, 'formItemLayout') || {},
          styles: get(formDescription, 'styles'),
        });
      case 'input':
        return renderEditItem(
          get(formDescription, 'key'),
          <Input size="small" {...get(formDescription, 'inputProps')} />,
          {
            customFormItemLayout: get(formDescription, 'formItemLayout') || {},
            styles: get(formDescription, 'styles'),
          },
        );
      case 'fetus_appendages':
        return renderEditItem(
          get(formDescription, 'key'),
          <FoetalAppendage
            size="small"
            {...get(formDescription, 'inputProps')}
            renderEditItem={renderEditItem}
            form={form}
          />,
          {
            customFormItemLayout: get(formDescription, 'formItemLayout') || {},
            styles: get(formDescription, 'styles'),
          },
        );
      case 'multiple_input_with_label':
        return renderEditItem(get(formDescription, 'key'), <MultipleInputWithLabel config={formDescription} />, {
          customFormItemLayout: get(formDescription, 'formItemLayout') || {},
          styles: get(formDescription, 'styles'),
        });
      case 'input_with_label':
        return renderEditItem(get(formDescription, 'key'), <InputWithLabel config={formDescription} />, {
          customFormItemLayout: get(formDescription, 'formItemLayout') || {},
          styles: get(formDescription, 'styles'),
        });
      case 'id_number_input':
        return renderEditItem(
          get(formDescription, 'key'),
          <Input size="small" {...get(formDescription, 'inputProps')} onChange={get(events, 'handleIDNumberChange')} />,
          {
            customFormItemLayout: get(formDescription, 'formItemLayout') || {},
            styles: get(formDescription, 'styles'),
          },
        );
      case 'cron':
        return renderEditItem(get(formDescription, 'key'), <CronSelect {...get(formDescription, 'inputProps')} />, {
          customFormItemLayout: get(formDescription, 'formItemLayout') || {},
          styles: get(formDescription, 'styles'),
        });
      case 'trigger_type_select':
        return renderEditItem(
          get(formDescription, 'key'),
          <TriggerTypeSelect size="small" {...get(formDescription, 'inputProps')} />,
          {
            customFormItemLayout: get(formDescription, 'formItemLayout') || {},
            styles: get(formDescription, 'styles'),
          },
        );
      case 'text_area':
        return renderEditItem(
          get(formDescription, 'key'),
          <Input.TextArea size="small" {...get(formDescription, 'inputProps')} />,
          {
            customFormItemLayout: get(formDescription, 'formItemLayout') || {},
            styles: get(formDescription, 'styles'),
          },
        );
      case 'tree_select':
        return renderEditItem(
          get(formDescription, 'key'),
          <PermissionSelect size="small" {...get(formDescription, 'inputProps')} />,
          {
            customFormItemLayout: get(formDescription, 'formItemLayout') || {},
            styles: get(formDescription, 'styles'),
          },
        );
      case 'parent_select':
        return renderEditItem(
          get(formDescription, 'key'),
          <ParentPermissionSelect size="small" {...get(formDescription, 'inputProps')} />,
          {
            customFormItemLayout: get(formDescription, 'formItemLayout') || {},
            styles: get(formDescription, 'styles'),
          },
        );
      case 'input_number':
        return renderEditItem(
          get(formDescription, 'key'),
          <InputNumber size="small" min={0} {...get(formDescription, 'inputProps')} />,
          {
            customFormItemLayout: get(formDescription, 'formItemLayout') || {},
            styles: get(formDescription, 'styles'),
          },
        );
      case 'password':
        return renderEditItem(
          get(formDescription, 'key'),
          <Input.Password size="small" {...get(formDescription, 'inputProps')} />,
          {
            customFormItemLayout: get(formDescription, 'formItemLayout') || {},
            styles: get(formDescription, 'styles'),
          },
        );
      case 'validdate':
        return renderEditItem(
          get(formDescription, 'key'),
          <DataSelect
            size="small"
            dataSource={[
              { id: 30, name: '30天' },
              { id: 60, name: '60天' },
              { id: 90, name: '90天' },
              { id: 280, name: '一个孕周' },
            ]}
            valueKey="id"
            labelKey="name"
          />,
          {
            customFormItemLayout: get(formDescription, 'formItemLayout') || {},
            styles: get(formDescription, 'styles'),
          },
        );
      case 'editor':
        return renderEditItem(
          get(formDescription, 'key'),
          <CustomEditor size="small" {...get(formDescription, 'inputProps')} />,
          {
            customFormItemLayout: get(formDescription, 'formItemLayout') || {},
            styles: get(formDescription, 'styles'),
          },
        );
      case 'product':
        return get(formDescription, 'viewOnly')
          ? renderEditItem(
              get(formDescription, 'key'),
              <span>{get(keyBy(products, 'id'), `${get(data, get(formDescription, 'path'))}.name`)}</span>,
            )
          : renderEditItem(
              get(formDescription, 'key'),
              <DataSelect
                size="small"
                url="/products"
                valueKey="id"
                labelKey="name"
                {...get(formDescription, 'inputProps')}
              />,
              {
                customFormItemLayout: get(formDescription, 'formItemLayout') || {},
                styles: get(formDescription, 'styles'),
              },
            );
      case 'roles':
        return renderEditItem(
          get(formDescription, 'key'),
          <DataSelect
            size="small"
            url="/groups"
            valueKey="id"
            labelKey="nickname"
            mode="multiple"
            {...get(formDescription, 'inputProps')}
          />,
          {
            customFormItemLayout: get(formDescription, 'formItemLayout') || {},
            styles: get(formDescription, 'styles'),
          },
        );
      case 'device_status':
        return renderEditItem(
          get(formDescription, 'key'),
          <DeviceStatusSelect size="small" {...get(formDescription, 'inputProps')} />,
          {
            customFormItemLayout: get(formDescription, 'formItemLayout') || {},
            styles: get(formDescription, 'styles'),
          },
        );
      case 'address':
        return renderEditItem(
          get(formDescription, 'key'),
          <CascaderAddress size="small" {...get(formDescription, 'inputProps')} />,
          {
            customFormItemLayout: get(formDescription, 'formItemLayout') || {},
            styles: get(formDescription, 'styles'),
          },
        );
      case 'permission_type':
        return renderEditItem(
          get(formDescription, 'key'),
          <PermissionTypeSelect size="small" {...get(formDescription, 'inputProps')} />,
          {
            customFormItemLayout: get(formDescription, 'formItemLayout') || {},
            styles: get(formDescription, 'styles'),
          },
        );
      case 'upload_img':
        return renderEditItem(
          get(formDescription, 'key'),
          <UploadImg size="small" {...get(formDescription, 'inputProps')} allowUploadImages={10} />,
          {
            customFormItemLayout: get(formDescription, 'formItemLayout') || {},
            styles: get(formDescription, 'styles'),
          },
        );
      case 'single_date_picker':
        return renderEditItem(
          get(formDescription, 'key'),
          <DatePicker size="small" {...get(formDescription, 'inputProps')} />,
          {
            customFormItemLayout: get(formDescription, 'formItemLayout') || {},
            styles: get(formDescription, 'styles'),
          },
        );
      case 'apgar_score_input':
        return renderEditItem(
          get(formDescription, 'key'),
          <ApgarScoreInput size="small" config={formDescription} form={form} />,
          {
            customFormItemLayout: get(formDescription, 'formItemLayout') || {},
            styles: get(formDescription, 'styles'),
          },
        );
      case 'view_only':
        return renderEditItem(get(formDescription, 'key'), <span>{get(data, get(formDescription, 'path'))}</span>);
      default:
        return renderEditItem(
          get(formDescription, 'key'),
          <Input size="small" {...get(formDescription, 'inputProps')} />,
          {
            customFormItemLayout: get(formDescription, 'formItemLayout') || {},
            styles: get(formDescription, 'styles'),
          },
        );
    }
  };

  renderContent = () => {
    const { formDescriptions = [] } = this.props;
    let tempArr = [];
    let tempSpan = 0;
    let formArray = [];
    map(formDescriptions, (formDescription, index) => {
      if (!isNil(get(formDescription, 'span')) && !isNil(get(formDescription, 'offset'))) {
        if (get(formDescription, 'isNewRow')) {
          const renderArr = tempArr;
          tempSpan = 0;
          tempArr = [];
          formArray.push(this.renderRowAndCol(renderArr));
        }
        if (tempSpan < 25 && tempSpan + get(formDescription, 'span') + get(formDescription, 'offset') < 25) {
          tempSpan = tempSpan + get(formDescription, 'span') + get(formDescription, 'offset');
          tempArr.push(formDescription);
          if (Number(index) === formDescriptions.length - 1) {
            formArray.push(this.renderRowAndCol(tempArr));
            tempArr = [];
          }
        } else {
          const renderArr = tempArr;
          tempArr = [];
          formArray.push(this.renderRowAndCol(renderArr));
          tempSpan = get(formDescription, 'span') + get(formDescription, 'offset');
          tempArr.push(formDescription);
        }
      } else {
        formArray.push(this.renderItem(formDescription));
      }
    });
    if (!isEmpty(tempArr)) {
      formArray.push(this.renderRowAndCol(tempArr));
    }
    return formArray;
  };

  render() {
    return <>{this.renderContent()}</>;
  }
}

export default connect(({ select }) => ({
  products: get(select, 'products'),
}))(FormSection);
