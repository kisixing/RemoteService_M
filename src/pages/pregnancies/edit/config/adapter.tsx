import { map, get, keys, filter, isNil, set, indexOf, split, isObject, isUndefined } from 'lodash';
import moment, { Moment } from 'moment';
import { fixedSelects, getPregnancyHistoryFormDescriptions } from '@/components/BusinessComponents/PregnancyHistory';
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

// export const toApi = data => {
//   const result = {};
//   map(keys(data), key => {
//     if (indexOf(key, '_') > -1) {
//       const path = replace(key, '_', '.');
//       set(result, path, get(data, key));
//     } else if (indexOf(keys(result), key) > -1) {
//       if (get(data, key) instanceof Object) {
//         set(result, key, { ...get(data, key), ...get(result, key) });
//       }
//     } else {
//       set(result, key, get(data, key));
//     }
//   });
//   return result;
// };

// const omitItemsArray = ['pregnancyHistories'];

// export const mapDataToForm = (data, preKey = undefined) => {
//   let newData = {};

//   map(data, (item, key) => {
//     if (omitItemsArray.indexOf(key) > -1) return {};
//     if (item instanceof Object) {
//       newData = { ...newData, ...mapDataToForm(item, key), [key]: item };
//     } else {
//       // 假设是满足时间格式：2019-01-01
//       if (split(item, '-').length === 3) {
//         preKey ? set(newData, `${preKey}_${key}`, moment(item)) : set(newData, key, moment(item));
//       } else {
//         preKey ? set(newData, `${preKey}_${key}`, item) : set(newData, key, item);
//       }
//     }
//   });
//   return newData;
// };

export const fromApi = data => {
  const deliverWays = fixedSelects.deliverWays;
  const abortionWays = fixedSelects.abortionWays;
  const badPregnancies = fixedSelects.badPregnancies;
  const pregnancyHistories = map(get(data, 'pregnancyHistories'), pregnancyHistory => {
    // console.log(pregnancyHistory);
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
        `${get(pregnancyHistory, 'year')}-${get(pregnancyHistory, 'month')}`,
      hasPregnancy: !isNil(get(pregnancyHistory, 'fetalcount')) && !isNil(get(pregnancyHistory, 'hospital')),
    };
  });
  return {
    ...data,
    dob: moment(get(data, 'dob')),
    validateDate: moment(get(data, 'validateDate')),
    lmp: moment(get(data, 'lmp')),
    edd: moment(get(data, 'edd')),
    sureEdd: moment(get(data, 'sureEdd')),
    pregnancyHistories,
    personalProfilePreWeight: get(data, 'personalProfile.preweight'),
    personalProfilePreHeight: get(data, 'personalProfile.preheight'),
    personalProfileBMI: get(data, 'personalProfile.bmi'),
    menstrualHistoryMenarche: get(data, 'menstrualHistory.menarche'),
    menstrualHistoryMenstrualPeriod: get(data, 'menstrualHistory.menstrualPeriod'),
    menstrualHistoryMenstrualCycle: get(data, 'menstrualHistory.menstrualCycle'),
    menstrualHistoryDysmenorrhea: {
      dysmenorrhea: get(data, 'menstrualHistory.dysmenorrhea'),
      dysmenorrheaNote: get(data, 'menstrualHistory.dysmenorrheaNote'),
    },
    personalProfileSmoke: {
      smoke: get(data, 'personalProfile.smoke'),
      smokeNote: get(data, 'personalProfile.smokeNote'),
    },
    personalProfileAlcohol: {
      alcohol: get(data, 'personalProfile.alcohol'),
      alcoholNote: get(data, 'personalProfile.alcoholNote'),
    },
    partnerProfileSmoke: {
      smoke: get(data, 'partnerProfile.smoke'),
      smokeNote: get(data, 'partnerProfile.smokeNote'),
    },
    partnerProfileAlcohol: {
      alcohol: get(data, 'partnerProfile.alcohol'),
      alcoholNote: get(data, 'partnerProfile.alcoholNote'),
    },
    personalProfileHazardoussubstances: {
      hazardoussubstances: get(data, 'personalProfile.hazardoussubstances'),
      hazardoussubstancesNote: get(data, 'personalProfile.hazardoussubstancesNote'),
    },
    personalProfileRadioactivity: {
      radioactivity: get(data, 'personalProfile.radioactivity'),
      radioactivityNote: get(data, 'personalProfile.radioactivityNote'),
    },
    diseaseHistoryHypertension: {
      hypertension: get(data, 'diseaseHistory.hypertension'),
      hypertensionNote: get(data, 'diseaseHistory.hypertensionNote'),
    },
    diseaseHistoryDiabetes: {
      diabetes: get(data, 'diseaseHistory.diabetes'),
      diabetesNote: get(data, 'diseaseHistory.diabetesNote'),
    },
    diseaseHistoryCardiacDisease: {
      cardiacDisease: get(data, 'diseaseHistory.cardiacDisease'),
      cardiacDiseaseNote: get(data, 'diseaseHistory.cardiacDiseaseNote'),
    },
    partnerProfileDisease: get(data, 'partnerProfile.disease'),
    partnerOutpatientNO: get(data, 'partnerProfile.outpatientNO'),
  };
};

export const transPregnancyHistories = (nativePregnancyHistories, oldPregnancyHistories) => {
  const pregnancyHistories: any = [];
  map(nativePregnancyHistories, (historyValue, historyName) => {
    const fieldPaths = split(historyName, '_');
    if (isObject(pregnancyHistories[get(fieldPaths, '1')])) {
      pregnancyHistories[get(fieldPaths, '1')].gravidityindex = Number(get(fieldPaths, '1')) + 1;
    } else {
      pregnancyHistories[get(fieldPaths, '1')] = {};
      pregnancyHistories[get(fieldPaths, '1')].gravidityindex = Number(get(fieldPaths, '1')) + 1;
    }
    switch (get(fieldPaths, '0')) {
      case 'pregnancyEnd':
        set(pregnancyHistories[get(fieldPaths, '1')], 'year', (historyValue as Moment).year());
        set(pregnancyHistories[get(fieldPaths, '1')], 'month', (historyValue as Moment).month() + 1);
        break;
      case 'complicationNote':
      case 'hospital':
      case 'gestationalWeek':
      case 'fetalcount':
      case 'puerperalFever':
      case 'hemorrhage':
        set(pregnancyHistories[get(fieldPaths, '1')], get(fieldPaths, '0'), historyValue);
        break;
      case 'deliverWay':
      case 'abortionWay':
        set(pregnancyHistories[get(fieldPaths, '1')], historyValue, true);
        break;
      case 'badPregnancy':
        map(historyValue, item => {
          set(pregnancyHistories[get(fieldPaths, '1')], item, true);
        });
        break;
      case 'childDeath':
      case 'childDeathNote':
      case 'childGender':
      case 'sequela':
      case 'childDeformity':
      case 'neonateWeight':
      case 'neonateHeight':
        if (isUndefined(pregnancyHistories[get(fieldPaths, '1')].children)) {
          pregnancyHistories[get(fieldPaths, '1')].children = [];
        }
        // eslint-disable-next-line no-case-declarations
        const tempChildren = pregnancyHistories[get(fieldPaths, '1')].children;
        if (isObject(tempChildren[get(fieldPaths, '2')])) {
          set(tempChildren[get(fieldPaths, '2')], get(fieldPaths, '0'), historyValue);
        } else {
          tempChildren[get(fieldPaths, '2')] = {
            [get(fieldPaths, '0')]: historyValue,
          };
        }
        break;
      default:
        break;
    }
  });
  map(pregnancyHistories, (item, index) => {
    item.id = get(oldPregnancyHistories, `${index}.id`);
  });
  return pregnancyHistories;
};

export const toApi = async (data: any) => {
  let pregnancyHistories = [];
  if (get(data, 'pregnancyHistories.0.pregnancyHistoryType') === 'table') {
    pregnancyHistories = get(data, 'pregnancyHistories');
  } else {
    // 获取原生孕产史字段信息
    const pregnancyHistoryKeys = keys(await getPregnancyHistoryFormDescriptions());
    // 来自表单的原始孕产史信息
    const nativePregnancyHistories = {};
    map(data, (item, key) => {
      const fieldPaths = split(key, '_');
      if (fieldPaths.length > 1 && indexOf(pregnancyHistoryKeys, get(fieldPaths, '0')) > -1) {
        set(nativePregnancyHistories, key, item);
      }
    });
    pregnancyHistories = transPregnancyHistories(nativePregnancyHistories, get(data, 'pregnancyHistories'));
  }
  console.log(pregnancyHistories);
  return {
    ...data,
    partnerProfile: {
      ...get(data, 'partnerProfile'),
      ...get(data, 'partnerProfileSmoke'),
      ...get(data, 'partnerProfileAlcohol'),
      disease: get(data, 'partnerProfileDisease'),
      outpatientNO: get(data, 'partnerOutpatientNO'),
    },
    personalProfile: {
      ...get(data, 'personalProfile'),
      ...get(data, 'personalProfileSmoke'),
      ...get(data, 'personalProfileAlcohol'),
      ...get(data, 'personalProfileRadioactivity'),
      ...get(data, 'personalProfileHazardoussubstances'),
      preweight: get(data, 'personalProfilePreWeight'),
      preheight: get(data, 'personalProfilePreHeight'),
      bmi: get(data, 'personalProfileBMI'),
    },
    menstrualHistory: {
      ...get(data, 'menstrualHistory'),
      ...get(data, 'menstrualHistoryDysmenorrhea'),
      menarche: get(data, 'menstrualHistoryMenarche'),
      menstrualPeriod: get(data, 'menstrualHistoryMenstrualPeriod'),
      menstrualCycle: get(data, 'menstrualHistoryMenstrualCycle'),
    },
    diseaseHistory: {
      ...get(data, 'diseaseHistory'),
      ...get(data, 'diseaseHistoryHypertension'),
      ...get(data, 'diseaseHistoryDiabetes'),
      ...get(data, 'diseaseHistoryCardiacDisease'),
    },
    familyHistory: {
      ...get(data, 'familyHistory'),
    },
    pregnancyHistories,
  };
};
