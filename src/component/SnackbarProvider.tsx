import {SnackbarProvider, useSnackbar} from 'notistack'
import React, {useEffect} from 'react'
import {modelFactory} from '../util/ModelAction/modelUtil'
import {fpMergePre} from '../util/utils'
import {originStore, useStoreModel} from '../util/ModelAction/useStore'
import {SnackbarProps} from '@material-ui/core/Snackbar/Snackbar'

type MessageProps = Partial<SnackbarProps & {
  msg_type: 'default' | 'success' | 'info' | 'warning' | 'error' | string
}>

const SnackbarProviderWrapperModel = modelFactory('SnackbarProviderWrapper', {
  enqueueSnackbar: () => {},
  closeSnackbar: () => {},
}, {
  init: (value: any, option) => option.setData(fpMergePre({
    enqueueSnackbar: value.enqueueSnackbar,
    closeSnackbar: value.closeSnackbar,
  })),
})

export const SnackbarProviderBox = ({el}: {el: any}) => {
  const value = useSnackbar()
  const {actions: actionsSnackbarProviderWrapper} = useStoreModel(SnackbarProviderWrapperModel)
  useEffect(() => {
    if (value) {
      actionsSnackbarProviderWrapper.init(value)
    }
  }, [actionsSnackbarProviderWrapper, value])
  return <div>
    {el}
  </div>
}

export const SnackbarProviderWrapper = (el: any) => {
  return <SnackbarProvider maxSnack={3}>
    <SnackbarProviderBox el={el}/>
  </SnackbarProvider>
}

export const showNotistack = (option: string | MessageProps) => {
  originStore['SnackbarProviderWrapper'].state.enqueueSnackbar(option)
  return
}

export const closeNotistack = (option?: string | MessageProps) => {
  originStore['SnackbarProviderWrapper'].state.closeSnackbar(option)
  return
}
