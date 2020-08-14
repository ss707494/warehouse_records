import Dexie from 'dexie'

export class MyAppDatabase extends Dexie {
  // Declare implicit table properties.
  // (just to inform Typescript. Instanciated by Dexie in stores() method)
  contacts: Dexie.Table<IContact, number> // number = type of the primkey
  record: Dexie.Table<IRecord, number>

  constructor() {
    super('MyAppDatabase')
    this.version(1).stores({
      contacts: '++id, first, last',
      record: '++id, createDate, updateDate, isDelete, weather, temperature, humidity, produceType, amount',
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
  weather: string,
  temperature: number | string,
  humidity: number | string,
  produceType: string,
  amount: number | string,
}

export const db = new MyAppDatabase()

