import React from 'react';
import GGEditor, { Flow, RegisterNode } from 'gg-editor';
import { pick, get, map, concat, isNil, isEmpty, isEqual } from 'lodash';
import styles from './index.less';

const data = {
  nodes: [
    {
      id: '0',
      label: '任务开始',
      x: 100,
      y: 300,
      shape: 'rect',
      anchorPoints: [[1, 0.5]],
    },
    {
      id: '1',
      label: 'diff>3600?',
      x: 250,
      y: 300,
      shape: 'diamond',
      anchorPoints: [
        [0.5, 0],
        [0, 0.5],
        [0.5, 1],
      ],
    },
    {
      id: '2',
      label: '提取队列',
      x: 350,
      y: 150,
      shape: 'rect',
    },
    {
      id: '3',
      label: '增加队列',
      x: 350,
      y: 450,
      shape: 'rect',
    },
    {
      id: '4',
      label: '执行队列',
      x: 500,
      y: 100,
      shape: 'rect',
    },
    {
      id: '5',
      label: '通知用户',
      x: 500,
      y: 150,
      shape: 'rect',
    },
    {
      id: '6',
      label: '通知管理员',
      x: 500,
      y: 200,
      shape: 'rect',
    },
  ],
  edges: [
    {
      source: '0',
      target: '1',
    },
    {
      label: 'true',
      source: '1',
      target: '2',
    },
    {
      label: 'false',
      source: '1',
      target: '3',
    },
    {
      source: '2',
      target: '4',
    },
    {
      source: '2',
      target: '5',
    },
    {
      source: '2',
      target: '6',
    },
  ],
};

export const workFlowJson2 = {
  name: '随访工作流',
  description: '任务描述',
  type: '总任务',
  x: 100,
  y: 300,
  shape: 'rect',
  id: '0',
  anchorPoints: [[1, 0.5]],
  edges: [
    {
      source: '0',
      target: '1',
    },
  ],
  workflows: {
    ConditionalFlow: {
      type: '条件流程',
      name: '条件流程名称',
      when: '如果',
      id: '1',
      x: 250,
      y: 300,
      target: ['2', '3'],
      shape: 'diamond',
      edges: [
        {
          label: 'true',
          source: '1',
          target: '2',
        },
        {
          label: 'false',
          source: '1',
          target: '3',
        },
      ],
      anchorPoints: [
        [0.5, 0],
        [0, 0.5],
        [0.5, 1],
      ],
      then: {
        SequentialFlow: {
          type: '顺序流程',
          name: '顺序流程名称',
          execute: {
            Work: {
              type: '具体执行',
              name: '提取队列',
              repeatable: 1,
              x: 350,
              id: '2',
              y: 150,
              shape: 'rect',
              edges: [
                {
                  source: '2',
                  target: '4',
                },
                {
                  source: '2',
                  target: '5',
                },
                {
                  source: '2',
                  target: '6',
                },
              ],
              rule: [],
            },
          },
          then: {
            ParallelFlow: {
              type: '并行流程',
              name: '并行流程名称',
              execute: {
                Work2: {
                  type: '具体执行',
                  name: '通知管理员',
                  repeatable: 1,
                  id: '6',
                  x: 500,
                  y: 200,
                  shape: 'rect',
                  rule: [],
                },
                Work1: {
                  type: '具体执行',
                  name: '执行队列',
                  repeatable: 1,
                  id: '4',
                  x: 500,
                  y: 100,
                  shape: 'rect',
                  rule: [],
                },
                Work3: {
                  type: '具体执行',
                  name: '通知用户',
                  id: '5',
                  repeatable: 1,
                  x: 500,
                  y: 150,
                  shape: 'rect',
                  rule: [],
                },
              },
            },
          },
        },
      },
      otherwise: {
        SequentialFlow: {
          type: '顺序流程',
          name: '顺序流程名称',
          execute: {
            Work: {
              type: '具体执行',
              name: '增加队列',
              repeatable: 1,
              id: '3',
              x: 350,
              y: 450,
              shape: 'rect',
              rule: [],
            },
          },
          then: {},
        },
      },
    },
  },
};

export default class Draw extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      workFlowNodes: {},
      workFlowJson: get(props, 'data'),
    };
  }
  //   defaultProps = {
  //     workFlowJson,
  //   };

  componentDidMount() {
    const { workFlowJson } = this.state;
    this.setState({
      workFlowNodes: this.transferNodes(workFlowJson),
    });
  }

  componentWillReceiveProps(nextProps: any) {
    console.log(get(nextProps, 'data'));
    if (!isEqual(get(nextProps, 'data'), get(this.props, 'workFlowJson'))) {
      this.setState({
        workFlowNodes: this.transferNodes(get(nextProps, 'data')),
        workFlowJson: get(nextProps, 'data'),
      });
    }
  }

  //   static getDerivedStateFromProps(nextProps, prevState) {
  //     //   console.log(this.props)
  //     console.log(get(nextProps, 'workFlowJson'), get(prevState, 'workFlowJson'));
  //     if (!isEqual(get(nextProps, 'workFlowJson'), get(prevState, 'workFlowJson'))) {
  //       return {
  //         workFlowNodes: this.transferNodes(get(nextProps, 'workFlowJson')),
  //         workFlowJson: get(nextProps, 'workFlowJson'),
  //       };
  //     }
  //     return null;
  //   }

  transferNodes = (workFlowJson: any) => {
    let nodes: any = [
      { ...pick(workFlowJson, ['x', 'y', 'shape', 'id', 'anchorPoints']), label: get(workFlowJson, 'name') },
    ];
    let edges: any = get(workFlowJson, 'edges');
    const nodesAndEdges = this.getNodesAndEdges(get(workFlowJson, 'workflows'));
    return {
      nodes: concat(nodes, get(nodesAndEdges, 'nodes')),
      edges: concat(edges, get(nodesAndEdges, 'edges')),
    };
  };

  getNodesAndEdges = workflows => {
    let nodes = [];
    let edges = [];
    let temp = {};
    map(workflows, item => {
      if (get(item, 'type') === '条件流程') {
        nodes.push({
          ...pick(item, ['x', 'y', 'shape', 'id', 'anchorPoints']),
          label: get(item, 'name'),
        });
        edges = isNil(get(item, 'edges')) ? [] : concat(edges, get(item, 'edges'));
        temp = this.getNodesAndEdges(get(item, 'then'));
        nodes = concat(nodes, get(temp, 'nodes'));
        edges = isNil(get(temp, 'edges')) ? [] : concat(edges, get(temp, 'edges'));
        temp = this.getNodesAndEdges(get(item, 'otherwise'));
        nodes = concat(nodes, get(temp, 'nodes'));
        edges = isNil(get(temp, 'edges')) ? [] : concat(edges, get(temp, 'edges'));
      }
      if (get(item, 'type') === '具体执行') {
        nodes.push({
          ...pick(item, ['x', 'y', 'shape', 'id', 'anchorPoints']),
          label: get(item, 'name'),
        });
        edges = isNil(get(item, 'edges')) ? [] : concat(edges, get(item, 'edges'));
      }
      if (get(item, 'type') === '顺序流程') {
        temp = this.getNodesAndEdges(get(item, 'execute'));
        nodes = concat(nodes, get(temp, 'nodes'));
        edges = isNil(get(temp, 'edges')) ? [] : concat(edges, get(temp, 'edges'));
        temp = this.getNodesAndEdges(get(item, 'then'));
        nodes = concat(nodes, get(temp, 'nodes'));
        edges = isNil(get(temp, 'edges')) ? [] : concat(edges, get(temp, 'edges'));
      }
      if (get(item, 'type') === '并行流程') {
        temp = this.getNodesAndEdges(get(item, 'execute'));
        nodes = concat(nodes, get(temp, 'nodes'));
        edges = isNil(get(temp, 'edges')) ? [] : concat(edges, get(temp, 'edges'));
      }
    });
    return { nodes, edges };
  };

  render() {
    const { workFlowNodes } = this.state;
    return (
      <GGEditor className={styles.ggeditor}>
        {!isEmpty(workFlowNodes) && (
          <Flow
            className={styles.flow}
            data={workFlowNodes}
            graphConfig={{
              modes: {
                default: ['drag-canvas', 'zoom-canvas'],
              },
            }}
          />
        )}
        <RegisterNode
          name="customNode"
          config={{
            getCustomConfig() {
              return {
                default: {
                  fill: '#36cfc9',
                  stroke: '#87e8de',
                  labelCfg: {
                    style: {
                      fill: '#36cfc9',
                    },
                    offset: -10,
                  },
                  linkPoints: {
                    left: true,
                    bottom: true,
                    fill: 'blue',
                  },
                  icon: {
                    show: true,
                    width: 35,
                    height: 35,
                  },
                },
              };
            },
          }}
          extend="bizFlowNode"
        />
      </GGEditor>
    );
  }
}
