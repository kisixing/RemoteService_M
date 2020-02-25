import React, { useRef, useState } from 'react'

import _ from 'lodash'
import { Input, Dropdown, Menu } from 'antd'
import { SettingOutlined } from "@ant-design/icons";
import ChatMessage from './ChatMessage'
import ChatEmoji from './ChatEmoji'

import { IMessage } from '@lianmed/im/lib/types/msg';


interface IProps {
    messageList: IMessage[]
    collapsed: boolean
}


const Chat = (props: IProps) => {

    const input = useRef<Input>(null)
    const image = useRef<HTMLInputElement>(null)
    const file = useRef<HTMLInputElement>(null)

    const [selectTab, setSelectTab] = useState('')
    const [selectItem, setSelectItem] = useState('')
    const [value, setValue] = useState('')
    const [isLoaded, setIsLoaded] = useState(false)


    function scollBottom() {

    }

    function pictureChange() {

        //
    }

    function fileChange() {

    }

    function handleEmojiSelect() {

    }

    function handleEmojiCancel() {

    }

    function handleChange() {

    }

    function handleSend() {

    }

    function emitEmpty() {

    }

    function handleKey() {

    }

    /**
     * click event for button at top-right corner
     *
     * @memberof Chat
     */
    function handleRightIconClick() {

    }

    function renderContactMenu(a: string) {

        let tabs = null
        if (selectTab == 'contact') {
            tabs = [
                ['0', `block`, 'iconfont icon-circle-minus'],
                ['1', `delAFriend`, 'iconfont icon-trash']
            ]
        } else {
            // stranger
            tabs = [
                ['2', `addFriend`, 'anticon anticon-user-add'],
                ['3', `delete`, 'iconfont icon-trash']
            ]
        }

        const tabsItem = tabs.map(([key, name, icon]) =>
            <Menu.Item key={key}>
                <i className={icon} style={{ fontSize: 20, marginRight: 12, verticalAlign: 'middle' }} />
                <span>
                    <span>
                        {name}
                    </span>
                </span>
            </Menu.Item>
        )
        const menuSettings = (
            <Menu className="x-header-ops__dropmenu" onClick={onMenuContactClick}>
                {tabsItem}
            </Menu>
        )

        return menuSettings
    }

    function onMenuContactClick() {

    }

    function onClearMessage() {

    }





    function callVideo() {

    }

    function handleModalClose() {
    }

    function callVoice() {


    }

    function handleScroll() {

    }
    function ok() {
    }
    let {
        collapsed,

        messageList,
    } = props


    function back() {

    }

    let name = selectItem




    return (
        <div className="x-chat">
            <div className="x-list-item x-chat-header">
                <div className="fl">
                    {collapsed
                        ? <SettingOutlined

                            onClick={back}
                            style={{
                                cursor: 'pointer',
                                fontSize: 20,
                                verticalAlign: 'middle',
                                marginRight: 10
                            }}
                        />
                        : null}
                    {name}
                </div>
                <div className="fr">
                    <span style={{ color: '#8798a4', cursor: 'pointer' }}>
                        {selectTab === 'contact' || selectTab === 'stranger'
                            ? <Dropdown
                                overlay={renderContactMenu(selectTab)}
                                placement="bottomRight"
                                trigger={['click']}
                            >
                                <SettingOutlined />
                            </Dropdown>
                            : <SettingOutlined onClick={handleRightIconClick} />}
                    </span>
                </div>
            </div>
            <div className="x-chat-content" ref="x-chat-content" onScroll={handleScroll}>
                {/* fixed bug of messageList.map(...) */}
                {isLoaded && <div style={{ width: '150px', height: '30px', lineHeight: '30px', backgroundColor: '#888', color: '#fff', borderRadius: '15px', textAlign: 'center', margin: '10px auto' }}>noMoreMessage</div>}
                {messageList.map((message, i) => {
                    if (i > 0) {
                        if (message.id != messageList[i - 1].id) {
                            return <ChatMessage emoji={{}} key={i} {...message} />
                        }
                    } else {
                        return <ChatMessage emoji={{  }} key={i} {...message} />
                    }
                })}
            </div>
            <div className="x-chat-footer">
                <div className="x-list-item x-chat-ops">
                    {/* emoji */}
                    <div className="x-chat-ops-icon ib">
                        <ChatEmoji emoji={{}} />
                    </div>
                    {/* image upload */}
                    <label
                        htmlFor="uploadImage"
                        className="x-chat-ops-icon ib"
                        onClick={() => image && image.current && image.current.focus() && image.current.click()}>
                        <i className="iconfont icon-picture" />
                        <input
                            id="uploadImage"
                            ref={image}
                            onChange={pictureChange}
                            type="file"
                            className="hide"
                        />
                    </label>
                    {/*  file upload*/}
                    <label
                        htmlFor="uploadFile"
                        className="x-chat-ops-icon ib"
                        onClick={() => file && file.current && file.current.focus() && file.current.click()}>
                        <i className="icon iconfont icon-file-empty" />
                        <input
                            id="uploadFile"
                            ref={file}
                            onChange={fileChange}
                            type="file"
                            className="hide"
                        />
                    </label>
                    {/* webrtc video && audio && 发送音频 */}
                    {/* clear */}
                    <label htmlFor="clearMessage" className="x-chat-ops-icon ib" onClick={onClearMessage}>
                        <i className="icon iconfont icon-trash"></i>
                    </label>
                </div>
                <div className="x-list-item x-chat-send">
                    <Input
                        value={value}
                        onChange={handleChange}
                        onPressEnter={handleSend}
                        placeholder={'message'}
                        addonAfter={
                            <i
                                className="fontello icon-paper-plane"
                                onClick={handleSend}
                                style={{ cursor: 'pointer' }}
                            />
                        }
                        ref={input}
                    />
                    {/*<TextArea rows={2} />*/}
                </div>
            </div>

        </div>
    )
}

export default Chat
