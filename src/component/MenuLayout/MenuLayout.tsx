import React, {useEffect} from 'react'
import {AppBar, Button, Tab, Tabs} from '@material-ui/core'
import {useLocation, useHistory} from 'react-router-dom'
import styled from 'styled-components'
import {everyDayDataListModel} from '../../view/EveryDayData/list'
import {useStoreModel} from '../../util/ModelAction/useStore'

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
const Action = styled.div`
  position: absolute;
  right: 16px;
`
export const MenuLayout = ({children}: any) => {
  const {actions: actionsEveryDayDataListModel, state: stateEveryDayDataListModel} = useStoreModel(everyDayDataListModel)
  useEffect(() => {
    actionsEveryDayDataListModel.getList()
  }, [actionsEveryDayDataListModel])

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
      <Action>
        <Button
            color={'inherit'}
            variant={'text'}
            onClick={() => {
              fetch('/writeToFile', {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                body: JSON.stringify({
                  recordList: stateEveryDayDataListModel.list,
                }),
              }).catch(() => {
              })
            }}
        >写数据</Button>
      </Action>
    </AppBar>
    <main>
      {children}
    </main>
  </Box>
}
