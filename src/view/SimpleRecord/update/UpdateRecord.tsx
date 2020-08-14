import React, {useCallback, useEffect, useRef} from 'react'
import {useParams, useHistory} from 'react-router-dom'
import {useStoreModel} from '../../../util/ModelAction/useStore'
import {everyDayDataListModel} from '../../EveryDayData/list'
import styled from 'styled-components'
import {ls} from '../../../util/utils'
import {Button, Divider, TextField} from '@material-ui/core'
import {grey} from '@material-ui/core/colors'
import {DatePicker} from '@material-ui/pickers'
import {updateEveryDayDataModel} from '../../EveryDayData/update/UpdateEveryDayData'
import {cStyle} from '../../../util/style/commonStyle'
import {showNotistack} from '../../../component/SnackbarProvider'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import {Autocomplete} from '@material-ui/lab'

const Box = styled.div`
  margin: 32px;
  border: 1px solid ${grey[300]};
  border-radius: 8px;
`
const Header = styled.div`
  font-size: large;
  font-weight: bold;
  padding: 24px;
  display: flex;
  justify-content: center;
  position: relative;
  > aside {
    position: absolute;
    right: 32px;
    top: 16px;
  }
`
const MainForm = styled.div<{ref: any}>`
  display: grid;
`
const FormItem = styled.div`
  display: flex;
  padding: 8px 8px 8px 24px;
  align-items: center;
  //border-top: 1px solid ${grey[500]};
  > aside {
    margin-right: 16px;
  }
`
const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  background: ${grey[300]};
`
const FitFoot = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  background: ${grey[200]};
  box-shadow: ${cStyle.shadow['1']};
`
const Foot = styled.div`
  padding: 8px 8px 8px 24px;
`

export const UpdateRecord = () => {
  const mainForm = useRef(null)
  const {id} = useParams()
  const isAdd = id === '0'
  const history = useHistory()
  const {actions: actionsEveryDayDataListModel, state: stateEveryDayDataListModel} = useStoreModel(everyDayDataListModel)
  const {actions: actionsUpdateEveryDayData, state: stateUpdateEveryDayData} = useStoreModel(updateEveryDayDataModel)
  const init = useCallback(async () => {
    const res = await actionsEveryDayDataListModel.getList()
    if (!isAdd && res.length === 0) {
      debugger
      history.push(`/simpleRecord/update/0`)
    }
  }, [actionsEveryDayDataListModel, history, isAdd])
  useEffect(() => {
    init()
  }, [init])
  const index = stateEveryDayDataListModel.list.findIndex(v => v.id === ~~id)
  const item = stateEveryDayDataListModel.list?.[index]
  useEffect(() => {
    if (item?.id && item?.id !== stateUpdateEveryDayData.form?.id) {
      actionsUpdateEveryDayData.setOneItem(item)
    }
  }, [actionsUpdateEveryDayData, item, stateUpdateEveryDayData.form])
  useEffect(() => {
    if (isAdd) {
      actionsUpdateEveryDayData.clearForm()
    }
  }, [actionsUpdateEveryDayData, isAdd])
  const submit = useCallback(async () => {
    const res = await actionsUpdateEveryDayData.saveOne()
    if (res) {
      showNotistack('操作成功')
      await actionsEveryDayDataListModel.getList()
      if (isAdd && res) {
        history.push(`/simpleRecord/update/${res}`)
      }
    }
  }, [actionsEveryDayDataListModel, actionsUpdateEveryDayData, history, isAdd])
  useEffect(() => {
    // next focus
    if (mainForm?.current) {
      const focusHelp = (e: any) => {
        if (e.charCode === 13) {
          // @ts-ignore
          const inputList = [...document.querySelectorAll('input')]
          const i = inputList.indexOf(e.target)
          if (inputList.length === i + 1) {
            submit()
          } else {
            inputList[i + 1].focus()
          }
        }
      }
      // @ts-ignore
      mainForm?.current?.addEventListener('keypress', focusHelp)
      return () => {
        // @ts-ignore
        mainForm?.current?.removeEventListener('keypress', focusHelp)
      }
    }
  }, [actionsUpdateEveryDayData, submit])

  return <Box>
    <Header>
      <span>
      {ls(isAdd ? '新增记录' : '记录表')}
      </span>
      {!isAdd && <aside>
        <Button
            variant={'text'}
            onClick={() => {
              history.push(`/simpleRecord/update/0`)
            }}
        >
          <AddCircleOutlineIcon/>
          {ls('添加记录')}
        </Button>
      </aside>}
    </Header>
    <Divider/>
    <MainForm
        ref={mainForm}
    >
      <FormItem>
        <aside>{ls('日期')}</aside>
        <main>
          <DatePicker
              inputVariant={'outlined'}
              size={'small'}
              value={stateUpdateEveryDayData.form.createDate}
              onChange={(date) => {
                actionsUpdateEveryDayData.setForm(['createDate', date])
              }}
              format={'yyyy/MM/dd'}
          />
        </main>
      </FormItem>
      <Divider/>
      <Title>基本信息</Title>
      <Divider/>
      <FormItem>
        <aside>{ls('天气')}</aside>
        <main>
          <Autocomplete
              style={{width: '223px'}}
              options={['晴', '雨']}
              freeSolo={true}
              value={stateUpdateEveryDayData.form.weather}
              onChange={(e, value) => {
                actionsUpdateEveryDayData.setForm(['weather', value])
              }}
              renderInput={(p) =>
                <TextField
                    {...p}
                    variant={'outlined'}
                    size={'small'}
                />
              }
          />
        </main>
      </FormItem>
      <Divider/>
      <FormItem>
        <aside>{ls('温度')}</aside>
        <main>
          <TextField
              type={'number'}
              size={'small'}
              variant={'outlined'}
              value={stateUpdateEveryDayData.form.temperature}
              onChange={(e) => {
                actionsUpdateEveryDayData.setForm(['temperature', e.target.value])
              }}
              InputProps={{
                endAdornment: <span>℃</span>,
              }}
          />
        </main>
      </FormItem>
      <Divider/>
      <FormItem>
        <aside>{ls('湿度')}</aside>
        <main>
          <TextField
              type={'number'}
              size={'small'}
              variant={'outlined'}
              value={stateUpdateEveryDayData.form.humidity}
              onChange={(e) => {
                actionsUpdateEveryDayData.setForm(['humidity', e.target.value])
              }}
          />
        </main>
      </FormItem>
      <Divider/>
      <FormItem>
        <aside>{ls('数量')}</aside>
        <main>
          <TextField
              type={'number'}
              size={'small'}
              variant={'outlined'}
              value={stateUpdateEveryDayData.form.amount}
              onChange={(e) => {
                actionsUpdateEveryDayData.setForm(['amount', e.target.value])
              }}
          />
        </main>
      </FormItem>
      <Divider/>
      <Foot>
        <Button
            size={'large'}
            variant={'contained'}
            color={'primary'}
            onClick={submit}
        >保存</Button>
      </Foot>
    </MainForm>
    {!isAdd && <FitFoot>
      <Button
          disabled={index <= 0}
          fullWidth={true}
          size={'large'}
          onClick={() => {
            const pre = stateEveryDayDataListModel.list[index - 1]
            if (pre?.id) {
              history.push(`/simpleRecord/update/${pre.id}`)
            }
          }}
      >{ls('上一页')}</Button>
      <Button
          disabled={index >= stateEveryDayDataListModel.list.length - 1}
          fullWidth={true}
          size={'large'}
          onClick={() => {
            const next = stateEveryDayDataListModel.list[index + 1]
            if (next?.id) {
              history.push(`/simpleRecord/update/${next.id}`)
            }
          }}
      >{ls('下一页')}</Button>
    </FitFoot>}
  </Box>
}
