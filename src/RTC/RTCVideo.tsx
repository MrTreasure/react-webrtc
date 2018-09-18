import * as React from 'react'
import { Card, Button } from 'antd'
import { Bind } from 'lodash-decorators'

export default class RTCVideo extends React.Component {
  private video: HTMLVideoElement | null

  @Bind()
  private async handleGetVideo() {
    const config = {audio: false, video: true}
    const stream = await navigator.mediaDevices.getUserMedia(config)
    this.video && (this.video.srcObject = stream)
  }

  public render() {
    return <Card title={<Button onClick={this.handleGetVideo}>获取</Button>}>
      <div className="rtc">
        <video ref={ref => this.video = ref} autoPlay={true} playsInline={true} controls={true} width="100%" height="auto"/>
      </div>
    </Card>
  }
}