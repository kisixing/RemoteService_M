import React from 'react';
import { Select } from 'antd';
import { map, get } from 'lodash';

const statusMapping = {
  orderStatusMapping: [
    {
      value: 0,
      title: '待付款',
    },
    {
      value: 1,
      title: '已支付',
    },
    {
      value: 2,
      title: '使用中',
    },
    {
      value: 3,
      title: '已完成',
    },
    {
      value: 4,
      title: '已关闭',
    },
    {
      value: 5,
      title: '逾期中',
    },
    {
      value: 6,
      title: '已取消',
    },
  ],
  genderMapping: [
    {
      value: 0,
      title: '男',
    },
    {
      value: 1,
      title: '女',
    },
    {
      value: 2,
      title: '未知',
    },
  ],
  IDCardMapping: [
    {
      value: 0,
      title: '身份证',
    },
    {
      value: 4,
      title: '港澳台居民居住证',
    },
    {
      value: 1,
      title: '护照',
    },
    {
      value: 2,
      title: '回乡证',
    },
    {
      value: 3,
      title: '台胞证',
    },
    {
      value: 5,
      title: '其它',
    },
  ],
  jobMapping: [
    {
      value: '国家公务员',
      title: '国家公务员',
    },
    {
      value: '专业技术人员',
      title: '专业技术人员',
    },
    {
      value: '企业管理人员',
      title: '企业管理人员',
    },
    {
      value: '自由职业者',
      title: '自由职业者',
    },
    {
      value: '工人',
      title: '工人',
    },
    {
      value: '现役军人',
      title: '现役军人',
    },
    {
      value: '个体经营者',
      title: '个体经营者',
    },
    {
      value: '职员',
      title: '职员',
    },
    {
      value: '农民',
      title: '农民',
    },
    {
      value: '学生',
      title: '学生',
    },
    {
      value: '退（离）休人员',
      title: '退（离）休人员',
    },
    {
      value: '其它',
      title: '其它',
    },
  ],
  ethnicMapping: [
    {
      title: '汉族',
      value: '汉族',
    },
    {
      title: '蒙古族',
      value: '蒙古族',
    },
    {
      title: '回族',
      value: '回族',
    },
    {
      title: '藏族',
      value: '藏族',
    },
    {
      title: '维吾尔族',
      value: '维吾尔族',
    },
    {
      title: '苗族',
      value: '苗族',
    },
    {
      title: '彝族',
      value: '彝族',
    },
    {
      title: '壮族',
      value: '壮族',
    },
    {
      title: '布依族',
      value: '布依族',
    },
    {
      title: '朝鲜族',
      value: '朝鲜族',
    },
    {
      title: '满族',
      value: '满族',
    },
    {
      title: '侗族',
      value: '侗族',
    },
    {
      title: '瑶族',
      value: '瑶族',
    },
    {
      title: '白族',
      value: '白族',
    },
    {
      title: '土家族',
      value: '土家族',
    },
    {
      title: '哈尼族',
      value: '哈尼族',
    },
    {
      title: '哈萨克族',
      value: '哈萨克族',
    },
    {
      title: '傣族',
      value: '傣族',
    },
    {
      title: '黎族',
      value: '黎族',
    },
    {
      title: '傈僳族',
      value: '傈僳族',
    },
    {
      title: '佤族',
      value: '佤族',
    },
    {
      title: '畲族',
      value: '畲族',
    },
    {
      title: '高山族',
      value: '高山族',
    },
    {
      title: '拉祜族',
      value: '拉祜族',
    },
    {
      title: '水族',
      value: '水族',
    },
    {
      title: '东乡族',
      value: '东乡族',
    },
    {
      title: '纳西族',
      value: '纳西族',
    },
    {
      title: '景颇族',
      value: '景颇族',
    },
    {
      title: '柯尔克孜族',
      value: '柯尔克孜族',
    },
    {
      title: '土族',
      value: '土族',
    },
    {
      title: '达斡尔族',
      value: '达斡尔族',
    },
    {
      title: '仫佬族',
      value: '仫佬族',
    },
    {
      title: '羌族',
      value: '羌族',
    },
    {
      title: '布朗族',
      value: '布朗族',
    },
    {
      title: '撒拉族',
      value: '撒拉族',
    },
    {
      title: '毛难族',
      value: '毛难族',
    },
    {
      title: '仡佬族',
      value: '仡佬族',
    },
    {
      title: '锡伯族',
      value: '锡伯族',
    },
    {
      title: '阿昌族',
      value: '阿昌族',
    },
    {
      title: '普米族',
      value: '普米族',
    },
    {
      title: '塔吉克族',
      value: '塔吉克族',
    },
    {
      title: '怒族',
      value: '怒族',
    },
    {
      title: '乌孜别克族',
      value: '乌孜别克族',
    },
    {
      title: '俄罗斯族',
      value: '俄罗斯族',
    },
    {
      title: '鄂温克族',
      value: '鄂温克族',
    },
    {
      title: '崩龙族',
      value: '崩龙族',
    },
    {
      title: '保安族',
      value: '保安族',
    },
    {
      title: '裕固族',
      value: '裕固族',
    },
    {
      title: '京族',
      value: '京族',
    },
    {
      title: '塔塔尔族',
      value: '塔塔尔族',
    },
    {
      title: '独龙族',
      value: '独龙族',
    },
    {
      title: '鄂伦春族',
      value: '鄂伦春族',
    },
    {
      title: '赫哲族',
      value: '赫哲族',
    },
    {
      title: '门巴族',
      value: '门巴族',
    },
    {
      title: '珞巴族',
      value: '珞巴族',
    },
    {
      title: '基诺族',
      value: '基诺族',
    },
    {
      title: '其它',
      value: '其它',
    },
  ],
  maritalMapping: [
    {
      value: 0,
      title: '已婚',
    },
    {
      value: 1,
      title: '未婚',
    },
    {
      value: 2,
      title: '离异',
    },
    {
      value: 3,
      title: '丧偶',
    },
    {
      value: 4,
      title: '再婚',
    },
  ],
  provinceMapping: [
    {
      code: '11',
      title: '北京市',
      value: '北京市',
    },
    {
      code: '12',
      title: '天津市',
      value: '天津市',
    },
    {
      code: '13',
      title: '河北省',
      value: '河北省',
    },
    {
      code: '14',
      title: '山西省',
      value: '山西省',
    },
    {
      code: '15',
      title: '内蒙古自治区',
      value: '内蒙古自治区',
    },
    {
      code: '21',
      title: '辽宁省',
      value: '辽宁省',
    },
    {
      code: '22',
      title: '吉林省',
      value: '吉林省',
    },
    {
      code: '23',
      title: '黑龙江省',
      value: '黑龙江省',
    },
    {
      code: '31',
      title: '上海市',
      value: '上海市',
    },
    {
      code: '32',
      title: '江苏省',
      value: '江苏省',
    },
    {
      code: '33',
      title: '浙江省',
      value: '浙江省',
    },
    {
      code: '34',
      title: '安徽省',
      value: '安徽省',
    },
    {
      code: '35',
      title: '福建省',
      value: '福建省',
    },
    {
      code: '36',
      title: '江西省',
      value: '江西省',
    },
    {
      code: '37',
      title: '山东省',
      value: '山东省',
    },
    {
      code: '41',
      title: '河南省',
      value: '河南省',
    },
    {
      code: '42',
      title: '湖北省',
      value: '湖北省',
    },
    {
      code: '43',
      title: '湖南省',
      value: '湖南省',
    },
    {
      code: '44',
      title: '广东省',
      value: '广东省',
    },
    {
      code: '45',
      title: '广西壮族自治区',
      value: '广西壮族自治区',
    },
    {
      code: '46',
      title: '海南省',
      value: '海南省',
    },
    {
      code: '50',
      title: '重庆市',
      value: '重庆市',
    },
    {
      code: '51',
      title: '四川省',
      value: '四川省',
    },
    {
      code: '52',
      title: '贵州省',
      value: '贵州省',
    },
    {
      code: '53',
      title: '云南省',
      value: '云南省',
    },
    {
      code: '54',
      title: '西藏自治区',
      value: '西藏自治区',
    },
    {
      code: '61',
      title: '陕西省',
      value: '陕西省',
    },
    {
      code: '62',
      title: '甘肃省',
      value: '甘肃省',
    },
    {
      code: '63',
      title: '青海省',
      value: '青海省',
    },
    {
      code: '64',
      title: '宁夏回族自治区',
      value: '宁夏回族自治区',
    },
    {
      code: '65',
      title: '新疆维吾尔自治区',
      value: '新疆维吾尔自治区',
    },
    {
      code: '66',
      title: '香港特别行政区',
      value: '香港特别行政区',
    },
    {
      code: '67',
      title: '澳门特别行政区',
      value: '澳门特别行政区',
    },
    {
      code: '68',
      title: '台湾省',
      value: '台湾省',
    },
  ],
  fetalpositionMapping: [
    {
      value: 0,
      title: '左枕前（LOA）',
    },
    {
      value: 1,
      title: '左枕横（LOT）',
    },
    {
      value: 2,
      title: '左枕后（LOP）',
    },
    {
      value: 3,
      title: '右枕前（LOA）',
    },
    {
      value: 4,
      title: '右枕横（LOT）',
    },
    {
      value: 5,
      title: '右枕后（LOP）',
    },
    {
      value: 6,
      title: '左骶前（LSA）',
    },
    {
      value: 7,
      title: '左骶横（LST）',
    },
    {
      value: 8,
      title: '左骶后（LSP）',
    },
    {
      value: 9,
      title: '右骶前（LSA）',
    },
    {
      value: 10,
      title: '右骶横（LST）',
    },
    {
      value: 11,
      title: '右骶后（LSP）',
    },
  ],
};

interface IProps {
  type:
    | 'orderStatusMapping'
    | 'IDCardMapping'
    | 'jobMapping'
    | 'ethnicMapping'
    | 'maritalMapping'
    | 'provinceMapping'
    | 'genderMapping'
    | 'fetalpositionMapping';

  showSearch: true | false;
  placeholder?: string;
}

export default (props: IProps = { type: 'IDCardMapping', showSearch: false }) => {
  return (
    <Select
      showSearch={props.showSearch}
      size="small"
      placeholder="请选择"
      allowClear
      filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
      {...props}
    >
      {map(get(statusMapping, props.type), status => (
        <Select.Option value={status.value}>{status.title}</Select.Option>
      ))}
    </Select>
  );
};
