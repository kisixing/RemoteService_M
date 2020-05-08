import { map, get, isNil, set, split, isObject, last } from 'lodash';
import moment, { Moment } from 'moment';
import { fixedSelects } from '@/components/BusinessComponents/PregnancyHistory';
import { formatTimeToUTC } from '@/utils/format';

export const formDescriptionsFromApi = (data: any) => {
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

export const fromApi = (data: any, nativeFormDescriptions: any) => {
  const result = {};
  map(nativeFormDescriptions, (desctiption, key) => {
    const { tranfer_rules: tranferRules } = desctiption;
    let type = 'default';
    let path = key;
    let nativeKey = key;
    if (tranferRules && JSON.parse(tranferRules)) {
      const tranferRulesJson = JSON.parse(tranferRules);
      type = get(tranferRulesJson, 'type') ? get(tranferRulesJson, 'type') : 'default';
      path = get(tranferRulesJson, 'path') ? get(tranferRulesJson, 'path') : key;
      nativeKey = get(tranferRulesJson, 'path') ? (last(split(get(tranferRulesJson, 'path'), ',')) as string) : key;
    }

    switch (type) {
      case 'key_and_keyNote':
        set(result, `${key}.key`, get(data, path));
        set(result, `${key}.keyNote`, get(data, `${path}Note`));
        break;
      case 'moment':
        set(result, key, moment(get(data, path)));
        break;
      case 'pregnancyHistories':
        const deliverWays = fixedSelects.deliverWays;
        const abortionWays = fixedSelects.abortionWays;
        const badPregnancies = fixedSelects.badPregnancies;
        const pregnancyHistories = map(get(data, 'pregnancyHistories'), pregnancyHistory => {
          let deliverWay = null;
          let abortionWay = null;
          const badPregnancy: any = [];
          map(deliverWays, item => {
            get(pregnancyHistory, item) && (deliverWay = item);
          });
          map(abortionWays, item => {
            get(pregnancyHistory, item) && (abortionWay = item);
          });
          map(badPregnancies, item => {
            get(pregnancyHistory, item) && badPregnancy.push(item);
          });
          return {
            ...pregnancyHistory,
            deliverWay,
            abortionWay,
            badPregnancy,
            pregnancyEnd:
              get(pregnancyHistory, 'year') &&
              get(pregnancyHistory, 'month') &&
              moment(`${get(pregnancyHistory, 'year')}-${get(pregnancyHistory, 'month')}`),
            hasPregnancy: !isNil(get(pregnancyHistory, 'fetalcount')) && !isNil(get(pregnancyHistory, 'hospital')),
          };
        });
        set(result, key, pregnancyHistories);
        break;
      case 'default':
      default:
        set(result, key, get(data, path));
        break;
    }
  });
  return {
    ...data,
    ...result,
  };
};

export const transPregnancyHistories = (oldPregnancyHistories: any) => {
  const newPregnancyHistories: any = [];
  map(oldPregnancyHistories, (pregnancyHistory, index) => {
    set(newPregnancyHistories, `${index}.id`, get(pregnancyHistory, 'id'));
    map(pregnancyHistory, (historyValue, historyName) => {
      switch (historyName) {
        case 'pregnancyEnd':
          set(newPregnancyHistories, `${index}.year`, (historyValue as Moment).year());
          set(newPregnancyHistories, `${index}.month`, (historyValue as Moment).month() + 1);
          break;
        case 'complicationNote':
        case 'hospital':
        case 'gestationalWeek':
        case 'fetalcount':
        case 'puerperalFever':
        case 'hemorrhage':
          set(newPregnancyHistories, `${index}.${historyName}`, historyValue);
          break;
        case 'children':
          const children = (historyValue as []).slice(0, get(pregnancyHistory, 'fetalcount'));
          set(newPregnancyHistories, `${index}.${historyName}`, children);
          break;
        case 'deliverWay':
          map(fixedSelects.deliverWays, deliverWayName => {
            set(newPregnancyHistories, `${index}.${deliverWayName}`, false);
          });
          set(newPregnancyHistories, `${index}.${historyValue}`, true);
          break;
        case 'abortionWay':
          map(fixedSelects.abortionWays, abortionWayName => {
            set(newPregnancyHistories, `${index}.${abortionWayName}`, false);
          });
          set(newPregnancyHistories, `${index}.${historyValue}`, true);
          break;
        case 'badPregnancy':
          map(historyValue, item => {
            set(newPregnancyHistories, `${index}.${item}`, true);
          });
          break;
        default:
          break;
      }
    });
  });

  return newPregnancyHistories;
};

export const toApi = async (data: any, nativeFormDescriptions: any) => {
  // 先过滤 object 类型
  const isObjectKeyArray: any[] = [];
  const isNotObjectKeyArray: any[] = [];
  map(data, (item, key) => {
    if (isObject(item)) {
      isObjectKeyArray.push(key);
    } else {
      isNotObjectKeyArray.push(key);
    }
  });
  const result = {};
  const dataKeys: any[] = [...isObjectKeyArray, ...isNotObjectKeyArray];
  map(dataKeys, key => {
    const item = get(data, key);
    const tranferRules = get(nativeFormDescriptions, `${key}.tranfer_rules`);
    let type = 'default';
    let path = key;
    if (tranferRules && JSON.parse(tranferRules)) {
      const tranferRulesJson = JSON.parse(tranferRules);
      type = get(tranferRulesJson, 'type') ? get(tranferRulesJson, 'type') : 'default';
      path = get(tranferRulesJson, 'path') ? get(tranferRulesJson, 'path') : key;
    }

    switch (type) {
      case 'key_and_keyNote':
        set(result, path, get(item, 'key'));
        set(result, `${path}Note`, get(item, 'keyNote'));
        break;
      case 'moment':
        set(result, path, formatTimeToUTC(item));
        break;
      case 'pregnancyHistories':
        let pregnancyHistories = [];
        if (get(data, 'pregnancyHistories.0.pregnancyHistoryType') === 'table') {
          pregnancyHistories = get(data, 'pregnancyHistories');
        } else {
          pregnancyHistories = transPregnancyHistories(get(data, 'pregnancyHistories'));
        }
        set(result, path, pregnancyHistories);
        break;
      case 'default':
      default:
        set(result, path, item);
        break;
    }
  });
  return result;
};
