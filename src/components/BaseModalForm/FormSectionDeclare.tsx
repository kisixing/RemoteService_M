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
  | 'input'                       // 普通输入框
  | 'single_date_picker'          // 单个日期选择框
  | 'checkbox_group'              // 多个 checkbox
  | 'multiple_input_with_label'   // 多个输入框
  | 'select_with_input'           // 下拉选择后输入
  | 'select_with_options'         // 下拉选择，参数自带，TODO: 与上一个重复，待优化
  | 'normal_select'               // 常规选择，选项固定，
  | 'input_number'                // 数字输入
  | 'checkbox_with_input'         // 打钩选择后输入
  | 'normal_checkbox_with_input'  // 打钩选择后输入，形如 key,keyNote，其中keyNote 为 json 字符串格式
  | 'checkbox_with_single_input'  // 打钩选择后输入，形如 key,keyNote，其中keyNote 为数字或单个字符串
  | 'pure_checkbox'               // 纯净的 checkbox
  | 'input_with_label'            // 输入框带前置或后置 label
  | 'radio_with_input_number'     // 单选带输入数字
  | 'disease_select'              // 疾病选择
  // 以下是特殊情况，一般无需配置
  | 'pregnancy_history'           // 孕产史
  | 'address'                     // 地址选择
  | 'apgar_score_input'           // 胎儿评分
  | 'fetus_appendages'            // 胎盘附属物
  | 'fetal_count'                 // 胎数
  | 'id_number_input'             // 身份证号码输入
  | 'country_select'              // 国家选择
  | 'pregnant_radio'              // 单选，TODO: 待优化
  | 'has_pregnancy';              // 是否怀孕

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
