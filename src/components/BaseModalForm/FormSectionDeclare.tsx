import React from 'react';
import { ColProps } from 'antd/lib/col';

// 表单配置
export interface IFormDescriptions {
  // 唯一ID
  id: number;
  // 当前 section 下的唯一key
  key: string;
  // form 字段的标签
  label?: string;
  // 转换规则
  tranfer_rules?: ITranferRules;
  // 验证规则
  rules?: IRule[];
  // 字段的组件类型
  input_type?: InputType;
  // 组件的特殊配置
  special_config?: ISpecialConfig;
  // 排序值，越小越靠前
  sort?: number;
  // 本字段占格，0~24
  span?: number;
  // 与上一个字段的间隔
  offset?: number;
  // 是否为新行
  is_new_row?: 0 | 1;
  // 受控组件 input props
  input_props?: IInputProps;
  // 字段标签与输入框的占比
  form_item_layout?: IFormItemLayout;
  // 所属 section
  section_id?: number;
  // 自定义样式
  styles?: React.CSSProperties;
  // 是否启用该字段
  is_active?: 0 | 1;
}

// 表单块配置
export interface IFormSections {
  // 唯一ID
  id: number;
  // 名称
  name: string;
  // 唯一标识
  flag: string;
  // 排序
  sort: number;
  // 模块名
  module_name: string;
}

// TODO: 转换规则,待完善
export interface ITranferRules {
  // 类型
  type?: string;
  // 路径
  path?: string;
}

// 验证规则详情 https://ant.design/components/form-cn/#Rule
export interface IRule {
  enum?: any[];
  len?: number;
  max?: number;
  message?: string;
  min?: number;
  pattern?: RegExp;
  required?: boolean;
  transform?: (value: any) => any;
  type?: 'string' | 'number' | 'boolean' | 'url' | 'email';
  validator?: (rule: any, value: any) => Promise<any>;
  whitespace?: boolean;
  validateTrigger?: string | string[];
}

// 组件类型
export type InputType =
  | 'input'
  | 'single_date_picker'
  | 'normal_checkbox_with_input'
  | 'checkbox_group'
  | 'multiple_input_with_label'
  | 'select_with_input'
  | 'normal_select'
  | 'input_number'
  | 'checkbox_with_input'
  | 'normal_checkbox_with_input'
  | 'input_with_label'
  | 'normal_checkbox_with_input'
  | 'radio_with_input_number'
  | 'disease_select'
  | 'pregnancy_history'
  | 'address'
  | 'apgar_score_input'
  | 'fetus_appendages'
  | 'fetal_count'
  | 'id_number_input'
  | 'country_select'
  | 'select_with_options'
  | 'pregnant_radio'
  | 'has_pregnancy';

export interface IInputProps extends React.AllHTMLAttributes<HTMLFormControlsCollection> {}

// TODO: 特殊配置，类型太多，待完善，针对不同的 input_type，写入不同的组件里面
export interface ISpecialConfig {
  type?: string;
  options?: any[];
}

// 表单标签与输入框的占比
export interface IFormItemLayout {
  labelCol: ColProps;
  wrapperCol: ColProps;
}
