
// import 'highlight.js/styles/atom-one-light.css'
import * as React from 'react'
import * as hljs from 'highlight.js/lib/highlight'
import * as javascript from 'highlight.js/lib/languages/javascript'
// import * as styles from './styles.json'

hljs.registerLanguage('javascript', javascript)
// import * as hljs from 'highlight.js'

interface IProps {
  content: string
  css: string
}

export class HighLight extends React.Component<IProps, any> {
  private code: HTMLPreElement | null

  constructor(props) {
    super(props)
    require('highlight.js/styles/' + this.props.css)
  }

  static async getDerivedStateFromProps(nextProps) {
    // const css = await import('highlight.js/styles/' + nextProps.css)
    const css = require('highlight.js/styles/' + nextProps.css)
    console.log(css)
    return null
  }

  public componentDidMount() {
    hljs.highlightBlock((this.code as any))
  }

  public render() {
    return (
      <pre ref={ref => this.code = ref} style={{marginTop: 20}}>
        <code>{this.props.content}</code>
      </pre>
    )
  }
}