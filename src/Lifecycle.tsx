import * as React from 'react'
import { Select, Divider, Card, InputNumber } from 'antd'
import { Bind } from 'lodash-decorators'

class Child extends React.Component<any, any> {
  public state = {
    age: 22
  }

  @Bind()
  private handleChange(age) {
    this.setState({age})
  }

  static getDerivedStateFromProps(nextProps, nextState) {
    console.log('%c getDerivedStateFromProps', "color:#97de95")
    console.log(nextProps, nextState)
    return null
  }

  public shouldComponentUpdate(nextProps, nextState): boolean {
    console.log('%c shouldComponentUpdate', "color:#08c299")
    console.log(this.props, this.state)
    console.log(nextProps, nextState)
    // 具有缓存效应
    // 不能在此处调用setState
    if (this.props.name === nextProps.name && this.state === nextState) {
      return false
    }
    return true
  }

  public getSnapshotBeforeUpdate(preProps, preState): any {
    console.log('%c getSnapshotBeforeUpdate', "color:#0960bd")
    console.log(preProps, preState)
    console.log(this.props, this.state)
    return this.props
  }

  public componentDidUpdate(preProps, preState, val) {
    console.log('%c componentDidUpdate', "color:#571179")
    console.log(preProps, preState, val)
  }

  public render() {
    console.log('%c render', "color:#6643b5")
    return (
      <div className="lifecycle-child">
        <div className="output">
        <p>Name: {this.props.name}</p>
        <p>Age: {this.state.age}</p>
        </div>
        <Divider/>
        <InputNumber min={1} onChange={this.handleChange} value={this.state.age}/>
      </div>
    )
  }
}

export default class Lifecycle extends React.Component<any, any> {
  public state = {
    name: 'Treasure',
    own: '《你就不要想起我》'
  }

  @Bind()
  private handleChange(name) {
    this.setState({
      name
    })
  }

  @Bind()
  private handleOwnChange(own) {
    this.setState({own})
  }

  public render() {
    return (
      <Card title="Lifecycle">
        <Select value={this.state.name} onChange={this.handleChange}>
          <Select.Option value="Treasure" >Treasure</Select.Option>
          <Select.Option value="Sunshine" >Sunshine</Select.Option>
        </Select>
        <Select value={this.state.own} onChange={this.handleOwnChange} style={{width: 180, marginLeft: 20}}>
          <Select.Option value="《你就不要想起我》" >《你就不要想起我》</Select.Option>
          <Select.Option value="《魔鬼中的天使》" >《魔鬼中的天使》</Select.Option>
          <Select.Option value="《小幸运》" >《小幸运》</Select.Option>
        </Select>
        <Divider />
        <Child name={this.state.name}/>
      </Card>
    )
  }
}