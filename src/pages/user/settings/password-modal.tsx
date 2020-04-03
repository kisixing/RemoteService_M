import React from 'react';
import { Modal } from 'antd';

export default (props: any) => {
  const handleCancel = () => {
    const { onCancel } = props;
    onCancel && onCancel();
  };

  const handleSubmit = () => {
    // const { onCancel } = props;
    // onCancel && onCancel();
    console.log('submit');
  };

  return (
    <Modal visible title="修改密码" onOk={handleSubmit} onCancel={handleCancel}>
      zzz
    </Modal>
  );
};
