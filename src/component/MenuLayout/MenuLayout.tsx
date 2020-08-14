import React from 'react'
import {AppBar, Tab, Tabs} from '@material-ui/core'
import {useLocation, useHistory} from 'react-router-dom'

const menuData = [{
  label: '趋势图',
  value: '/home',
  pushPath: '/home',
}, {
  label: '列表',
  value: '/everyDayData',
  pushPath: '/everyDayData/list',
}, {
  label: '记录',
  value: '/simpleRecord',
  pushPath: '/simpleRecord/update',
}]

export const MenuLayout = ({children}: any) => {
  const location = useLocation()
  const history = useHistory()
  const value = menuData.findIndex(v => location.pathname.includes(v.value))
  return <div>
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
    {children}
  </div>
}
