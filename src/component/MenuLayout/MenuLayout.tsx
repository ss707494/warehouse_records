import React from 'react'
import {AppBar, Tab, Tabs} from '@material-ui/core'
import {useLocation, useHistory} from 'react-router-dom'
import styled from 'styled-components'

const menuData = [{
  label: '趋势图',
  value: '/home',
  pushPath: '/home',
}, {
  label: '记录',
  value: '/simpleRecord',
  pushPath: '/simpleRecord/update',
}, {
  label: '列表',
  value: '/everyDayData',
  pushPath: '/everyDayData/list',
}]

const Box = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  > main {
    height: calc(100vh - 48px);
  }
`
export const MenuLayout = ({children}: any) => {
  const location = useLocation()
  const history = useHistory()
  const value = menuData.findIndex(v => location.pathname.includes(v.value))
  return <Box>
    <AppBar position={'static'}>
      <Tabs
          value={value}
          onChange={(e, value) => {
            history.push(menuData[value]?.pushPath ?? menuData[value]?.value ?? '')
          }}
      >
        {menuData.map(v => <Tab
            key={`menuData_${v.value}`}
            label={v.label}
        />)}
      </Tabs>
    </AppBar>
    <main>
      {children}
    </main>
  </Box>
}
