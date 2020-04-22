import { Request, Response } from 'express';

const getQuestions = (req: Request, res: Response) => {
  res.json([
    {
      id: 1,
      title: '测试问卷1',
      category: '测试问卷1',
      createTime: '2019-01-01',
    },
    {
      id: 2,
      title: '测试问卷1',
      category: '测试问卷1',
      createTime: '2019-01-01',
    },
  ]);
};

export default {
  'GET /api/follow-up/questions': getQuestions,
};
