import React from 'react'
import {ls} from '../../util/utils'
import ReactEcharts from 'echarts-for-react'
import {optionExample} from './echartsData'
import styled from 'styled-components'

const Box = styled.div`
  padding: 24px;
`
export const Home = () => {

  return <Box>
    <ReactEcharts
        option={optionExample}
    />
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
