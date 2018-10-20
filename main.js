const fs = require('fs-extra')
const path = require('path')

async function main () {
  const provinceList = await fs.readdir(path.resolve(__dirname, './node_modules/echarts/map/json/province'))

  const data = provinceList.map(province => ({
    py: province.replace('.json', ''),
    label: '',
    path: province
  }))

  fs.writeJson('./provinceList.json', data)
}

main()
