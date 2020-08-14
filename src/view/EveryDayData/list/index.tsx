import React, {useEffect} from 'react'
import {Space} from '../../../component/Space'
import {Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@material-ui/core'
import {formatDate, fpMergePre, ls} from '../../../util/utils'
import {useHistory} from 'react-router-dom'
import styled from 'styled-components'
import {modelFactory} from '../../../util/ModelAction/modelUtil'
import {db, IRecord} from '../../../util/db/appData'
import {useStoreModel} from '../../../util/ModelAction/useStore'

export const everyDayDataListModel = modelFactory('EveryDayDataList', {
  list: [] as IRecord[],
}, {
  getList: async (value, option) => {
    const res = await db.record.toArray()
    option.setData(fpMergePre({
      list: res,
    }))
    return res
  },
})

const Box = styled.div`
  padding: 24px;
`

export const EveryDayDataList = () => {
  const history = useHistory()
  const {actions: actionsEveryDayDataListModel, state: stateEveryDayDataListModel} = useStoreModel(everyDayDataListModel)
  useEffect(() => {
    actionsEveryDayDataListModel.getList()
  }, [actionsEveryDayDataListModel])

  return <Box>
    <header>
      <Button
          variant={'outlined'}
          onClick={() => {
            history.push('/everyDayData/update')
          }}
      >{ls('Add')}</Button>
    </header>
    <Space h={16}/>
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{ls('创建日期')}</TableCell>
            <TableCell>{ls('天气')}</TableCell>
            <TableCell>{ls('温度')}</TableCell>
            <TableCell>{ls('湿度')}</TableCell>
            <TableCell>{ls('数量')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stateEveryDayDataListModel.list?.map(v => <TableRow
              key={`stateEveryDayDataListModel${v.id}`}
          >
            <TableCell>{formatDate(v.createDate)}</TableCell>
            <TableCell>{v.weather}</TableCell>
            <TableCell>{v.temperature}</TableCell>
            <TableCell>{v.humidity}</TableCell>
            <TableCell>{v.amount}</TableCell>
          </TableRow>)}
        </TableBody>
      </Table>
    </TableContainer>
  </Box>
}
