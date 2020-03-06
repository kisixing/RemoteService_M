import React from 'react';
import { connect } from 'dva';
import { Row, Col, Button, Input } from 'antd';
import { DeleteOutlined, FileImageOutlined, FileOutlined } from '@ant-design/icons';
import { get, map, isEqual, keys } from 'lodash';
import ChatEmoji from './ChatEmoji';
import styles from '../index.less';

interface IProps {
  activeFriend: any;
  onSendMessage: (to: any, content: any) => void;
}

interface IState {
  inputValue: string;
  selectionStart: number;
  activeFriend: any;
  messages: [];
}

export class ChatWindow extends React.Component<IProps, IState> {
  textAreaRef: React.RefObject<unknown>;
  
  constructor(props: any) {
    super(props);
    this.state = {
      inputValue: '',
      selectionStart: 0,
      activeFriend: props.activeFriend,
      messages: get(props.chat, get(props.activeFriend, 'name')),
    };
    this.textAreaRef = React.createRef();
  }

  async componentWillReceiveProps(nextProps: any) {
    const { activeFriend, messages } = this.state;
    if (get(activeFriend, 'name') !== get(nextProps.activeFriend, 'name')) {
      this.setState({ activeFriend: nextProps.activeFriend });
    }
    const newMessages = get(nextProps.chat, get(activeFriend, 'name'));
    if (!isEqual(newMessages, messages)) {
      const chatWindowMiddle = document.getElementById('chatWindowMiddle') || {};
      chatWindowMiddle.scrollTop = chatWindowMiddle.scrollHeight;
      this.setState({
        messages: newMessages,
      });
    }
  }

  componentDidUpdate() {
    const chatWindowMiddle = document.getElementById('chatWindowMiddle') || {};
    chatWindowMiddle.scrollTop = chatWindowMiddle.scrollHeight;
  }

  handleTextAreaChange = (e: any) => {
    this.setState({ inputValue: e.target.value });
  };

  handleTextAreaBlur = (e: any) => {
    this.setState({ selectionStart: e.target.selectionStart });
  };

  handleKeyUp = (e: any) => {
    const { onSendMessage } = this.props;
    const { activeFriend, inputValue } = this.state;
    if (e.keyCode === 13 && e.ctrlKey) {
      onSendMessage(activeFriend, inputValue);
      this.setState({ inputValue: '' });
    }
  };

  handleEmojiClick = (emojiCode: string) => {
    const { inputValue, selectionStart } = this.state;
    this.setState({
      inputValue:
        inputValue.substr(0, selectionStart) + emojiCode + inputValue.substr(selectionStart),
    });
  };

  renderMessage = (message: string) => {
    const WebIM = (window as any).WebIM;
    const emoji = WebIM ? WebIM.emoji || {} : {};
    let newMessage = message;
    map(keys(emoji), emojiName => {
      let newEmojiName = emojiName.replace(/\[/, '\\[');
      newEmojiName = newEmojiName.replace(/\]/, '\\]');
      newEmojiName = newEmojiName.replace(/\(/, '\\(');
      newEmojiName = newEmojiName.replace(/\)/, '\\)');
      newEmojiName = newEmojiName.replace(/\|/, '\\|');
      newEmojiName = newEmojiName.replace(/\$/, '\\$');
      newEmojiName = newEmojiName.replace(/\+/, '\\+');
      newEmojiName = newEmojiName.replace(/\*/, '\\*');
      newEmojiName = newEmojiName.replace(/\^/, '\\^');
      newMessage = newMessage.replace(
        new RegExp(newEmojiName),
        `<img src='${get(emoji, emojiName)}' />`,
      );
    });
    return (
      <span
        className={styles.chatWindowMiddleItemWorlds}
        dangerouslySetInnerHTML={{ __html: newMessage }}
      ></span>
    );
  };

  render() {
    const { activeFriend, inputValue, messages } = this.state;
    const WebIM = (window as any).WebIM;
    const emoji = WebIM ? WebIM.emoji || {} : {};

    return get(activeFriend, 'name') ? (
      <div className={styles.chatWindow}>
        <div className={styles.chatWindowHead}>
          <div className={styles.chatWindowHeadLeft}>
            <img
              className={styles.chatWindowHeadAvatar}
              src={get(activeFriend, 'avatar')}
              alt="avatar"
            />
            <span className={styles.chatWindowHeadName}>{get(activeFriend, 'name')}</span>
          </div>
          <Button>加入黑名单</Button>
        </div>
        <div id="chatWindowMiddle" className={styles.chatWindowMiddle}>
          {map(messages, (msg, index) => {
            const isRight = activeFriend.name !== msg.from;
            return (
              <div key={index} className={styles.chatWindowMiddleItem}>
                <Row>
                  <Col
                    className={styles.chatWindowMiddleItemContent}
                    span={12}
                    offset={isRight ? 12 : 0}
                    style={isRight ? { textAlign: 'right' } : {}}
                  >
                    {isRight ? (
                      <div
                        className={styles.chatWindowMiddleItemContentBlock}
                        style={{ width: '100%', textAlign: 'left' }}
                      >
                        {this.renderMessage(get(msg, 'body.msg'))}
                        <img
                          className={styles.chatWindowHeadAvatar}
                          src={
                            isRight
                              ? 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png'
                              : get(activeFriend, 'avatar')
                          }
                          alt="avatar"
                        />
                      </div>
                    ) : (
                      <div className={styles.chatWindowMiddleItemContentBlock}>
                        <img
                          className={styles.chatWindowHeadAvatar}
                          src={
                            isRight
                              ? 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png'
                              : get(activeFriend, 'avatar')
                          }
                          alt="avatar"
                        />
                        {this.renderMessage(get(msg, 'body.msg'))}
                      </div>
                    )}
                  </Col>
                </Row>
              </div>
            );
          })}
        </div>
        <div className={styles.chatWindowInput}>
          <div className={styles.chatWindowInputMenu}>
            <ChatEmoji
              className={styles.chatWindowInputMenuIcon}
              emoji={emoji}
              onEmojiClick={this.handleEmojiClick}
            />
            <FileImageOutlined className={styles.chatWindowInputMenuIcon} />
            <FileOutlined className={styles.chatWindowInputMenuIcon} />
            <DeleteOutlined className={styles.chatWindowInputMenuIcon} />
          </div>
          <Input.TextArea
            ref={this.textAreaRef}
            className={styles.chatWindowInputEntry}
            placeholder="Ctrl + Entry 键发送信息"
            value={inputValue}
            onChange={this.handleTextAreaChange}
            onBlur={this.handleTextAreaBlur}
            onKeyUp={this.handleKeyUp}
          />
        </div>
      </div>
    ) : (
      <div className={styles.chatWindowEmpty}>请在左侧选择聊天对象</div>
    );
  }
}

export default connect(({ chat }) => ({
  chat,
}))(ChatWindow);
