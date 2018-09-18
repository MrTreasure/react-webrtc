import './main.css'
import * as React from 'react'
import {Card, Button, Select} from 'antd'
import { Bind } from 'lodash-decorators'

export default class RTCCanvas extends React.Component {
  private canvas: HTMLCanvasElement
  private video: HTMLVideoElement
  private stream: MediaStream | null
  private ctx: CanvasRenderingContext2D

  private options: string[] = ['None', 'Blur', 'Grayscale', 'Invert', 'Sepia']

  public state = {
    className: 'none'
  }

  @Bind()
  private async handleGetMedia() {
    if (this.stream) return
    const config = { audio: false, video: true }
    const stream = await navigator.mediaDevices.getUserMedia(config)
    this.stream = stream
    this.video.srcObject = stream
  }

  @Bind()
  private handleRelease() {
    if (this.ctx) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }
    if (!this.stream) return
    this.stream.getTracks().forEach(track => {
      console.log(track)
      track.stop()
    })
    this.stream = null
    this.video.srcObject = null
    this.video.pause()
  }

  @Bind()
  private handleSnapshot() {
    console.log(this.video)
    this.canvas.height = parseInt(window.getComputedStyle(this.video).height || '0', 10)
    this.canvas.width = parseInt(window.getComputedStyle(this.video).width || '0', 10)
    if (!this.canvas) return
    const context = this.canvas.getContext('2d')
    if (!context) return
    this.ctx = context
    context.drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height)
  }

  @Bind()
  private handleClassChange(val) {
    this.setState({className: val})
  }

  public render() {
    return (<Card
        title={<div>
        <Button onClick={this.handleGetMedia}>获取</Button>
        <Button onClick={this.handleSnapshot}>快照</Button>
        <Button onClick={this.handleRelease}>释放</Button>
        <Select style={{width: 100}} defaultValue="none" onChange={this.handleClassChange}>
          {this.options.map(key => <Select.Option key={key} value={key.toLowerCase()}>{key}</Select.Option>)}
        </Select>
        </div>}>
      <video className={this.state.className} ref={ref => ref && (this.video = ref)} autoPlay={true} width="100%" height="auto"/>
      <canvas className={this.state.className} ref={ref => ref && (this.canvas = ref)} width="480" height="auto"/>
    </Card>)
  }
}