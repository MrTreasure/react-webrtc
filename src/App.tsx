import * as React from 'react'
import './App.css'

// import { HighLight } from './Highlight'
// import logo from './logo.svg'
// import Card from 'antd/lib/card'
// import Select from 'antd/lib/select'
import 'antd/dist/antd.css'
// import styles from './styleArr.json'
// import { TreeWrap } from './Tree'
import { Row, Col } from 'antd'
import RTCVideo from './RTC/RTCVideo'
// import { Animate } from './Animate'
// import Lifecycle from './Lifecycle'
import RTCCanvas from './RTC/RTCCanvas'
import Recoder from './RTC/Recoder'

// const content = `class App extends React.Component {
//   public render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h1 className="App-title">Welcome to React</h1>
//         </header>
//         <p className="App-intro">
//           To get started, edit <code>src/App.tsx</code> and save to reload.
//         </p>
//       </div>
//     );
//   }
// }`

class App extends React.Component {

  public state = {
    css: 'atom-one-light.css'
  }

  public handleSelect(val) {
    this.setState({
      css: val
    })
  }

  public render() {
    return (
      <div className="App">
        {/* <Row gutter={16}>
          <Col span={12}>
            <Card title="代码块">
              <Select onChange={this.handleSelect.bind(this)} style={{minWidth: 200}} defaultValue="atom-one-light.css">
                {styles.map((css, index) => (<Select.Option key={index} value={css}>{css}</Select.Option>))}
              </Select>
              <HighLight content={content} css={this.state.css}/>
            </Card>
          </Col>
          <Col span={12}>
            <TreeWrap/>
          </Col>
        </Row> */}
        {/* <Row gutter={16} style={{marginTop: 20}}>
          <Col span={12}>
            <Animate/>
          </Col>
          <Col span={12}>
            <Lifecycle/>
          </Col>
        </Row> */}
        <Row gutter={12}>
          <Col span={12}><RTCVideo/></Col>
          <Col span={12}><RTCCanvas/></Col>
          <Col span={12}><Recoder/></Col>
        </Row>
      </div>
    );
  }
}

export default App;
