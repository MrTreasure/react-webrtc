import * as React from 'react'
import Chart from './Chart'
import { cloneDeepWith } from 'lodash'
import { Bind } from 'lodash-decorators'
import * as ECharts from 'echarts'
import ChinaCity from 'echarts/map/json/china-cities.json'
import China from 'echarts/map/json/china.json'
import ChinaContour from 'echarts/map/json/china-contour.json'
import World from 'echarts/map/json/world.json'
import ProvinceList from './provinceList.json'
import { geoCoordMap, scatterData } from './mapData'
import { Button, Select } from 'antd'

ECharts.registerMap('china-cities', ChinaCity)
ECharts.registerMap('china', China)
ECharts.registerMap('china-contour', ChinaContour)
ECharts.registerMap('world', World)

ProvinceList.forEach(province => {
  const map = require('echarts/map/json/province/' + province.path)
  ECharts.registerMap(province.py, map)
})

const Option = Select.Option

const convertData = (data) => {
  let res: any[] = [];
  for (let i = 0; i < data.length; i++) {
    let geoCoord = geoCoordMap[data[i].name];
    if (geoCoord) {
      res.push({
        name: data[i].name,
        value: geoCoord.concat(data[i].value)
      });
    }
  }
  return res;
};

const DEFAULT_OPTION = {
  backgroundColor: '#404a59',
  title: {
    text: '全国主要城市空气质量',
    subtext: 'data from PM25.in',
    sublink: 'http://www.pm25.in',
    x: 'center',
    textStyle: {
      color: '#fff'
    }
  },
  tooltip: {
    trigger: 'item',
    formatter: function (params) {
      return params.name + ' : ' + params.value[2];
    }
  },
  legend: {
    orient: 'vertical',
    y: 'bottom',
    x: 'right',
    data: ['pm2.5'],
    textStyle: {
      color: '#fff'
    }
  },
  visualMap: {
    min: 0,
    max: 200,
    calculable: true,
    inRange: {
      color: ['#50a3ba', '#eac736', '#d94e5d']
    },
    textStyle: {
      color: '#fff'
    }
  },
  geo: {
    map: 'china-cities',
    label: {
      emphasis: {
        show: false
      }
    },
    itemStyle: {
      normal: {
        areaColor: '#323c48',
        borderColor: '#111'
      },
      emphasis: {
        areaColor: '#2a333d'
      }
    }
  },
  series: [
    {
      name: 'pm2.5',
      type: 'scatter',
      coordinateSystem: 'geo',
      data: convertData(scatterData),
      symbolSize: 12,
      label: {
        normal: {
          show: false
        },
        emphasis: {
          show: false
        }
      },
      itemStyle: {
        emphasis: {
          borderColor: '#fff',
          borderWidth: 1
        }
      }
    }
  ]
}

export default class AreaChart extends React.Component {

  public state = {
    option: cloneDeepWith(DEFAULT_OPTION)
  }

  @Bind()
  public handleClick (e) {
    const select = ProvinceList.find(pro => pro.label === e.name)
    select && this.handleSwitchMap(select.py)
  }

  @Bind()
  public handleSwitchMap (map: string) {
    const option = cloneDeepWith(DEFAULT_OPTION)
    option.geo.map = map
    this.setState({
      option
    })
  }

  @Bind()
  public handleProvinceSelect (val: string) {
    this.handleSwitchMap(val)
  }

  public render () {
    const { option } = this.state
    return <div>
      <Chart option={option} height={600} onclick={this.handleClick}/>

      <div className="bt-list" style={{marginTop: '20px'}}>
        <Button style={{marginRight: 10}} onClick={() => this.handleSwitchMap('china')}>省份地图</Button>
        <Button style={{marginRight: 10}} onClick={() => this.handleSwitchMap('china-cities')}>城市地图</Button>
        <Button style={{marginRight: 10}} onClick={() => this.handleSwitchMap('china-contour')}>中国地图</Button>
        <Button style={{marginRight: 10}} onClick={() => this.handleSwitchMap('world')}>世界地图</Button>
        <Select style={{width: 200}} onSelect={this.handleProvinceSelect}>
          {ProvinceList.map((province: any) => <Option key={province.py}>{province.label}</Option>)}
        </Select>
      </div>
    </div>
  }
}