import './Animate.css'
import * as React from 'react'
import { Bind } from 'lodash-decorators'
import { Card, Button } from 'antd'
import { Transition } from 'react-spring'

export class Animate extends React.Component {
  public state = {
    count: 0,
    list: new Array < any > ()
  }

  @Bind()
  private handleAdd() {
    let count = this.state.count + 1
    const result: any[] = []
    for (let i = 0; i < count; i++) {
      result.push(i)
    }
    this.setState({count, list: result})
  }

  @Bind()
  private handleRemove() {
    let count = this.state.count - 1
    const result: any[] = []
    for (let i = 0; i < count; i++) {
      result.push(i)
    }
    this.setState({count, list: result})
  }

  public render() {
    return (
      <Card title={<div><Button onClick={this.handleAdd} key="add">Add</Button><Button onClick={this.handleRemove} key="remove">Remove</Button></div>}>
        <Transition
          keys={this.state.list.map(item => item)}
          from={{ opacity: 0, height: 0, transform: 'translateX(100px)' }}
          enter={{ opacity: 1, height: 20, transform: 'translateX(0)' }}
          leave={{ opacity: 0, height: 0, pointerEvents: 'none', transform: 'translateX(-100px)'}}>
          {this.state.list.map(item => styles => (<div style={styles} className="animate-item">{item}</div>))}
        </Transition>
      </Card>
    )
  }
}