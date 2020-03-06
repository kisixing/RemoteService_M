import React from 'react';
import { Row, Col, message } from 'antd';
import { get, map, filter, keyBy } from 'lodash';
import { connect } from 'dva';
import Friend from './components/Friend';
import ChatWindow from './components/ChatWindow';
import { open, imDb } from '@lianmed/im';
import { sendTxtMessage } from '@lianmed/im/lib/utils/msgTool';
import mockData from './MockData';
import styles from './index.less';

const IM_TOKEN_KEY = 'web_im_lianmed';

export class IM extends React.Component {
  componentDidMount() {
    const _that = this;
    console.log('开始连接');
    open({ user: 'ahemyugo', token: sessionStorage.getItem(IM_TOKEN_KEY) || 'admin' }).then(
      WebIM => {
        const { conn, config } = WebIM;
        const { dispatch } = _that.props;
        console.log('连接成功');
        console.log(conn);

        function init() {
          imDb.init(conn.user);
          // 获取黑名单
          const blackList: string[] = conn.getBlacklist();

          conn.getRoster({
            success(data) {
              if (!data) return;
              console.log('获取 poster 列表', data);
              const friends = map(
                filter(data, item => item.subscription !== 'none'),
                (info, index) => ({
                  id: index,
                  name: info.name,
                  avatar: mockData.avatarList[index],
                  unread: 0,
                  lastNews: '在吗',
                  lastTime: '2020-03-04 16:32',
                }), // TODO: 这里是否可以加更多信息？
              );

              dispatch({
                type: 'chat/addFriends',
                payload: { friends },
              });
            },
          });

          // TODO: 获取未读列表
          imDb.getUnreadList().then((res: any) => {
            console.log('unread', res);
            let collection = {
              chat: {},
              chatroom: {},
              groupchat: {},
              stranger: {},
            };
            // unread message count
            res.forEach((msg: any) => {
              if (!msg.error) {
                let type = msg.type;
                let from = type === 'chat' ? 'from' : 'to';
                let id = msg[from];
                // if (collection[type][id]) {
                //     collection[type][id] += 1
                // } else {
                //     collection[type][id] = 1
                // }
              }
            });
          });
        }

        // fake login
        function fakeLogin() {
          conn.open({
            user: 'ahemyugo',
            pwd: 'admin',
            apiUrl: config.apiURL || '',
            success(data) {
              console.log(`login success`, data.access_token);
              sessionStorage.setItem(IM_TOKEN_KEY, data.access_token);
              // location.reload()
            },
            error(e) {
              console.log('webim error', e);
            },
            appKey: config.appkey || '',
          });
        }

        conn.listen({
          onOpened: msg => {
            init();
          },
          onPresence: msg => {
            switch (msg.type) {
              case 'joinGroupNotifications':
                break;
              case 'deleteGroupChat':
                break;
              case 'leaveGroup': // 某人离开群
                break;
              case 'removedFromGroup':
                break;
              case 'invite': //手机端邀请入群
                break;
              case 'direct_joined': //被拉进群
                break;
              case 'joinPublicGroupSuccess':
                break;
              case 'joinPublicGroupDeclined':
                break;
              case 'joinChatRoomSuccess': // Join the chat room successfully
                // Demo.currentChatroom = msg.from;
                break;
              case 'reachChatRoomCapacity': // Failed to join the chat room
                // Demo.currentChatroom = null;
                break;
              case 'subscribe':
                // jion friend action is subscribe/publish pattern，so when you agree to add a friend
                // it will notify the other side automatic，when state equasl [resp:true], do nothing
                // if (msg.status ==== "[resp:true]") {
                //     return
                // }
                break;
              case 'subscribed':
                break;
              case 'unsubscribe': // The sender deletes a friend.
              case 'unsubscribed': // The other party has removed you from the friend list.
                break;
              case 'memberJoinPublicGroupSuccess':
                break;
              case 'memberJoinChatRoomSuccess':
                break;
              case 'leaveChatRoom': // Leave the chat room
                break;
              case 'addMute':
                message.warning('you was muted');
                break;
              case 'removeMute':
                message.success('you was unmuted');
                break;
              case 'addAdmin':
                message.success('you were set to be an admin');
                break;
              case 'removeAdmin':
                message.success('your admin has been canceled');
                break;
              case 'changeOwner':
                message.success('You`ve become group managerd');
                break;
              default:
                break;
            }
          },
          // handle all exception
          onError: error => {
            // 重连
            fakeLogin();
            // 16: server-side close the websocket connection
            if (error.type === WebIM.statusCode.WEBIM_CONNCTION_DISCONNECTED) {
              console.log(
                'WEBIM_CONNCTION_DISCONNECTED',
                conn.autoReconnectNumTotal,
                conn.autoReconnectNumMax,
              );
              return;
            }
            // 2: login by token failed
            if (error.type === WebIM.statusCode.WEBIM_CONNCTION_AUTH_ERROR) {
              return;
            }
            // 7: client-side network offline (net::ERR_INTERNET_DISCONNECTED)
            if (error.type === WebIM.statusCode.WEBIM_CONNCTION_SERVER_CLOSE_ERROR) {
              console.log('WEBIM_CONNCTION_SERVER_CLOSE_ERROR');
              //TODO: need add judgement first: should not display err message while logout
              // message.error("client-side network offline")
              return;
            }
            // 8: offline by multi login
            if (error.type === WebIM.statusCode.WEBIM_CONNCTION_SERVER_ERROR) {
              return;
            }
            if (error.type === WebIM.statusCode.WEBIM_CONNCTION_USER_REMOVED) {
              message.error('用户下线');
              return;
            }
            if (error.type === WebIM.statusCode.WEBIM_CONNCTION_USER_LOGIN_ANOTHER_DEVICE) {
              message.error('账户在另外一台设备登录');
              return;
            }
            if (error.type === WebIM.statusCode.WEBIM_CONNCTION_USER_KICKED_BY_CHANGE_PASSWORD) {
              message.error('用户修改密码');
              return;
            }
            if (error.type === WebIM.statusCode.WEBIM_CONNCTION_USER_KICKED_BY_OTHER_DEVICE) {
              message.error('用户被其他设备踢掉');
              return;
            }
            if (error.type === 1) {
              let data = error.data ? JSON.parse(error.data.data) : '';
              // data && message.error(data)
              if (data) {
                if (data.error_description === 'user not found') {
                  message.error('用户名不存在！');
                } else if (data.error_description === 'invalid password') {
                  message.error('密码无效！');
                } else if (data.error_description === 'user not activated') {
                  message.error('用户已被封禁！');
                }
              }
            }
          },
          onClosed: msg => {
            console.log('onClosed', msg);
            // msg.msg && message.error(msg.msg)
          },
          onBlacklistUpdate: list => {},
          onReadMessage: pMessage => {},
          onDeliveredMessage: pMessage => {
            // store.dispatch(MessageActions.updateMessageStatus(message, "sent"))
          },
          onReceivedMessage: pMessage => {},
          onRecallMessage: pMessage => {},
          onLocationMessage: pMessage => {
            //位置消息
          },
          onTextMessage(pMessage) {
            console.log('收到一条信息');
            console.log(pMessage);
            const { dispatch } = _that.props;
            dispatch({
              type: 'chat/addMessages',
              payload: { pMessage, id: get(pMessage, 'from') },
            });
          },

          onPictureMessage: pMessage => {
            // const { type } = message;
            // console.log('onPictureMessage', message);
            // switch (type) {
            //   case 'chat':
            //     break;
            //   case 'groupchat':
            //     break;
            //   case 'chatroom':
            //     break;
            //   default:
            //     break;
            // }
          },
          onFileMessage: pMessage => {
            // console.log('onFileMessage', message);
            // const { type } = message;
            // switch (type) {
            //   case 'chat':
            //     break;
            //   case 'groupchat':
            //     break;
            //   case 'chatroom':
            //     break;
            //   default:
            //     break;
            // }
          },
          onAudioMessage: pMessage => {
            // console.log('onAudioMessage', message);
            // const { type } = message;
            // switch (type) {
            //   case 'chat':
            //     break;
            //   case 'groupchat':
            //     break;
            //   case 'chatroom':
            //     break;
            //   default:
            //     break;
            // }
          },
          onVideoMessage: pMessage => {
            // console.log('onVideoMessage', message);
            // const { type } = message;
            // switch (type) {
            //   case 'chat':
            //     break;
            //   case 'groupchat':
            //     break;
            //   case 'chatroom':
            //     break;
            //   default:
            //     break;
            // }
          },
          onInviteMessage: msg => {
            console.log('onInviteMessage', msg);
          },
          onMutedMessage: msg => {
            console.log('onMutedMessage', msg);
          },
        });
        conn.on('chattingMessage', m => {
          console.log('chattingMessage', m);
        });
      },
    );
  }

  handleChangeChatUser = (data: any) => {
    const { dispatch, friends } = this.props;
    const activeFriend = get(keyBy(friends, 'name'), data.name);
    dispatch({ type: 'chat/changeActiveFriend', payload: { activeFriend } });
    dispatch({ type: 'chat/fetchMessages', payload: { id: get(activeFriend, 'name') } });
  };

  handleSendMessage = (friend: any, value: any) => {
    sendTxtMessage(get(friend, 'name'), 'chat', value).then(pMessage => {
      const { dispatch } = this.props;
      dispatch({ type: 'chat/addMessages', payload: { pMessage, id: get(pMessage, 'to') } });
    });
  };

  render() {
    const { friends, activeFriend } = this.props;
    return (
      <div className={styles.webIMContainer}>
        <Row>
          <Col span={6} className={styles.friendsList}>
            {map(friends, friend => (
              <Friend
                data={friend}
                isActive={get(friend, 'name') === get(activeFriend, 'name')}
                onClick={this.handleChangeChatUser}
              />
            ))}
          </Col>
          <Col span={18}>
            <ChatWindow activeFriend={activeFriend} onSendMessage={this.handleSendMessage} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default connect(({ chat }) => {
  return {
    friends: chat.friends,
    activeFriend: chat.activeFriend,
  };
})(IM);
