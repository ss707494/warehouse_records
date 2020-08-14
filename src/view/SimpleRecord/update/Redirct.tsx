import React, {useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import {useStoreModel} from '../../../util/ModelAction/useStore'
import {everyDayDataListModel} from '../../EveryDayData/list'

export const SimpleRecordRedirct = () => {
  const history = useHistory()
  const {actions: actionsEveryDayDataListModel} = useStoreModel(everyDayDataListModel)
  useEffect(() => {
    actionsEveryDayDataListModel.getList().then((res: any) => {
      history.push(`/simpleRecord/update/${res.length ? res[0]?.id : '0'}`)
    })
  }, [actionsEveryDayDataListModel, history])

  return <div/>
}
