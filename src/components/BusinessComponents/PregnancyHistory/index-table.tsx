import React from 'react';
import { Table, Button, Input } from 'antd';
import { map, get, isNil, set, isEmpty, filter, indexOf, split, cloneDeep } from 'lodash';
import moment, { Moment } from 'moment';
import defaultConfig from './config/index-table';
import BaseFormComponent from '../../BaseFormComponent';

export const renderContent = (children: any, rowData: any) => {
  let rowSpan = 0;
  // 如果是原生孕次，fetalcount 为 0，则取1，否则取 fetalcount
  if (!get(rowData, 'isNotNative')) {
    rowSpan = get(rowData, 'fetalcount') === 0 ? 1 : get(rowData, 'fetalcount');
  }
  return {
    children,
    props: {
      rowSpan,
    },
  };
};

// TODO: 小孩情况那里修改无变化
export default class PregnancyHistoryTable extends React.Component {
  constructor(props: any) {
    super(props);
    const columns = this.generateColumns(defaultConfig.columns);

    this.fromApi = this.generateFromApi(defaultConfig.apiField);
    this.toApi = this.generateToApi(defaultConfig.apiField);

    this.state = {
      data: [],
      columns,
      selectedRowKeys: [],
    };
  }

  componentDidMount() {
    const { value, onChange } = this.props;
    const initData: any = this.fromApi(value);
    const resultData = this.transDataByFetalcount(initData);
    // 一开始抛出数据是为了把 pregnancyHistoryType 带出去
    onChange && onChange(initData);
    this.setState({
      data: resultData,
    });
  }

  generateFromApi = (apiField: any) => (data: any[]) => {
    return map(data, item => {
      const resultData = {
        id: get(item, 'id'),
        pregnancyHistoryType: 'table',
      };
      const childs: any = [];
      map(apiField, (field, key) => {
        const { type, path } = field;
        switch (type) {
          case 'none':
            break;
          case 'pregnancyEnd':
            set(
              resultData,
              type,
              get(item, 'year') && get(item, 'month') && moment(`${get(item, 'year')}-${get(item, 'month')}`),
            );
            break;
          case 'select':
            map(get(field, 'options'), (option: any) => {
              get(item, option) && set(resultData, key, option);
            });
            break;
          case 'children':
            for (let i = 0; i < get(item, 'fetalcount'); i++) {
              const pathArr = split(path, '.');
              set(childs, `${i}.${key}`, get(item, `${pathArr[0]}.${i}.${pathArr[1]}`));
            }
            set(resultData, 'childs', childs);
            break;
          case 'normal':
          default:
            set(resultData, key, get(item, path));
            break;
        }
      });
      return resultData;
    });
  };

  generateToApi = (apiField: any) => (pregnancyHistories: any) => {
    const resultData: any = [];
    map(pregnancyHistories, pregnancyHistory => {
      const tempHistory = {
        id: get(pregnancyHistory, 'id'),
      };
      map(pregnancyHistory, (item, itemKey) => {
        set(tempHistory, 'pregnancyHistoryType', 'table');
        if (itemKey === 'childs') {
          set(tempHistory, 'children', item);
        } else {
          map(apiField, (field, fieldKey) => {
            const { type, path, options } = field;
            if (itemKey === fieldKey) {
              switch (type) {
                case 'none':
                  break;
                case 'pregnancyEnd':
                  const year = item ? (item as Moment).year() : null;
                  const month = item ? (item as Moment).month() : null;
                  set(tempHistory, 'year', year);
                  set(tempHistory, 'month', month + 1);
                  break;
                case 'select':
                  if (indexOf(options, item) > -1) {
                    set(tempHistory, item, true);
                  }
                  break;
                case 'normal':
                default:
                  set(tempHistory, itemKey, item);
                  break;
              }
            }
          });
        }
      });
      resultData.push(tempHistory);
    });

    return resultData;
  };

  generateColumns = (columns: any) => {
    const newColumns = map(columns, column => {
      let renderFunc = null;
      let children = null;
      const tempColumn = cloneDeep(column);

      if (get(tempColumn, 'children')) {
        set(tempColumn, 'children', this.generateColumns(get(tempColumn, 'children')));
      } else {
        const key = get(tempColumn, 'key');
        const renderConfig = get(tempColumn, 'renderConfig');
        const { inputType, inputProps, isChildCol } = renderConfig;
        switch (inputType) {
          case 'view':
            renderFunc = (value: any, rowData: any, index: number) => {
              return renderContent(value, rowData);
            };
            break;
          case 'pregnancyEnd':
            renderFunc = (value: any, rowData: any, index: number) => {
              children = (
                <BaseFormComponent
                  config={{ inputType: 'month_picker' }}
                  value={value}
                  onChange={this.handleInputChange({ key, rowData, inputType, value })}
                />
              );
              return renderContent(children, rowData);
            };
            break;
          case 'deliverWay':
            renderFunc = (value: any, rowData: any, index: number) => {
              const config = {
                inputType: 'select_with_options',
                special_config: get(renderConfig, 'special_config'),
                inputProps,
              };
              children = (
                <BaseFormComponent
                  config={config}
                  value={value}
                  onChange={this.handleInputChange({ key, rowData, inputType, value })}
                />
              );
              return renderContent(children, rowData);
            };
            break;
          case 'fetalcount':
            renderFunc = (value: any, rowData: any, index: number) => {
              const config = {
                inputType: 'input_number',
              };
              children = (
                <BaseFormComponent
                  config={config}
                  value={value}
                  min={0}
                  onChange={this.handleFetalcountChange(value, rowData)}
                />
              );
              return renderContent(children, rowData);
            };
            break;
          case 'checkbox':
            renderFunc = (value: any, rowData: any, index: number) => {
              children = (
                <BaseFormComponent
                  config={{ inputType }}
                  defaultChecked={value}
                  onChange={this.handleInputChange({ key, rowData, inputType, value, isChildCol })}
                />
              );
              return renderContent(children, isChildCol ? {} : rowData);
            };
            break;
          case 'input':
          case 'input_number':
          case 'normal_select':
          default:
            renderFunc = (value: any, rowData: any, index: number) => {
              children = (
                <BaseFormComponent
                  config={{ inputType, inputProps }}
                  {...inputProps}
                  value={value}
                  type={get(renderConfig, 'typeMapping')}
                  onChange={this.handleInputChange({ key, rowData, inputType, value, isChildCol })}
                />
              );
              return renderContent(children, isChildCol ? {} : rowData);
            };
            break;
        }
      }
      return {
        ...tempColumn,
        render: renderFunc,
      };
    });
    return newColumns;
  };

  handleInputChange = (configData: {
    key: string;
    inputType: string;
    value: any;
    rowData: any;
    isChildCol?: boolean;
  }) => (e: any) => {
    const { onChange } = this.props;
    const { data } = this.state;
    const { index, childId, childIndex, fetalcount } = configData.rowData;
    if (configData.isChildCol) {
      const childs = get(configData.rowData, 'childs') || [];
      if (isEmpty(childs)) {
        for (let j = 0; j < fetalcount; j++) {
          (childs as any).push({});
        }
      }
      switch (configData.inputType) {
        case 'normal_select':
        case 'input_number':
          map(childs, (child, tempChildindex) => {
            if (tempChildindex === childIndex) {
              set(child, configData.key, e);
            }
          });
          break;
        case 'checkbox':
          map(childs, (child, tempChildindex) => {
            if (tempChildindex === childIndex) {
              set(child, configData.key, get(e, 'target.checked'));
            }
          });
          break;
        case 'input':
        default:
          map(childs, (child, tempChildindex) => {
            if (tempChildindex === childIndex) {
              set(child, configData.key, get(e, 'target.value'));
            }
          });
          break;
      }
      map(data, item => {
        if (get(item, 'index') === index) {
          set(item, 'childs', childs);
        }
      });
    } else {
      switch (configData.inputType) {
        case 'pregnancyEnd':
        case 'deliverWay':
        case 'normal_select':
        case 'input_number':
          map(data, item => {
            if (get(item, 'index') === index) {
              set(item, configData.key, e);
            }
          });
          break;
        case 'checkbox':
          map(data, item => {
            if (get(item, 'index') === index) {
              set(item, configData.key, get(e, 'target.checked'));
            }
          });
          break;
        case 'input':
        default:
          map(data, item => {
            if (get(item, 'index') === index) {
              set(item, configData.key, get(e, 'target.value'));
            }
          });
          break;
      }
    }
    onChange && onChange(this.toApi(data));
    this.setState({
      data,
    });
  };

  transDataByFetalcount = (responseData: any) => {
    const newData: any = [];
    // 记录孕次
    let gravidityIndex = 0;
    map(responseData, (item, index) => {
      const fetalcount = get(item, 'fetalcount');
      const isNotNative = get(item, 'isNotNative');
      if (!isNotNative) {
        newData.push({
          ...item,
          key: Math.random(),
          index: gravidityIndex + 1,
          childIndex: 0,
          childId: get(item, `childs.0.id`),
          childGender: get(item, `childs.0.childGender`),
          neonateWeight: get(item, `childs.0.neonateWeight`),
          sequela: get(item, `childs.0.sequela`),
          childDeath: get(item, `childs.0.childDeath`),
          childDeathNote: get(item, `childs.0.childDeathNote`),
        });
        if (fetalcount > 1) {
          for (let i = 1; i < fetalcount; i++) {
            newData.push({
              ...item,
              key: Math.random(),
              isNotNative: true,
              // fetalcount: 0,
              childIndex: i,
              childId: get(item, `childs.${i}.id`),
              childGender: get(item, `childs.${i}.childGender`),
              neonateWeight: get(item, `childs.${i}.neonateWeight`),
              sequela: get(item, `childs.${i}.sequela`),
              childDeath: get(item, `childs.${i}.childDeath`),
              childDeathNote: get(item, `childs.${i}.childDeathNote`),
            });
          }
        }
        gravidityIndex += 1;
      }
    });
    return newData;
  };

  handleFetalcountChange = (value: any, rowData: any) => (fetalcount: number | undefined) => {
    const { data } = this.state;
    const { onChange } = this.props;
    const tempData: any = this.getNativeData(data);
    map(tempData, (item: object, key) => {
      if (get(item, 'index') === get(rowData, 'index') && !get(item, 'isNotNative')) {
        set(item, 'fetalcount', Number(fetalcount) > 0 ? fetalcount : 1);
      }
    });
    const resultData = this.transDataByFetalcount(tempData);
    onChange && onChange(this.toApi(tempData));

    this.setState({
      data: resultData,
    });
  };

  handleRowSelectionChange = (selectedRowKeys, selectedRows) => {
    this.setState({
      selectedRowKeys,
    });
  };

  handleAddPregnancy = () => {
    const { data } = this.state;
    const tempData: any = this.getNativeData(data);
    tempData.push({
      key: Math.random(),
      index: tempData.length + 1,
      fetalcount: 0,
    });
    this.setState({
      data: this.transDataByFetalcount(tempData),
    });
  };

  getNativeData = (data: any[]) => filter(data, (item: any) => !get(item, 'isNotNative'));

  removePregnancy = () => {
    const { selectedRowKeys } = this.state;
    const { data } = this.state;
    const tempData: any = filter(data, (item: any) => {
      if (get(item, 'isNotNative')) return false;
      if (indexOf(selectedRowKeys, get(item, 'key')) > -1) return false;
      return true;
    });
    this.setState({
      data: this.transDataByFetalcount(tempData),
      selectedRowKeys: [],
    });
  };

  render() {
    const { columns, data, selectedRowKeys, test } = this.state;
    return (
      <>
        <div style={{ marginBottom: 8 }}>
          <Button size="small" type="primary" onClick={this.handleAddPregnancy}>
            添加孕次
          </Button>
          <Button
            disabled={isEmpty(selectedRowKeys)}
            size="small"
            type="danger"
            style={{ marginLeft: 8 }}
            onClick={this.removePregnancy}
          >
            删除选中孕次
          </Button>
        </div>
        <Table
          rowSelection={{
            onChange: this.handleRowSelectionChange,
            renderCell: (checked, rowData, index, originNode) => {
              return renderContent(originNode, rowData);
            },
          }}
          columns={columns}
          dataSource={data}
          bordered
          pagination={false}
          size="small"
        />
      </>
    );
  }
}
