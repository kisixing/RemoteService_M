/**
 * Created by clock on 2017/8/28.
 */
import React, { useState, useRef, useEffect } from 'react'
import { Button } from 'antd'
import { SoundOutlined } from "@ant-design/icons";
interface IProps {
    length: number
    url: string
}
const Audio = (props: IProps) => {

    const [length, setLength] = useState(0)
    const aud = useRef<HTMLAudioElement>(null)
    function play() {
        aud.current && aud.current.play()
    }
    useEffect(() => {
        if (props.length === 0 && aud.current) {
            let audio = aud.current
            audio.oncanplay = () => {
                setLength(audio.duration)
            }
        }

    }, [])
    let url = props.url
    return (
        <Button type="primary" onClick={play} icon="icon-volume-up">
            <SoundOutlined />
            {props.length === 0 ? length + '\'\'' : props.length + '\'\''}
            <audio src={url} ref="aud" />
        </Button>
    )
}

export default Audio
