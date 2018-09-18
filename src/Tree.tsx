import {Tree, Card, Button, Switch} from 'antd'
import * as React from 'react'


const treeData = [
  {
    title: '0-0',
    key: '0-0',
    children: [{
      title: '0-0-0',
      key: '0-0-0',
      children: [
      { title: '0-0-0-0', key: '0-0-0-0' },
      { title: '0-0-0-1', key: '0-0-0-1' },
      { title: '0-0-0-2', key: '0-0-0-2' },
      ],
    },
      {
        title: '0-0-1',
        key: '0-0-1',
        children: [
      { title: '0-0-1-0', key: '0-0-1-0' },
      { title: '0-0-1-1', key: '0-0-1-1' },
      { title: '0-0-1-2', key: '0-0-1-2' },
        ],
      },
      {
        title: '0-0-2',
        key: '0-0-2',
      }],
  },
  {
    title: '0-1',
    key: '0-1',
    children: [
    { title: '0-1-0-0', key: '0-1-0-0' },
    { title: '0-1-0-1', key: '0-1-0-1' },
    { title: '0-1-0-2', key: '0-1-0-2' },
    ],
  },
  {
    title: '0-2',
    key: '0-2',
  }]
const TreeNode = Tree.TreeNode

export class TreeWrap extends React.Component {
  public state = {
    treeData: [],
    selectKeys: [],
    checkable: false
  }

  private handleSelect() {
    this.setState({
      selectKeys: ['0-0', '0-0-1', '0-0-2', '0-2']
    })
  }

  private handleCancel() {
    this.setState({
      selectKeys: []
    })
  }

  private handleSwitch(val) {
    this.setState({
      checkable: val
    })
  }

  public async componentDidMount() {
    const data = await this.deleyGet(3000)
    this.setState({
      treeData: data,
      checkable: true
    })
  }

  private deleyGet(dealy): Promise<any[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(treeData)
      }, dealy)
    })
  }

  private renderTreeNode(data: any[]) {
    return data.map(node => {
      if (node.children) {
        return (<TreeNode title={node.title} key={node.key}>
          {this.renderTreeNode(node.children)}
        </TreeNode>)
      }
      return (
        <TreeNode title={node.title} key={node.key}/>
      )
    })
  }

  public render() {
    return (
      <Card title="树型组件">
        <Tree
          checkable={this.state.checkable}
          autoExpandParent={true}
          checkedKeys={this.state.selectKeys}>
          {this.renderTreeNode(this.state.treeData)}
        </Tree>

        <Button.Group>
          <Button onClick={this.handleSelect.bind(this)}>Select</Button>
          <Button onClick={this.handleCancel.bind(this)}>Cancel</Button>
        </Button.Group>
        <Switch onChange={this.handleSwitch.bind(this)} checkedChildren="开" unCheckedChildren="关" defaultChecked={false}/>
      </Card>
    )
  }
}