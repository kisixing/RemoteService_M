import { open } from '@lianmed/im';
import { message } from 'antd';
import { useEffect, useState } from "react";

let IM_TOKEN_KEY = 'web_im_lianmed'

export default () => {
  const [friends, setFriends] = useState<string[]>([])
  useEffect(() => {
    open({ user: 'ahemyugo', token: sessionStorage.getItem(IM_TOKEN_KEY) || 'admin' }).then(WebIM => {

      // fake login
      function fakeLogin() {
        conn.open({
          user: 'ahemyugo',
          pwd: 'admin',
          apiUrl: config.apiURL || '',
          success(data) {
            console.log(`login success`, data.access_token)
            sessionStorage.setItem(IM_TOKEN_KEY, data.access_token)
            location.reload()
          },
          error(e) {
            console.log('webim error', e)
          },
          appKey: config.appkey || ''
        })
      }



      const { conn, config } = WebIM
      conn.listen({
        // success connect to xmpp
        onOpened: msg => {
          // const username = '';
          // const token = '';
          // const hash = '';
          // TODO all path could visited by anonymous should be declared directly
          // const path =
          // history.location.pathname.indexOf('login') !=== -1 ? '/contact' : history.location.pathname;
          // const redirectUrl = `${path}?username=${username}`;
          console.log('open')
          conn.getRoster({
            success(data) {
              if (!data) return
              const d = data.filter(_ => _.subscription !== 'none').map(_ => _.name)
              setFriends(d)
            },
            error(e) {
              console.log('getRoster', e)
            }
          })

        },
        onPresence: msg => {
          // console.log("onPresence", msg, store.getState())
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
          fakeLogin()

          // 16: server-side close the websocket connection
          if (error.type === WebIM.statusCode.WEBIM_CONNCTION_DISCONNECTED) {
            console.log(
              'WEBIM_CONNCTION_DISCONNECTED',
              WebIM.conn.autoReconnectNumTotal,
              WebIM.conn.autoReconnectNumMax,
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
        onBlacklistUpdate: list => { },
        onReadMessage: message => { },
        onDeliveredMessage: message => {
          // store.dispatch(MessageActions.updateMessageStatus(message, "sent"))
        },
        onReceivedMessage: message => { },
        onRecallMessage: message => { },
        onLocationMessage: message => {
          //位置消息
        },
        onTextMessage: message => {
          console.log("onTextMessage", message)
          // const { from, to } = message;
          let { type } = message;
          // const username = '';
          // const bySelf = from === username;
          // root id: when sent by current user or in group chat, is id of receiver. Otherwise is id of sender
          // const chatId = bySelf || type !== 'chat' ? to : from;

          if (type === 'chat') {

          }
        },

        onPictureMessage: message => {
          const { type } = message;
          console.log('onPictureMessage', message);

          switch (type) {
            case 'chat':
              break;
            case 'groupchat':
              break;
            case 'chatroom':
              break;
            default:
              break;
          }
        },
        onFileMessage: message => {
          const { type } = message;
          switch (type) {
            case 'chat':
              break;
            case 'groupchat':
              break;
            case 'chatroom':
              break;
            default:
              break;
          }
        },
        onAudioMessage: message => {
          const { type } = message;

          switch (type) {
            case 'chat':
              break;
            case 'groupchat':
              break;
            case 'chatroom':
              break;
            default:
              break;
          }
        },
        onVideoMessage: message => {
          const { type } = message;
          switch (type) {
            case 'chat':
              break;
            case 'groupchat':
              break;
            case 'chatroom':
              break;
            default:
              break;
          }
        },
        onInviteMessage: msg => {
          console.log('onInviteMessage', msg);
        },
        onMutedMessage: msg => {
          console.log('onMutedMessage', msg);
        },
      });

    })
  }, [])
  // let history: any = window.history;

  return [friends]

}