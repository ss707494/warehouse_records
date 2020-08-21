import Dexie from 'dexie'

export class MyAppDatabase extends Dexie {
  // Declare implicit table properties.
  // (just to inform Typescript. Instanciated by Dexie in stores() method)
  contacts: Dexie.Table<IContact, number> // number = type of the primkey
  record: Dexie.Table<IRecord, number>

  constructor() {
    super('MyAppDatabase')
    this.version(12)
        .stores({
      contacts: '++id, first, last',
      record: '++id, createDate, updateDate, isDelete, weather, temperature, humidity, produceType, stock, flourType, flourAmount, waterAmount, appearance, bestWaterAmount, powderTime, maturationTime, isShortCard, packageCondition, qualityInspectorRecords, customerFeedback',
      //...other tables goes here...
    })
    // The following line is needed if your typescript
    // is compiled using babel instead of tsc:
    this.contacts = this.table('contacts')
    this.record = this.table('record')
  }
}

interface IContact {
  id?: number,
  first: string,
  last: string
}

export interface IRecord {
  id?: number,
  createDate?: Date,
  updateDate?: Date,
  isDelete: number,
  // 天气
  weather: string,
  // 温度
  temperature: number | string,
  // 湿度
  humidity: number | string,
  // 产品类型
  produceType: string,
  // 数量
  stock: number | string,
  // 面粉类型
  flourType?: string,
  // 面粉用量
  flourAmount?: number | string,
  // 用水量
  waterAmount?: number | string,
  // 外观评价
  appearance?: string,
  // 最佳用水量
  bestWaterAmount?: number | string,
  // 打粉时间
  powderTime?: number | string,
  // 熟化时间
  maturationTime?: number | string,
  // 压缩中有无短片
  isShortCard?: boolean,
  // 包装情况
  packageCondition?: string,
  // 质检员记录情况
  qualityInspectorRecords?: string,
  // 客户反馈情况
  customerFeedback?: string,

}

export const db = new MyAppDatabase()

