import React, {useEffect} from 'react'
import {ls} from '../../util/utils'
import ReactEcharts from 'echarts-for-react'
import styled from 'styled-components'
import {useStoreModel} from '../../util/ModelAction/useStore'
import {everyDayDataListModel} from '../EveryDayData/list'
import {Paper} from '@material-ui/core'
import {dealOption} from './echartsData'

const Box = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: auto;
`
const ChartBox = styled.div`
  flex-grow: 1;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-flow: row;
  grid-gap: 24px;
  grid-auto-rows: max-content;
  &&& {
    .MuiPaper-root {
      height: 37vh;
    }
  }
`
export const Home = () => {
  const {actions: actionsEveryDayDataListModel, state: stateEveryDayDataListModel} = useStoreModel(everyDayDataListModel)
  useEffect(() => {
    actionsEveryDayDataListModel.getList()
  }, [actionsEveryDayDataListModel])

  return <Box>
    {stateEveryDayDataListModel.list.length && <ChartBox>
      <Paper>
        <ReactEcharts
            style={{height: '100%'}}
            option={dealOption(stateEveryDayDataListModel.list).temperature}
        />
      </Paper>
      <Paper>
        <ReactEcharts
            style={{height: '100%'}}
            option={dealOption(stateEveryDayDataListModel.list).flourAmount}
        />
      </Paper>
      <Paper>
        <ReactEcharts
            style={{height: '100%'}}
            option={dealOption(stateEveryDayDataListModel.list).produceTime}
        />
      </Paper>
      <Paper>
        <ReactEcharts
            style={{height: '100%'}}
            option={dealOption(stateEveryDayDataListModel.list).evaluation}
        />
      </Paper>
      <Paper>
        <ReactEcharts
            style={{height: '100%'}}
            option={dealOption(stateEveryDayDataListModel.list).stock}
        />
      </Paper>
    </ChartBox>}
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
