import React, { useState, useEffect } from 'react';
// import useService from "./useService";
import { useIm } from "@lianmed/im";
import Contact from "./components/Contact";
import Chat from "./components/Chat";
import { IMessage, EMsgBodyType } from '@lianmed/im/lib/types/msg';
import './index.less'
interface IProps { }

const messageList: IMessage[] = [
  {
    error: false,
    errorCode: '',
    errorText: '',
    // if status is blank, it's treated as "sent" from server side
    status: 'sending', // [sending, sent ,fail, read]
    id: '',
    // from - room id need it,should not be deleted
    from: '',
    to: '',
    toJid: '',
    time: +new Date(),
    type: 'chat', // chat / groupchat
    body: { msg: 'wwww', type: EMsgBodyType.txt },
    ext: {},
    bySelf: false,
    isUnread: 0,
    chatId: ''
  }
]

export default (props: IProps) => {
  const { friends, contacts } = useIm()
  console.log('con', contacts)
  return (
    <div className='x-im'>
      <div style={{ position: 'absolute', left: 0, bottom: 0, top: 0, width: 200 }}>
        <Contact items={contacts} />
      </div>
      <div style={{ marginLeft: 300 }}>
        <Chat collapsed={false} messageList={messageList}></Chat>
      </div>
    </div>
  );
};
