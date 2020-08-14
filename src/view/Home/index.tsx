import React, {useEffect} from 'react'
import {formatDate, ls} from '../../util/utils'
import ReactEcharts from 'echarts-for-react'
import styled from 'styled-components'
import {useStoreModel} from '../../util/ModelAction/useStore'
import {everyDayDataListModel} from '../EveryDayData/list'
import {IRecord} from '../../util/db/appData'

const dealOption = (listData: IRecord[]) => {
  if (!listData.length) return {}
  console.log(listData)
  return {
    toolbox: {
      feature: {
        magicType: {show: true, type: ['line', 'bar']},
        saveAsImage: {show: true}
      }
    },
    legend: {
      data: ['温度', '湿度'],
    },
    yAxis: [
      {
        type: 'value',
        name: '温度',
      },
      {
        type: 'value',
        name: '湿度',
      },
    ],
    xAxis: {
      data: listData.map(value => formatDate(value.createDate, 'YYYY/MM/dd')),
    },
    series: [{
      name: '温度',
      type: 'bar',
      data: listData.map(value => value.temperature),
    }, {
      name: '湿度',
      type: 'bar',
      yAxisIndex: 1,
      data: listData.map(value => value.humidity),
    }],
  }
}

const Box = styled.div`
  padding: 24px;
`
export const Home = () => {
  const {actions: actionsEveryDayDataListModel, state: stateEveryDayDataListModel} = useStoreModel(everyDayDataListModel)
  useEffect(() => {
    actionsEveryDayDataListModel.getList()
  }, [actionsEveryDayDataListModel])
  console.log(stateEveryDayDataListModel.list)

  return <Box>
    {stateEveryDayDataListModel.list.length && <ReactEcharts
        option={dealOption(stateEveryDayDataListModel.list)}
    />}
    <footer>
      {ls('示例参考')}
      <a
          href={'https://echarts.apache.org/examples/zh/index.html'}
          target="_blank"
          rel="noreferrer noopener"
      >https://echarts.apache.org/examples/zh/index.html</a>
    </footer>
  </Box>
}
