import React, { useState, useEffect, useRef } from 'react';
import { Steps, Input, Button, Row, Col, message, Modal, Form } from 'antd';
import { get, isNil, isEmpty, map } from 'lodash';
import styles from './index.less';
import { router } from 'umi';
import { connect } from 'dva';
import PasswordModal from './password-modal';
import { ArrowLeftOutlined, UploadOutlined } from '@ant-design/icons';
import request from '@/utils/request';

const { Step } = Steps;

export const AccountSetting = (props: any) => {
  const [phone, setPhone] = useState();
  const [userInfo, setUserInfo] = useState({});
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [errorTip, setErrorTip] = useState('');
  const [countDown, setCountDown] = useState(60);
  const [captchaCode, setCaptchaCode] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [passwordForm] = Form.useForm();

  useEffect(() => {
    let roles = '';
    map(get(props, 'userInfo.groups'), (group, index) => {
      if (index + 1 === get(props, 'userInfo.groups.length')) {
        roles += get(group, 'nickname');
      } else {
        roles = `${roles + get(group, 'nickname')}/`;
      }
    });
    setUserInfo({
      username: get(props, 'userInfo.firstName'),
      roles,
      account: get(props, 'userInfo.login'),
      password: '**********',
      phone: get(props, 'userInfo.telephone'),
      avatar: get(props, 'userInfo.imageUrl') || 'http://pic4.zhimg.com/50/v2-7fece9a613445edb78271216c8c20c6d_hd.jpg',
    });
  }, []);

  const handleUploadAvatar = () => {};

  const handleChangePhone = () => {
    if (isEmpty(phone)) {
      setErrorTip('手机号码不正确，请重新输入');
      return;
    }
    if (isEmpty(captchaCode)) {
      setErrorTip('验证码不正确，请重新输入');
      return;
    }
    message.success('修改手机验证码成功');
    setShowPhoneModal(false);
  };

  const handleChangePassword = async () => {
    await passwordForm.validateFields();
    await request.post('/account/change-password', {
      data: {
        currentPassword: passwordForm.getFieldValue('oldPassword'),
        newPassword: passwordForm.getFieldValue('newPassword'),
      },
    });
    message.success('修改密码成功');
    setShowPasswordModal(false);
  };

  const getCaptCha = () => {
    if (isEmpty(phone)) {
      setErrorTip('手机号码不正确，请重新输入');
      return;
    }
    let temp = countDown - 1;
    setCountDown(temp);
    setErrorTip('');
    const countDownId = setInterval(() => {
      temp -= 1;
      setCountDown(temp);
    }, 1000);
    setTimeout(() => {
      clearInterval(countDownId);
      setCountDown(60);
    }, 60000);
  };

  const renderViewItem = (label, value, type = 'default') => {
    return (
      <Row className={styles.panelContentItem}>
        <Col span={4} style={{ textAlign: 'right' }}>
          <span className={styles.panelContentItemTitle}>{label}：</span>
        </Col>
        <Col span={8} style={{ marginLeft: 8 }}>
          <span>{value}</span>
        </Col>
        {type === 'password' && (
          <Col span={4} offset={7}>
            <Button
              type="primary"
              size="small"
              onClick={() => {
                setShowPasswordModal(true);
              }}
            >
              修改
            </Button>
          </Col>
        )}
        {/* {type === 'phone' && (
          <Col span={4} offset={7}>
            <Button
              type="primary"
              size="small"
              onClick={() => {
                setShowPhoneModal(true);
              }}
            >
              修改
            </Button>
          </Col>
        )} */}
      </Row>
    );
  };

  return (
    <div className={styles.panel}>
      <h3 className={styles.panelTitle}>
        <ArrowLeftOutlined
          style={{ marginRight: 8, cursor: 'pointer' }}
          onClick={() => {
            router.goBack();
          }}
        />
        个人设置
      </h3>
      <img alt="avatar" className={styles.avatar} src={get(userInfo, 'avatar')} />
      <div className={styles.avatarUpload}>
        <UploadOutlined />
        <span style={{ display: 'block', fontSize: 14, fontWeight: 'bold' }}>点击上传</span>
      </div>
      <div className={styles.panelContent}>
        {renderViewItem('姓名', get(userInfo, 'username'))}
        {renderViewItem('角色', get(userInfo, 'roles'))}
        {renderViewItem('账号', get(userInfo, 'account'))}
        {renderViewItem('密码', get(userInfo, 'password'), 'password')}
        {/* {renderViewItem('手机号码', get(userInfo, 'phone'), 'phone')} */}
      </div>
      {showPasswordModal && (
        <Modal
          visible={showPasswordModal}
          title="修改密码"
          onOk={handleChangePassword}
          onCancel={() => {
            setShowPasswordModal(false);
          }}
        >
          <Form form={passwordForm} onFinish={handleChangePassword} labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
            <Form.Item label="输入旧密码" name="oldPassword" rules={[{ required: true, message: '旧密码不能为空' }]}>
              <Input.Password placeholder="输入旧密码" />
            </Form.Item>
            <Form.Item
              label="新密码"
              name="newPassword"
              rules={[
                { required: true, message: '新密码不能为空' },
                { min: 5, message: '密码至少为5位' },
              ]}
            >
              <Input.Password placeholder="输入新密码" />
            </Form.Item>
            <Form.Item
              label="确认密码"
              dependencies={['newPassword']}
              name="confirmPassword"
              rules={[
                {
                  required: true,
                  message: '确认密码不能为空',
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue('newPassword') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject('确认密码与新密码不一致');
                  },
                }),
              ]}
            >
              <Input.Password placeholder="输入确认密码" />
            </Form.Item>
          </Form>
        </Modal>
      )}
      {showPhoneModal && (
        <Modal
          visible={showPhoneModal}
          title="修改手机号码"
          onOk={handleChangePhone}
          onCancel={() => {
            setShowPhoneModal(false);
          }}
        >
          <Row className={styles.phoneModalRow}>
            <Col span={6} className={styles.phoneModalRowCol}>
              <span>当前手机号码：</span>
            </Col>
            <Col span={18}>
              <span>{get(userInfo, 'phone')}</span>
            </Col>
          </Row>
          <Row className={styles.phoneModalRow}>
            <Col span={6} className={styles.phoneModalRowCol}>
              <span>新手机号码：</span>
            </Col>
            <Col span={12}>
              <Input
                onChange={e => {
                  setPhone(e.target.value);
                }}
                required
              />
            </Col>
            <Col span={5} offset={1}>
              <Button disabled={countDown !== 60} type="primary" style={{ width: '100%' }} onClick={getCaptCha}>
                {countDown !== 60 ? `${countDown}秒后获取` : '获取验证码'}
              </Button>
            </Col>
          </Row>
          <Row className={styles.phoneModalRow}>
            <Col span={6} className={styles.phoneModalRowCol}>
              <span>输入验证码：</span>
            </Col>
            <Col span={12}>
              <Input
                onChange={e => {
                  setCaptchaCode(e.target.value);
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <span style={{ color: '#ff0000' }}>{errorTip}</span>
            </Col>
          </Row>
        </Modal>
      )}
    </div>
  );
};

export default connect(({ user }) => {
  return {
    userInfo: get(user, 'currentUser'),
  };
})(AccountSetting);
