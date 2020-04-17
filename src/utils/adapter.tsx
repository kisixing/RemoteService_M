import { map, get, reduce, concat, keyBy } from 'lodash';

export const formDescriptionsFromApi = data => {
  return map(data, item => {
    return {
      ...item,
      fields: map(get(item, 'fields'), field => {
        return {
          ...field,
          isNewRow: get(field, 'is_new_row'),
          inputType: get(field, 'input_type'),
          inputProps: get(field, 'input_props') && JSON.parse(`${get(field, 'input_props')}`),
          formItemLayout: get(field, 'form_item_layout') && JSON.parse(`${get(field, 'form_item_layout')}`),
          rules: get(field, 'rules') && JSON.parse(`${get(field, 'rules')}`),
          styles: get(field, 'styles') && JSON.parse(`${get(field, 'styles')}`),
        };
      }),
    };
  });
};

export const formDescriptionsWithoutSectionApi = formDescriptions => {
  return keyBy(
    reduce(
      formDescriptions,
      (sum, formDescription) => {
        return concat(sum, get(formDescription, 'fields'));
      },
      [],
    ),
    'key',
  );
};
