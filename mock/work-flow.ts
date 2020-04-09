import { Request, Response } from 'express';

const getWorkFlows = (req: Request, res: Response) => {
  res.json({
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
  });
};

export default {
  'GET /api/work-flows': getWorkFlows,
};
