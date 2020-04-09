import React from 'react';
import JSONEditor from 'jsoneditor';
import { Row, Col, Button } from 'antd';
import { isEmpty, indexOf, map, get } from 'lodash';
import request from '@/utils/request';
import Draw from './Draw';

const templates = [
  {
    text: '条件流程',
    title: '插入一个条件流程',
    className: 'jsoneditor-type-object',
    field: 'ConditionalFlow',
    value: {
      type: '条件流程',
      name: '条件流程名称',
      when: '如果',
      then: {},
      otherwise: {},
    },
  },
  {
    text: '顺序流程',
    title: '插入一个顺序流程',
    className: 'jsoneditor-type-object',
    field: 'SequentialFlow',
    value: {
      type: '顺序流程',
      name: '顺序流程名称',
      execute: {},
      then: {},
    },
  },
  {
    text: '并行流程',
    title: '插入一个并行流程',
    className: 'jsoneditor-type-object',
    field: 'ParallelFlow',
    value: {
      type: '并行流程',
      name: '并行流程名称',
      execute: {},
    },
  },
  {
    text: '具体执行',
    title: '插入一个具体执行',
    className: 'jsoneditor-type-object',
    field: 'Work',
    value: {
      type: '具体执行',
      name: '具体执行名称',
      repeatable: 1,
      rule: [],
    },
  },
  {
    text: '保存规则',
    title: '插入一个保存规则',
    className: 'jsoneditor-type-object',
    field: 'Rule',
    value: {
      type: 10,
      name: '保存规则名称',
      expression: '表达式',
      actiontype: '执行类型',
      parameters: [],
    },
  },
];

export default class WorkFlow extends React.Component {
  JSONEditorRef = undefined;

  editor = undefined;

  state = {
    hasError: false,
    errors: null,
    workFlowJson: {},
  };

  async componentDidMount() {
    const options = {
      language: 'zh-CN',
      modes: ['tree', 'preview'],
      //   modes: ['tree', 'view', 'form', 'code', 'text', 'preview'],
      templates,
      onValidationError: (errors: any) => {
        // console.log(errors);
        if (!isEmpty(errors)) {
          this.setState({ hasError: true, errors });
        } else {
          this.setState({ hasError: false, errors });
        }
      },
      onValidate: (json: any) => {
        let errors: any = [];
        // console.log(json);
        const keys = [
          { name: 'name', type: 'stringOrNumber' },
          { name: 'description', type: 'stringOrNumber' },
          { name: 'type', type: 'stringOrNumber' },
          { name: 'workflows', type: 'object' },
        ];
        map(keys, key => {
          const result = this.getError(json, key, []);
          if (result) {
            errors.push(result);
          }
        });
        errors = errors.concat(this.validateData(json.workflows, ['workflows']));
        return errors;
      },
    };
    this.editor = new JSONEditor(this.JSONEditorRef, options);
    const initialJson = await request.get('/work-flows');
    this.setState({
      workFlowJson: initialJson,
    });
    // const initialJson = {
    //   name: '任务名称',
    //   description: '任务描述',
    //   type: '任务类型',
    //   workflows: {},
    // };
    this.editor.set(initialJson);

    // get json
    // const updatedJson = editor.get();
  }

  validateData = (json: any, paths: any, isRule = false) => {
    let errors: any = [];
    if (!isRule) {
      map(json, (item, index) => {
        if (index === 'ConditionalFlow') {
          const keys = [
            { name: 'type', type: 'stringOrNumber' },
            { name: 'name', type: 'stringOrNumber' },
            { name: 'when', type: 'stringOrNumber' },
            { name: 'then', type: 'object' },
            { name: 'otherwise', type: 'object' },
          ];
          map(keys, key => {
            const result = this.getError(item, key, [...paths, index]);
            if (result) {
              errors.push(result);
            }
          });
          errors = errors.concat(this.validateData(get(item, 'then'), [...paths, index, 'then']));
          errors = errors.concat(this.validateData(get(item, 'otherwise'), [...paths, index, 'otherwise']));
        }
        if (index === 'SequentialFlow') {
          const keys = [
            { name: 'type', type: 'stringOrNumber' },
            { name: 'name', type: 'stringOrNumber' },
            { name: 'execute', type: 'object' },
            { name: 'then', type: 'object' },
          ];
          map(keys, key => {
            const result = this.getError(item, key, [...paths, index]);
            if (result) {
              errors.push(result);
            }
          });
          errors = errors.concat(this.validateData(get(item, 'execute'), [...paths, index, 'execute']));
          errors = errors.concat(this.validateData(get(item, 'then'), [...paths, index, 'then']));
        }
        if (index === 'ParallelFlow') {
          const keys = [
            { name: 'type', type: 'stringOrNumber' },
            { name: 'name', type: 'stringOrNumber' },
            { name: 'execute', type: 'object' },
          ];
          map(keys, key => {
            const result = this.getError(item, key, [...paths, index]);
            if (result) {
              errors.push(result);
            }
          });
          errors = errors.concat(this.validateData(get(item, 'execute'), [...paths, index, 'execute']));
        }
        if (index === 'Work') {
          const keys = [
            { name: 'type', type: 'stringOrNumber' },
            { name: 'name', type: 'stringOrNumber' },
            { name: 'repeatable', type: 'stringOrNumber' },
            { name: 'rule', type: 'object' },
          ];
          map(keys, key => {
            const result = this.getError(item, key, [...paths, index]);
            if (result) {
              errors.push(result);
            }
          });
          map(get(item, 'rule'), (rule, i) => {
            errors = errors.concat(this.validateData(rule, [...paths, index, 'rule', i], true));
          });
        }
      });
    } else {
      const keys = [
        { name: 'type', type: 'stringOrNumber' },
        { name: 'name', type: 'stringOrNumber' },
        { name: 'expression', type: 'stringOrNumber' },
        { name: 'actiontype', type: 'stringOrNumber' },
        { name: 'parameters', type: 'object' },
      ];
      map(keys, key => {
        const result = this.getError(json, key, paths);
        if (result) {
          errors.push(result);
        }
      });
    }

    return errors;
  };

  getError = (value: any, key: object, paths: any) => {
    if (get(key, 'type') === 'stringOrNumber') {
      if (!get(value, get(key, 'name')) || indexOf(['string', 'number'], typeof get(value, get(key, 'name'))) === -1) {
        return {
          path: [...paths],
          message: `字段${get(key, 'name')}必填且为字符串或数字`,
        };
      }
    } else if (get(key, 'type') === 'object') {
      if (!get(value, get(key, 'name')) || indexOf(['object'], typeof get(value, get(key, 'name'))) === -1) {
        return {
          path: [...paths],
          message: `字段${get(key, 'name')}必填且为对象`,
        };
      }
    }

    return false;
  };

  handleSave = () => {
    // console.log(JSON.stringify(this.editor.get()));
    // console.log(this.editor.get());
    this.setState({
      workFlowJson: this.editor.get(),
    });
  };

  render() {
    const { hasError, workFlowJson } = this.state;
    console.log(workFlowJson);
    return (
      <>
        <Row>
          <Col span={11}>
            <div
              ref={(node: any) => {
                this.JSONEditorRef = node;
              }}
            ></div>
            <Button
              style={{ marginTop: 16, float: 'right' }}
              size="small"
              type="primary"
              onClick={this.handleSave}
              disabled={hasError}
            >
              保存
            </Button>
          </Col>
          {!isEmpty(workFlowJson) && (
            <Col span={12} offset={1}>
              <Draw data={workFlowJson} />
            </Col>
          )}
        </Row>
      </>
    );
  }
}
