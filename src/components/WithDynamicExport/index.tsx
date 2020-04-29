import { dynamic } from 'umi';

// 动态导出
export default (WrappedComponent: any) => {
  return dynamic({
    loader: async () => WrappedComponent,
  });
};
