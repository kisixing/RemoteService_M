import React, { useEffect } from 'react';
import request from '@/utils/request';
import { formDescriptionsFromApi, formDescriptionsWithoutSectionApi } from '@/utils/adapter';
import { get } from 'lodash';
import PregnancyHistoryForm from './index-form';
import PregnancyHistoryTable from './index-table';
// fixedSelects 固定选项，渲染表单项，在 adapter 中有使用，勿删
export const fixedSelects = {
  // 分娩方式
  deliverWays: ['vaginalDelivery', 'cesareanSection', 'forceps', 'vacuumAssisted', 'breechMidwifery'],
  // 流产方式
  abortionWays: ['medicalAbortion', 'surgicalAbortion', 'naturalAbortion', 'currettage'],
  // 不良生育史
  badPregnancies: ['inducedLabor', 'fetusdeath', 'ectopicPregnancy', 'hydatidMole', 'multiple'],
};

export const getPregnancyHistoryFormDescriptions = async () => {
  return formDescriptionsWithoutSectionApi(
    formDescriptionsFromApi(await request.get('/form-descriptions?moduleName=pregnantHistorySetting')),
  );
};

export default (props: any) => {
  const specialConfig = get(props, 'config.special_config') && JSON.parse(get(props, 'config.special_config'));

  return get(specialConfig, 'type') === 'table' ? (
    <PregnancyHistoryTable {...props} />
  ) : (
    <PregnancyHistoryForm {...props} />
  );
};
