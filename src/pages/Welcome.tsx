import React from 'react';
import { Card, Typography, Alert } from 'antd';

export default (): React.ReactNode => (
  <Card>
    <Alert
      message="母婴云后台管理现已发布，点击左侧菜单体验所有功能吧。"
      type="success"
      showIcon
      banner
      style={{
        margin: -12,
        marginBottom: 24,
      }}
    />
    <Typography.Text strong>基于 ant-design pro 开发</Typography.Text>
  </Card>
);
