import React, { useState } from 'react'
import { Menu, Dropdown, Card, Tag, Modal } from 'antd'
import Audio from './Audio'
import { IMessage } from '@lianmed/im/lib/types/msg'
import './style/ChatMessage.less'
interface IProps extends IMessage {
    emoji?: {
        [x: string]: string
    }
}

export default (props: IProps) => {

    const [showImgModal, setShowImgModal] = useState(false)


    const renderTxt = (txt: string) => {
        let rnTxt = []
        let match = null
        const regex = /(\[.*?\])/g
        let start = 0
        let index = 0
        while ((match = regex.exec(txt))) {
            index = match.index
            if (index > start) {
                rnTxt.push(txt.substring(start, index))
            }
            if (match[1] in emoji) {
                const v = emoji[match[1]]
                rnTxt.push(
                    <img
                        // key={WebIM.conn.getUniqueId()}
                        src={v}
                        width={20}
                        height={20}
                    />
                )
            } else {
                rnTxt.push(match[1])
            }
            start = index + match[1].length
        }
        rnTxt.push(txt.substring(start, txt.length))

        return rnTxt
    }

    const imgClick = () => {
        setShowImgModal(true)
    }
    const handleCancel = () => {
        setShowImgModal(false)
    }


    const oncontextmenu = (toJid: string) => () => {
        // WebIM.conn.recallMessage({
        //     to: props.to,
        //     mid: toJid,
        //     group: props.type,
        //     success: () => {
        //         props.ok(deepGet(this, 'props.id'))
        //     },
        //     fail: (err) => {
        //         message.error('撤回失败')
        //     }
        // })
    }
    const { bySelf, from, time, body, status, toJid, emoji = {} } = props
    const cls = `x-message-group ${bySelf ? 'x-message-right' : ''}`
    const localFormat = new Date(time).toLocaleDateString()

    let content = null
    const menu = (
        <Menu onClick={oncontextmenu(toJid)}>
            <Menu.Item>
                撤回
                </Menu.Item>
        </Menu>
    )
    switch (body.type) {
        case 'txt':
            content = bySelf ? (
                <Dropdown overlay={menu} trigger={['click']}>
                    <p className="x-message-text" >
                        {renderTxt(body.msg || body.url || '')}
                    </p>
                </Dropdown>
            ) : (
                    <p className="x-message-text" >
                        {renderTxt(body.msg || '')}
                    </p>
                )
            break
        case 'img':
            content = bySelf ? (
                <Dropdown overlay={menu} trigger={['click']}>
                    <div className="x-message-img">
                        <img
                            src={body.url}
                            width="100%"
                            style={{ verticalAlign: 'middle' }}
                        />
                    </div>
                </Dropdown>
            ) : (
                    <div className="x-message-img">
                        <img
                            onDoubleClick={imgClick}
                            src={body.url}
                            width="100%"
                            style={{ verticalAlign: 'middle' }}
                        />
                    </div>
                )
            break
        case 'file':
            const readablizeBytes = (bytes: any) => {
                let s = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB']
                var e = Math.floor(Math.log(bytes) / Math.log(1024))
                return (
                    (bytes / Math.pow(1024, Math.floor(e))).toFixed(2) + ' ' + s[e]
                )
            }
            content = bySelf ? (
                <Dropdown overlay={menu} trigger={['click']}>
                    <Card
                        title={'file'}
                        style={{ width: 240, margin: '2px 2px 2px 0' }}
                    >
                        <div className="x-message-file">
                            <h3 title={body.filename}>
                                {body.filename}
                            </h3>
                            <div className="ant-row">
                                <div className="ant-col-12">
                                    <p>
                                        {readablizeBytes(body.file_length)}
                                    </p>
                                </div>
                                <div className="ant-col-12">
                                    <a href={body.url} download={body.filename}>
                                        {'download'}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </Card>
                </Dropdown>
            ) : (
                    <Card
                        title={'file'}
                        style={{ width: 240, margin: '2px 2px 2px 0' }}
                    >
                        <div className="x-message-file">
                            <h3 title={body.filename}>
                                {body.filename}
                            </h3>
                            <div className="ant-row">
                                <div className="ant-col-12">
                                    <p>
                                        {readablizeBytes(body.file_length)}
                                    </p>
                                </div>
                                <div className="ant-col-12">
                                    <a href={body.url} download={body.filename}>
                                        {'download'}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </Card>
                )
            break
        case 'video':
            content = bySelf ? (
                <Dropdown overlay={menu} trigger={['click']}>
                    <div className="x-message-video">
                        <video src={body.url} width="100%" controls />
                    </div>
                </Dropdown>
            ) : (
                    <div className="x-message-video">
                        <video src={body.url} width="100%" controls />
                    </div>
                )
            break
        case 'audio':
            content = bySelf ? (
                <Dropdown overlay={menu} trigger={['click']}>
                    <div className="x-message-audio" style={bySelf && { display: 'inline-block' }}>
                        <Audio url={body.url || ''} length={body.length || 0} />
                    </div>
                </Dropdown>
            ) : (
                    <div className="x-message-audio">
                        <Audio url={body.url || ''} length={body.length || 0} />
                    </div>
                )
            break
        default:
            break
    }

    let statusTag
    switch (status) {
        case 'sent':
            statusTag = <Tag color="#f39c12">{'unread'}</Tag>
            break
        case 'muted':
            statusTag = <Tag color="#f50">{'muted'}</Tag>
            break
        case 'fail':
            statusTag = <Tag color="#f50">{'sentFailed'}</Tag>
            break
        default:
            statusTag = ''
            break
    }

    return <div className={cls}>
        <div className="x-message-user">
            {from}
        </div>
        <div className="x-message-content">
            {/* 已读、未读Tag */}
            {/* {bySelf && props.type === 'chat' ? statusTag : ''}  */}
            {content}
        </div>
        {bySelf
            ? <div className="x-message-time">
                <span className="x-message-status" /> {localFormat}
            </div>
            : <div className="x-message-time">
                {localFormat} <span className="x-message-status" />
            </div>}

        {/* 图片放大弹窗 */}
        <Modal
            title="查看图片"
            visible={showImgModal}
            onCancel={handleCancel}
            footer={null}
            width={'800'}
            bodyStyle={{ textAlign: 'center' }}
        >
            <img
                src={body.url}
                style={{ maxWidth: '100%' }} />
        </Modal>
    </div>
}