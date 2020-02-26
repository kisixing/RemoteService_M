import React, { useState } from 'react'
import Layout from './components/Layout/Layout'
import _ from 'lodash'
import classNames from 'classnames'

import Contact from './components/Contact'
import Chat from './components/Chat'

import config from './config'

import { useIm } from "@lianmed/im";
import './index.less'
import { ClickParam } from 'antd/lib/menu'
const { SIDER_COL_BREAK, SIDER_WIDTH, RIGHT_SIDER_WIDTH } = config
const { Content } = Layout

let chat_message_status = {}

const DefaultLayout = (props: any) => {

  const { setCurrent, contacts, currentMessage, current } = useIm()


  const [breakpoint, setBreakpoint] = useState({
    xs: false,
    sm: false,
    md: false,
    lg: false,
    xl: false
  })
  const [selectItem, setSelectItem] = useState('')
  const [collapsed, setCollapsed] = useState(breakpoint[SIDER_COL_BREAK])
  const [rightSiderOffset, setRightSiderOffset] = useState(-1 * RIGHT_SIDER_WIDTH)
  const [roomId, setRoomId] = useState(NaN)
  const [contactItems, setContactItems] = useState<string[]>([])

  const [hideRight, setHideRight] = useState(true)

  // switch chat type
  function changeTab(e: any, opt: any) {
  }

  // switch contact
  function changeItem(e: ClickParam) {
    setCurrent(e.key)
  }

  function setSelectStatus(defaultItem: any, opt: any) {

  }

  function handleCloseRightSiderClick(e: any) {
  }









  return (
    <Layout>

      <Content className="x-layout-main">
        <div
          className="x-layout-sider"
          style={{
            // sider full display when breakpoint
            width: collapsed ? '100%' : SIDER_WIDTH,
            // sider display to left when breakpoint and has selectItem
            left: selectItem && collapsed ? '-100%' : 0
          }}
        >
          <Contact items={contacts} collapsed={false} current={current} onClick={changeItem} />
        </div>
        <div className="x-layout-video"
          style={{
            position: 'absolute',
          }}
        >
        </div>
        <Content
          className="x-layout-chat"
          style={{
            overflow: 'scroll',
            margin: collapsed ? '0' : `0 0 0 ${SIDER_WIDTH}px`
          }}
        >
          <Chat current={current} collapsed={collapsed} messageList={currentMessage} />
        </Content>
        <div
          className={classNames('x-layout-right-sider', { 'hide': hideRight })}
          style={{
            width: `${RIGHT_SIDER_WIDTH}px`,
            marginLeft: `${rightSiderOffset}px`
          }}
        >

        </div>

      </Content>
    </Layout>
  )
}

export default DefaultLayout
