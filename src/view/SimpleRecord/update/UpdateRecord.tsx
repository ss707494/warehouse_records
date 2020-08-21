import React, {useCallback, useEffect, useRef} from 'react'
import {useHistory, useParams} from 'react-router-dom'
import {useStoreModel} from '../../../util/ModelAction/useStore'
import {everyDayDataListModel} from '../../EveryDayData/list'
import styled from 'styled-components'
import {ls} from '../../../util/utils'
import {Button, Divider, InputAdornment, TextField, TextFieldProps} from '@material-ui/core'
import {grey} from '@material-ui/core/colors'
import {DatePicker} from '@material-ui/pickers'
import {updateEveryDayDataModel} from '../../EveryDayData/update/UpdateEveryDayData'
import {cStyle} from '../../../util/style/commonStyle'
import {showNotistack} from '../../../component/SnackbarProvider'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import {Autocomplete} from '@material-ui/lab'
import {GoodOrBad, GoodOrBadLabel} from '../../../util/dict'

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
const MainForm = styled.div<{ ref: any }>`
  display: grid;
`
const FormItem = styled.div<React.HTMLProps<HTMLElement> & { flexBase?: number | string }>`
  display: flex;
  padding: 8px 16px 8px 24px;
  align-items: center;
  flex-basis: ${prop => prop.flexBase ?? 1};
  > aside {
    margin-right: auto;
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
const Row = styled.div`
  display: flex;
`
const TextFieldOut = styled(TextField)
    .attrs(() => ({
      size: 'small',
      variant: 'outlined',
    }))<TextFieldProps>`
`

const dealFocus = (e: any, submit: any) => {
  // @ts-ignore
  const inputList = [...document.querySelectorAll('input')]
  const i = inputList.indexOf(e)
  if (inputList.length === i + 1) {
    submit()
  } else {
    inputList[i + 1].focus()
  }
}
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
          dealFocus(e.target, submit)
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

  const helpOptionFocus = (id: string) => ({
    id: `main${id}`,
    onClose: (event: any , reason: any) => {
      if (reason === 'select-option') {
        dealFocus(document.querySelector(`#main${id}`), submit)
      }
    }
  })

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
      <Row>
        <FormItem flexBase={'20%'}>
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
        <Divider orientation={'vertical'}
                 flexItem/>
        <FormItem flexBase={'20%'}>
          <aside>{ls('天气')}</aside>
          <main>
            <Autocomplete
                {...helpOptionFocus('weather')}
                openOnFocus={true}
                style={{width: '223px'}}
                options={['晴', '雨']}
                freeSolo={true}
                value={stateUpdateEveryDayData.form.weather}
                onChange={(e, value) => {
                  actionsUpdateEveryDayData.setForm(['weather', value])
                }}
                renderInput={(p) =>
                    <TextFieldOut
                        {...p}
                    />
                }
            />
          </main>
        </FormItem>
        <Divider orientation={'vertical'}
                 flexItem/>
        <FormItem flexBase={'20%'}>
          <aside>{ls('温度')}</aside>
          <main>
            <TextFieldOut
                type={'number'}
                value={stateUpdateEveryDayData.form.temperature}
                onChange={(e) => {
                  actionsUpdateEveryDayData.setForm(['temperature', e.target.value])
                }}
                InputProps={{
                  endAdornment: <InputAdornment
                      position={'end'}
                  >℃</InputAdornment>,
                }}
            />
          </main>
        </FormItem>
        <Divider orientation={'vertical'}
                 flexItem/>
        <FormItem flexBase={'20%'}>
          <aside>{ls('湿度')}</aside>
          <main>
            <TextFieldOut
                type={'number'}
                value={stateUpdateEveryDayData.form.humidity}
                onChange={(e) => {
                  actionsUpdateEveryDayData.setForm(['humidity', e.target.value])
                }}
            />
          </main>
        </FormItem>
      </Row>
      <Divider/>
      <Title>基本信息</Title>
      <Divider/>
      <Row>
        <FormItem flexBase={'20%'}>
          <aside>{ls('面粉品种')}</aside>
          <main>
            <TextFieldOut
                value={stateUpdateEveryDayData.form.flourType}
                onChange={(e) => {
                  actionsUpdateEveryDayData.setForm(['flourType', e.target.value])
                }}
            />
          </main>
        </FormItem>
        <Divider orientation={'vertical'}
                 flexItem/>
        <FormItem flexBase={'20%'}>
          <aside>{ls('面粉量')}</aside>
          <main>
            <TextFieldOut
                type={'number'}
                value={stateUpdateEveryDayData.form.flourAmount}
                onChange={(e) => {
                  actionsUpdateEveryDayData.setForm(['flourAmount', e.target.value])
                }}
            />
          </main>
        </FormItem>
        <Divider orientation={'vertical'}
                 flexItem/>
        <FormItem flexBase={'20%'}>
          <aside>{ls('用水量')}</aside>
          <main>
            <TextFieldOut
                type={'number'}
                value={stateUpdateEveryDayData.form.waterAmount}
                onChange={(e) => {
                  actionsUpdateEveryDayData.setForm(['waterAmount', e.target.value])
                }}
            />
          </main>
        </FormItem>
        <Divider orientation={'vertical'}
                 flexItem/>
        <FormItem flexBase={'12%'}>
          <aside>{ls('产品外观')}</aside>
          <main>
            <Autocomplete
                {...helpOptionFocus('appearance')}
                openOnFocus={true}
                options={Object.keys(GoodOrBad)}
                getOptionLabel={key => GoodOrBadLabel[key] ?? ''}
                value={stateUpdateEveryDayData.form.appearance}
                onChange={(e, value) => {
                  actionsUpdateEveryDayData.setForm(['appearance', value])
                }}
                renderInput={(p) =>
                    <TextFieldOut
                        {...p}
                    />
                }
            />
          </main>
        </FormItem>
        <Divider orientation={'vertical'}
                 flexItem/>
        <FormItem flexBase={'16%'}>
          <aside>{ls('预测最佳水量')}</aside>
          <main>
            <TextFieldOut
                style={{width: '160px'}}
                value={stateUpdateEveryDayData.form.bestWaterAmount}
                onChange={(e) => {
                  actionsUpdateEveryDayData.setForm(['bestWaterAmount', e.target.value])
                }}
            >
            </TextFieldOut>
          </main>
        </FormItem>
      </Row>
      <Title>{ls('生产过程')}</Title>
      <Row>
        <FormItem flexBase={'20%'}>
          <aside>{ls('打粉时间')}</aside>
          <main>
            <TextFieldOut
                type={'number'}
                value={stateUpdateEveryDayData.form.powderTime}
                onChange={(e) => {
                  actionsUpdateEveryDayData.setForm(['powderTime', e.target.value])
                }}
                InputProps={{
                  endAdornment: <InputAdornment
                      position={'end'}
                  >{ls('分钟')}</InputAdornment>,
                }}
            >
            </TextFieldOut>
          </main>
        </FormItem>
        <Divider orientation={'vertical'}
                 flexItem/>
        <FormItem flexBase={'20%'}>
          <aside>{ls('熟化时间')}</aside>
          <main>
            <TextFieldOut
                type={'number'}
                value={stateUpdateEveryDayData.form.maturationTime}
                onChange={(e) => {
                  actionsUpdateEveryDayData.setForm(['maturationTime', e.target.value])
                }}
                InputProps={{
                  endAdornment: <InputAdornment
                      position={'end'}
                  >{ls('分钟')}</InputAdornment>,
                }}
            >
            </TextFieldOut>
          </main>
        </FormItem>
        <Divider orientation={'vertical'}
                 flexItem/>
        <FormItem flexBase={'20%'}>
          <aside>{ls('压缩中有无短片')}</aside>
          <main>
            <Autocomplete
                {...helpOptionFocus('isShortCard')}
                openOnFocus={true}
                options={[true, false]}
                getOptionLabel={key => key ? '有' : '无'}
                value={stateUpdateEveryDayData.form.isShortCard}
                onChange={(e, value) => {
                  actionsUpdateEveryDayData.setForm(['isShortCard', value])
                }}
                renderInput={(p) =>
                    <TextFieldOut
                        {...p}
                    />
                }
            />
          </main>
        </FormItem>
        <Divider orientation={'vertical'}
                 flexItem/>
        <FormItem flexBase={'12%'}>
          <aside>{ls('包装情况')}</aside>
          <main>
            <Autocomplete
                {...helpOptionFocus('packageCondition')}
                openOnFocus={true}
                options={Object.keys(GoodOrBad)}
                getOptionLabel={key => GoodOrBadLabel[key] ?? ''}
                value={stateUpdateEveryDayData.form.packageCondition}
                onChange={(e, value) => {
                  actionsUpdateEveryDayData.setForm(['packageCondition', value])
                }}
                onClose={(event, reason) => {
                  if (reason === 'select-option') {
                    dealFocus(event.target, submit)
                  }
                }}
                renderInput={(p) =>
                    <TextFieldOut
                        {...p}
                    />
                }
            />
          </main>
        </FormItem>
        <Divider orientation={'vertical'}
                 flexItem/>
      </Row>
      <Title>{ls('品质追踪')}</Title>
      <Row>
        <FormItem flexBase={'20%'}>
          <aside>{ls('质检员记录情况')}</aside>
          <main>
            <Autocomplete
                {...helpOptionFocus('qualityInspectorRecords')}
                openOnFocus={true}
                options={Object.keys(GoodOrBad)}
                getOptionLabel={key => GoodOrBadLabel[key] ?? ''}
                value={stateUpdateEveryDayData.form.qualityInspectorRecords}
                onChange={(e, value) => {
                  actionsUpdateEveryDayData.setForm(['qualityInspectorRecords', value])
                }}
                renderInput={(p) =>
                    <TextFieldOut
                        {...p}
                    />
                }
            />
          </main>
        </FormItem>
        <Divider orientation={'vertical'}
                 flexItem/>
        <FormItem flexBase={'20%'}>
          <aside>{ls('客户反馈情况')}</aside>
          <main>
            <Autocomplete
                {...helpOptionFocus('customerFeedback')}
                openOnFocus={true}
                options={Object.keys(GoodOrBad)}
                getOptionLabel={key => GoodOrBadLabel[key] ?? ''}
                getOptionSelected={(option, value) => {
                  return option === value
                }}
                value={stateUpdateEveryDayData.form.customerFeedback}
                onChange={(e, value) => {
                  actionsUpdateEveryDayData.setForm(['customerFeedback', value])
                }}
                renderInput={(p) =>
                    <TextFieldOut
                        {...p}
                    />
                }
            />
          </main>
        </FormItem>
        <Divider orientation={'vertical'}
                 flexItem/>
      </Row>
      <Divider/>
      <Row>
        <FormItem flexBase={'20%'}>
          <aside>{ls('当前库存')}</aside>
          <main>
            <TextFieldOut
                type={'number'}
                value={stateUpdateEveryDayData.form.stock}
                onChange={(e) => {
                  actionsUpdateEveryDayData.setForm(['stock', e.target.value])
                }}
            />
          </main>
        </FormItem>
        <Divider orientation={'vertical'}
                 flexItem/>
      </Row>
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
