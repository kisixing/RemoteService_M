import React, { useState } from 'react';
import { Steps, Input, Button, Row, Col, message } from 'antd';
import { get, isNil, isEmpty } from 'lodash';
import styles from './index.less';
import { router } from 'umi';

const { Step } = Steps;

export default (props: any) => {
  const [phone, setPhone] = useState();
  const [step, setStep] = useState(0);
  const [countDown, setCountDown] = useState(60);
  const [countDownLogin, setCountDownLogin] = useState(5);
  const [errorTip, setErrorTip] = useState('');
  const [password, setPassword] = useState('');
  const [captchaCode, setCaptchaCode] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const goNext = () => {
    if (isNil(phone)) {
      setErrorTip('手机号码不能为空');
    }

    setStep(1);
  };

  const getCaptcha = () => {
    message.success('获取验证码成功，请注意查收');
    let temp = countDown - 1;
    setCountDown(temp);
    const countDownId = setInterval(() => {
      temp -= 1;
      setCountDown(temp);
    }, 1000);
    setTimeout(() => {
      clearInterval(countDownId);
      setCountDown(60);
    }, 60000);
  };

  const handlePhoneChange = e => {
    setPhone(get(e, 'target.value'));
  };

  const handlePasswordChange = e => {
    setPassword(get(e, 'target.value'));
  };

  const handleConfirmPasswordChange = e => {
    setConfirmPassword(get(e, 'target.value'));
  };

  const handleCaptchaCodeChange = e => {
    setCaptchaCode(get(e, 'target.value'));
  };

  const handleSubmit = () => {
    const params = {
      phone,
      password,
      confirmPassword,
      captchaCode,
    };
    console.log(params);

    // TODO: 对接找回密码，假设成功
    setStep(2);
    let temp = countDownLogin;
    const countDownLoginId = setInterval(() => {
      temp -= 1;
      setCountDownLogin(temp);
    }, 1000);
    setTimeout(() => {
      router.push('/user/login');
      clearInterval(countDownLoginId);
      setCountDownLogin(5);
    }, 5000);
  };

  return (
    <div className={styles.panel}>
      <Steps current={step}>
        <Step title="确认账号" />
        <Step title="重置密码" />
        <Step title="重置成功" />
      </Steps>
      {step === 0 && (
        <div className={styles.phonePanel}>
          <Row className={styles.panelItem}>
            <Col className={styles.panelItemLabel} span={8}>
              <span>已绑定手机号码：</span>
            </Col>
            <Col span={16}>
              <Input placeholder="请输入账号绑定的手机号码" value={phone} onChange={handlePhoneChange} />
            </Col>
          </Row>
          <br />
          {!isEmpty(errorTip) && <span className={styles.tip}>*{errorTip}</span>}
          <br />
          <Row>
            <Col span={24}>
              <Button type="primary" style={{ width: '100%' }} onClick={goNext}>
                下一步
              </Button>
            </Col>
          </Row>
        </div>
      )}
      {step === 1 && (
        <div className={styles.resetPanel}>
          <Row className={styles.panelItem}>
            <Col className={styles.panelItemLabel} span={6}>
              <span>新密码：</span>
            </Col>
            <Col span={18}>
              <Input.Password value={password} onChange={handlePasswordChange} />
            </Col>
          </Row>
          <Row className={styles.panelItem}>
            <Col className={styles.panelItemLabel} span={6}>
              <span>确认新密码：</span>
            </Col>
            <Col span={18}>
              <Input.Password value={confirmPassword} onChange={handleConfirmPasswordChange} />
            </Col>
          </Row>
          {!isEmpty(confirmPassword) && confirmPassword !== password && (
            <span className={styles.tip}>两次密码输入不一致</span>
          )}
          <Row className={styles.panelItem}>
            <Col className={styles.panelItemLabel} span={6}>
              <span>手机号码：</span>
            </Col>
            <Col span={18}>
              <span>{phone}</span>
            </Col>
          </Row>
          <Row className={styles.panelItem}>
            <Col className={styles.panelItemLabel} span={6}>
              <span>验证码：</span>
            </Col>
            <Col span={9}>
              <Input placeholder="请输入6位短信验证码" onChange={handleCaptchaCodeChange} />
            </Col>
            <Col span={8} offset={1}>
              <Button disabled={countDown !== 60} type="primary" style={{ width: '100%' }} onClick={getCaptcha}>
                {countDown === 60 ? '获取验证码' : `${countDown}秒后获取`}
              </Button>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Button
                disabled={
                  isEmpty(password) ||
                  isEmpty(confirmPassword) ||
                  isEmpty(captchaCode) ||
                  isEmpty(phone) ||
                  confirmPassword !== password
                }
                type="primary"
                style={{ width: '100%' }}
                onClick={handleSubmit}
              >
                确认修改
              </Button>
            </Col>
          </Row>
        </div>
      )}
      {step === 2 && (
        <div className={styles.resultPanel}>
          <h2>重置密码成功</h2>
          <h5 className={styles.resultPanelTip}>
            <span style={{ fontSize: 16, color: '#ff0000' }}>{countDownLogin} </span> 秒之后自动跳转登录页
          </h5>
          <Button
            className={styles.resultGoLogin}
            type="primary"
            onClick={() => {
              router.push('/user/login');
            }}
          >
            立即登录
          </Button>
        </div>
      )}
    </div>
  );
};
