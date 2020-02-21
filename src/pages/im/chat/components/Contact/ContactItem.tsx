import React from 'react'
import { Menu, Badge } from 'antd'
import ContactHead from './ContactHead'

const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup

const ContactItem = ({ chatType, items, collapse, hasLogo, ...rest }) => {
    const tabs = items //["Contacts", "Chat", "Public"]
    const tabsLen = tabs.length
    const tabCls = collapse ? '' : ''

    const tabsItem = tabs.map(item =>
        <Menu.Item key={chatType == 'chatroom' || chatType == 'group' ? item.id : item.name} className={tabCls}>
            {hasLogo ? <ContactHead className="fl nav-img" name="test" width={50} /> : ''}
            <div className="nav-text">
                <div>
                    {item.name}

                    {/*
                        <Badge
                        count={109}
                        style={{
                            backgroundColor: "#87d068",
                            marginLeft: 10,
                            verticalAlign: "middle"
                        }}
                    />
                    */}
                    {/* {chatType === "group" ? <Badge count={item.unread} style={{ marginLeft: 10 }} /> : ""} */}
                    <Badge count={item.unread} style={{ marginLeft: 10 }} />
                </div>
                <div className="nav-text-desc">
                    {item.latestMessage}
                </div>
            </div>
            <div className="nav-op">
                {item.latestTime}
            </div>
        </Menu.Item>
    )

    return (
        <Menu id="x-contact-item" mode={'inline'} inlineIndent={24} {...rest} inlineCollapsed={false}>
            {tabsItem}
        </Menu>
    )
}



export default ContactItem
