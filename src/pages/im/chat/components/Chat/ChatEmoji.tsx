import React, { useState } from 'react'
import { Menu, Dropdown } from 'antd'
import './style/ChatEmoji.less'

interface IProps {
    emoji?: { [x: string]: string }

}

const ChatEmoji = (props: IProps) => {

    const emoji = props.emoji || {}
    const [state, setstate] = useState({
        tabPosition: 'bottom',
        size: '',
        emojiPadding: 5,
        emojiWidth: 25,
        lineNum: 10
    })


    function renderEmojiMenu() {
        const { emojiWidth, emojiPadding, lineNum } = state
        const emojisNum = Object.values(emoji).length
        const rows = Math.ceil(emojisNum / lineNum)
        const width = (emojiWidth + 2 * emojiPadding) * lineNum
        const height = (emojiWidth + 2 * emojiPadding) * rows

        return (
            <Menu className="x-emoji" style={{ width, height }} {...props}>
                {renderEmoji()}
                {/*
				<Menu.Item key="3" style={{ display: "block" }} disabled>
					<p className="ib" onClick={e => console.log(e)}>
						123
					</p>
				</Menu.Item>
				*/}
            </Menu>
        )
    }

    function renderEmoji() {
        // console.log(emojis)
        const { emojiWidth, emojiPadding, lineNum } = state

        return Object.keys(emoji).map((k, index) => {
            const v = emoji[k]
            return (
                <Menu.Item
                    key={k}
                    className="ib"
                    style={{
                        width: emojiWidth,
                        height: emojiWidth,
                        padding: emojiPadding
                    }}
                >
                    <img
                        src={require(`../../themes/faces/${v}`)}
                        width={emojiWidth}
                        height={emojiWidth}
                    />
                </Menu.Item>
            )
        })
    }

    const handleChange = (tabPosition: any) => {
        // setState({ tabPosition })
    }
    const menu = renderEmojiMenu()

    return (
        <div className="ib">
            <Dropdown overlay={menu} trigger={['click']}>
                <a className="ant-dropdown-link" href="#">
                    <i
                        className="iconfont icon-smile"
                        style={{ color: 'rgba(0, 0, 0, 0.65)' }}
                    />
                </a>
            </Dropdown>
        </div>
    )
}

export default ChatEmoji
