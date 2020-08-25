import React from 'react'
import {Dialog, DialogContent} from '@material-ui/core'
import {dialogModelFactory} from '../../util/commonModel/dialog'
import {useStoreModel} from '../../util/ModelAction/useStore'
import ReactEcharts from 'echarts-for-react'

export const EchartsDialogModel = dialogModelFactory('EchartsDialog', {})

export const EchartsDialog = () => {
  const {actions: actionsEchartsDialogModel, state: stateEchartsDialogModel} = useStoreModel(EchartsDialogModel)
  console.log(stateEchartsDialogModel.dialogData)
  return <Dialog
      maxWidth={'lg'}
      fullWidth={true}
      open={stateEchartsDialogModel.open}
      onClose={actionsEchartsDialogModel.onClose}
  >
    <DialogContent>
      <ReactEcharts
          style={{height: '70vh', width: '100%'}}
          option={stateEchartsDialogModel.dialogData}
      />
    </DialogContent>
  </Dialog>
}
