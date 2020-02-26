import React, { useRef, useState, ChangeEvent } from 'react'

import _ from 'lodash'
import { Input, Dropdown, Menu } from 'antd'
import { SettingOutlined, FileAddOutlined, FileImageOutlined, DeleteOutlined, SendOutlined } from "@ant-design/icons";
import ChatMessage from './ChatMessage'
import ChatEmoji from './ChatEmoji'

import { IMessage } from '@lianmed/im/lib/types/msg';

import "./style/index.less";
import { ClickParam } from 'antd/lib/menu';
import { sendTxtMessage } from "@lianmed/im";

interface IProps {
    messageList: IMessage[]
    collapsed: boolean
    current: string
}


const Chat = (props: IProps) => {
    const { collapsed, messageList, current } = props

    let WebIM = (window as any).WebIM;
    let emoji = WebIM ? WebIM.emoji || {} : {};
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

    function handleEmojiSelect(e: ClickParam) {
        setValue(value + e.key)
        input.current && input.current.focus()
    }

    function handleEmojiCancel() {

    }

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setValue(e.target.value)
    }

    function handleSend() {
        sendTxtMessage(current, 'chat', value)
        .then(data=>console.log('success',data))
        .catch(data=>console.log('err',data))
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
            <div className="x-chat-content" onScroll={handleScroll}>
                {isLoaded && <div style={{ width: '150px', height: '30px', lineHeight: '30px', backgroundColor: '#888', color: '#fff', borderRadius: '15px', textAlign: 'center', margin: '10px auto' }}>noMoreMessage</div>}
                {messageList.map((message, i) => {

                    return <ChatMessage emoji={{}} key={i} {...message} />
                })}
            </div>
            <div className="x-chat-footer">
                <div className="x-list-item x-chat-ops">
                    {/* emoji */}
                    <div className="x-chat-ops-icon ib">
                        <ChatEmoji emoji={emoji} onClick={handleEmojiSelect} />
                    </div>
                    {/* image upload */}
                    <label
                        htmlFor="uploadImage"
                        className="x-chat-ops-icon ib"
                        onClick={() => image && image.current && image.current.focus() && image.current.click()}>
                        <FileImageOutlined />
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
                        <FileAddOutlined />

                        <input
                            id="uploadFile"
                            ref={file}
                            onChange={fileChange}
                            type="file"
                            className="hide"
                        />
                    </label>
                    <label htmlFor="clearMessage" className="x-chat-ops-icon ib" onClick={onClearMessage}>
                        <DeleteOutlined />
                    </label>
                </div>
                <div className="x-list-item x-chat-send">
                    <Input
                        value={value}
                        onChange={handleChange}
                        onPressEnter={handleSend}
                        placeholder={'message'}
                        addonAfter={
                            <SendOutlined
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
