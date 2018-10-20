import * as React from 'react'
import * as ECharts from 'echarts'

interface IProps {
  option: ECharts.EChartOption
  height?: number
  onclick?: (event) => void
}

export default class Chart extends React.Component<IProps, any> {
  private wrap: HTMLDivElement
  private chart: ECharts.ECharts

  public componentDidMount () {
    this.chart = ECharts.init(this.wrap)
    this.chart.setOption(this.props.option)
    if (this.props.onclick) {
      this.chart.on('click', this.props.onclick)
    }
  }

  public getSnapshotBeforeUpdate () {
    if (!this.chart) return null
    this.chart.setOption(this.props.option)
    return null
  }

  public render () {
    const { height } = this.props
    return (
      <div ref={ref => ref && (this.wrap = ref)} style={{height: (height || 200) + 'px'}}/>
    )
  }

  public componentWillUnmount () {
    this.chart.clear()
    this.chart.dispose()
  }
}