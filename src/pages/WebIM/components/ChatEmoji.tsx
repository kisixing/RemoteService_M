import React, { useState } from 'react';
import { Menu, Dropdown } from 'antd';
import { SmileOutlined } from '@ant-design/icons';

interface IProps {
  emoji: { [x: string]: string };
  [x: string]: any;
}

const ChatEmoji = (props: IProps) => {
  const { emoji, onEmojiClick } = props;
  const [state, setstate] = useState({
    tabPosition: 'bottom',
    size: '',
    emojiPadding: 5,
    emojiWidth: 25,
    lineNum: 10,
  });

  function renderEmojiMenu() {
    const { emojiWidth, emojiPadding, lineNum } = state;
    const emojisNum = Object.values(emoji).length;
    const rows = Math.ceil(emojisNum / lineNum);
    const width = (emojiWidth + 2 * emojiPadding) * lineNum + 10;
    const height = (emojiWidth + 2 * emojiPadding) * rows;

    return (
      <Menu style={{ width, height, padding: 5 }} {...props}>
        {renderEmoji()}
      </Menu>
    );
  }

  function renderEmoji() {
    const { emojiWidth } = state;

    return Object.keys(emoji).map(emojiName => {
      return (
        <Menu.Item
          key={emojiName}
          className="ib"
          style={{
            width: emojiWidth,
            height: emojiWidth,
            padding: 0,
            display: 'inline-block',
          }}
          onClick={() => onEmojiClick(emojiName)}
        >
          <img src={emoji[emojiName]} width={emojiWidth} height={emojiWidth} alt="emoji" />
        </Menu.Item>
      );
    });
  }

  return (
    <div className="ib">
      <Dropdown overlay={renderEmojiMenu()} trigger={['click']}>
        <SmileOutlined />
      </Dropdown>
    </div>
  );
};

export default ChatEmoji;
