import　* as React from 'react'
import { Bind } from 'lodash-decorators'
import { Card, Button, notification } from 'antd'

export default class Recoder extends React.Component {
  private stream: MediaStream
  private recoder!: HTMLVideoElement | null
  private video!: HTMLVideoElement | null

  private mediaSource: MediaSource = new MediaSource()
  private mediaRecorder
  private recordedBlobs: ArrayBuffer[]
  private sourceBuffer

  public state = {
    recording: false
  }

  @Bind()
  private async handlePlayVideo() {
    this.sourceBuffer = window['sourceBuffer'] = new Blob(this.recordedBlobs, {type: 'video/webm'})
    if (!this.recoder) return
    this.recoder.src = ''
    this.recoder.srcObject = null
    this.recoder.src = window.URL.createObjectURL(this.sourceBuffer)
    this.recoder.controls = true
    this.recoder.play()
  }

  @Bind()
  private handleRecoding() {
    if (this.state.recording) {
      this.setState({recording: false})
    } else {
      this.recordedBlobs = window['recordedBlobs'] = []
      this.setState({recording: true})
      const options = {mimeType: 'video/webm; codecs="vp8"'}
      try {
        this.mediaRecorder = new window['MediaRecorder'](this.stream, options)
      } catch (error) {
        console.error(error)
        notification.error({
          message: 'error',
          description: error.message
        })
      }
      this.mediaRecorder.onstop = event => console.log('Recorder stopped: ', event)
      this.mediaRecorder.ondataavailable = event => {
        if (event.data && event.data.size > 0) {
          this.recordedBlobs.push(event.data);
        }
      }
      this.mediaRecorder.start(10)
    }

  }

  @Bind()
  private handleDownload() {
    console.log('download')
    // 使用a标签下载即可
  }

  @Bind()
  private handleSourceOpen(event) {
    console.log('MediaSource opened')
    this.sourceBuffer = this.mediaSource.addSourceBuffer('video/webm; codecs="vp8"')
  }

  public async componentDidMount() {
    const config = {audio: false, video: {width: 1280, height: 720}}
    const stream = await navigator.mediaDevices.getUserMedia(config)
    this.stream = stream
    this.video && (this.video.srcObject = stream)
    this.mediaSource.addEventListener('sourceopen', this.handleSourceOpen)
  }

  public render() {
    return <Card title={
      <>
        <Button onClick={this.handleRecoding} type={this.state.recording ? 'primary' : undefined}>{this.state.recording ? '停止' : '录制'}</Button>
        <Button onClick={this.handlePlayVideo}>播放</Button>
        <Button onClick={this.handleDownload}>下载</Button>
      </>
    }>
      <div className="rtc">
        <video ref={ref => this.video = ref} autoPlay={true} playsInline={true} controls={true} width="100%" height="auto"/>
        <video ref={ref => this.recoder = ref} autoPlay={true} playsInline={true} controls={true} width="100%" height="auto"/>
      </div>
    </Card>
  }
}