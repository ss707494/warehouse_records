import {EveryDayDataList} from './list'
import { UpdateEveryDayData } from './update/UpdateEveryDayData'

export const everyDayDataRouter = [{
  path: '/everyDayData/list',
  component: EveryDayDataList,
}, {
  path: '/everyDayData/update',
  component: UpdateEveryDayData,
}]
