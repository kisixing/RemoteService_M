import { map, get, keys, filter, isNil, set, indexOf, split, isObject, isUndefined } from 'lodash';
import moment, { Moment } from 'moment';
import { fixedSelects, getPregnancyHistoryFormDescriptions } from '@/components/PregnancyHistory';
import request from '@/utils/request';

export const formDescriptionsFromApi = data => {
  return map(data, item => {
    return {
      ...item,
      fields: map(get(item, 'fields'), field => {
        return {
          ...field,
          isNewRow: get(field, 'is_new_row'),
          inputType: get(field, 'input_type'),
          inputProps: JSON.parse(`${get(field, 'input_props')}`),
          formItemLayout: JSON.parse(`${get(field, 'form_item_layout')}`),
          rules: JSON.parse(`${get(field, 'rules')}`),
          styles: JSON.parse(`${get(field, 'styles')}`),
        };
      }),
    };
  });
};

export const fromApi = (data: any, formDescriptionsWithoutSection: any) => {
  // console.log
  // map()
  return []
};

export const toApi = (data: any, formDescriptionsWithoutSection: any) => {
  console.log(formDescriptionsWithoutSection);
};
