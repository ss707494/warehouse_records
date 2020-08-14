import {SimpleRecordList} from './list/List'
import {UpdateRecord} from './update/UpdateRecord'
import {SimpleRecordRedirct} from './update/Redirct'

export const SimpleRecordRouter = [{
  path: '/simpleRecord/list',
  component: SimpleRecordList,
}, {
  path: '/simpleRecord/update/:id',
  component: UpdateRecord,
}, {
  path: '/simpleRecord/update',
  component: SimpleRecordRedirct,
}]
