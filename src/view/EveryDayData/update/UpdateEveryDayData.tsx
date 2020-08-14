import React, {useEffect} from 'react'
import {Button, TextField} from '@material-ui/core'
import {fpMergePre, fpSetPre, ls, setForm} from '../../../util/utils'
import {useHistory} from 'react-router-dom'
import styled from 'styled-components'
import {KeyboardDatePicker} from '@material-ui/pickers'
import {modelFactory} from '../../../util/ModelAction/modelUtil'
import {db, IRecord} from '../../../util/db/appData'
import {useStoreModel} from '../../../util/ModelAction/useStore'
import {Space} from '../../../component/Space'
import {showNotistack} from '../../../component/SnackbarProvider'

const initForm = {
  amount: '',
  humidity: '',
  isDelete: 0,
  produceType: '',
  temperature: '',
  weather: '',
}
export const updateEveryDayDataModel = modelFactory('UpdateEveryDayData', {
  form: initForm as IRecord,
  tip: '',
}, {
  setForm: setForm,
  clearForm: (value, option) => {
    option.setData(fpSetPre('form', {
      ...initForm,
      createDate: new Date(),
    }))
  },
  setOneItem: (value: IRecord, option) => {
    option.setData(fpSetPre('form', value))
  },
  saveOne: async (value, option) => {
    return db.record.put({
      ...option.data.form,
    })
  },
  setTip: (value, option) => option.setData(fpMergePre({tip: value}))
})

const Box = styled.div`
  padding: 24px;
`
const Main = styled.div`
  margin-top: 16px;
  display: grid;
  grid-gap: 16px;
  grid-template-columns: repeat(2, 1fr);
`

export const UpdateEveryDayData = () => {
  const history = useHistory()
  const {actions: actionsUpdateEveryDayData, state: stateUpdateEveryDayData} = useStoreModel(updateEveryDayDataModel)
  useEffect(() => {
    actionsUpdateEveryDayData.setForm(['createDate', new Date()])
  }, [actionsUpdateEveryDayData])

  return <Box>
    <header>
      <Button
          variant={'outlined'}
          color={'primary'}
          onClick={async () => {
            if (await actionsUpdateEveryDayData.saveOne()) {
              showNotistack('操作成功')
              history.goBack()
            }
          }}
      >{ls('保存')}</Button>
      <Space w={8}/>
      <Button
          variant={'outlined'}
          onClick={() => {
            history.goBack()
          }}
      >{ls('返回')}</Button>
    </header>
    <Main>
      <KeyboardDatePicker
          label={'取货日期'}
          value={stateUpdateEveryDayData.form.createDate}
          onChange={(date) => {
            actionsUpdateEveryDayData.setForm(['createDate', date])
          }}
      />
      <TextField
          label={'天气'}
          value={stateUpdateEveryDayData.form.weather}
          onChange={(e) => {
            actionsUpdateEveryDayData.setForm(['weather', e.target.value])
          }}
      />
      <TextField
          type={'number'}
          label={'温度'}
          value={stateUpdateEveryDayData.form.temperature}
          onChange={(e) => {
            actionsUpdateEveryDayData.setForm(['temperature', e.target.value])
          }}
          InputProps={{
            endAdornment: <span>℃</span>
          }}
      />
      <TextField
          type={'number'}
          label={'湿度'}
          value={stateUpdateEveryDayData.form.humidity}
          onChange={(e) => {
            actionsUpdateEveryDayData.setForm(['humidity', e.target.value])
          }}
      />
    </Main>
  </Box>
}
