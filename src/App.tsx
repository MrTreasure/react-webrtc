import * as React from 'react'
import './App.css'

// import { HighLight } from './Highlight'
// import logo from './logo.svg'
// import Card from 'antd/lib/card'
// import Select from 'antd/lib/select'
import 'antd/dist/antd.css'
// import styles from './styleArr.json'
// import { TreeWrap } from './Tree'
import AreaChart from './AreaChart'
import { Card } from 'antd'

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
        <Card>
          <AreaChart/>
        </Card>
      </div>
    );
  }
}

export default App;
