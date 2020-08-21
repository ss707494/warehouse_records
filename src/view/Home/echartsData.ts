import {IRecord} from '../../util/db/appData'
import {EChartOption} from "echarts"
import {formatDate} from '../../util/utils'
import {GoodOrBadLabel} from '../../util/dict'

export const dealOption: (listData: IRecord[]) => {
  [key in 'temperature' | 'flourAmount' | 'produceTime' | 'evaluation' | 'stock']: EChartOption
} = (listData: IRecord[]) => {
  return {
    temperature: {
      title: {
        text: '温度湿度趋势图',
      },
      toolbox: {
        feature: {
          magicType: {show: true, type: ['line', 'bar']},
          saveAsImage: {show: true},
        },
      },
      legend: {
        data: ['温度', '湿度'],
      },
      yAxis: [
        {
          type: 'value',
          name: '温度',
        },
        {
          type: 'value',
          name: '湿度',
        },
      ],
      xAxis: {
        data: listData.map(value => formatDate(value.createDate, 'YYYY/MM/dd')),
      },
      series: [{
        name: '温度',
        type: 'line',
        data: listData.map(value => value.temperature),
      }, {
        name: '湿度',
        type: 'line',
        yAxisIndex: 1,
        data: listData.map(value => value.humidity),
      }],
    },
    flourAmount: {
      title: {
        text: '面粉用量',
      },
      toolbox: {
        // feature: {
        //   magicType: {show: true, type: ['line', 'bar']},
        //   saveAsImage: {show: true},
        // },
      },
      legend: {
        data: ['面粉用量', '用水量'],
      },
      yAxis: [
        {
          type: 'value',
          name: '总量',
        },
      ],
      xAxis: {
        data: listData.map(value => formatDate(value.createDate, 'YYYY/MM/dd')),
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      series: [{
        name: '面粉用量',
        stack: '总量',
        type: 'bar',
        label: {
          show: true,
          position: 'insideRight'
        },
        data: listData.map(value => value.flourAmount),
      }, {
        name: '用水量',
        type: 'bar',
        stack: '总量',
        label: {
          show: true,
          position: 'insideRight'
        },
        data: listData.map(value => value.waterAmount),
      }],
    },
    produceTime: {
      title: {
        text: '生产时间',
      },
      toolbox: {
      },
      legend: {
        data: ['打粉时间', '熟化时间'],
      },
      yAxis: [
        {
          type: 'value',
        },
      ],
      xAxis: {
        data: listData.map(value => formatDate(value.createDate, 'YYYY/MM/dd')),
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      series: [{
        name: '打粉时间',
        stack: '总量',
        type: 'bar',
        label: {
          show: true,
          position: 'insideRight'
        },
        data: listData.map(value => value.powderTime),
      }, {
        name: '熟化时间',
        type: 'bar',
        stack: '总量',
        label: {
          show: true,
          position: 'insideRight'
        },
        data: listData.map(value => value.maturationTime),
      }],
    },
    evaluation: {
      title: {
        text: '评价统计',
      },
      toolbox: {
      },
      legend: {
        data: ['质检员记录情况', '客户反馈情况'],
      },
      yAxis: [
        {
          type: 'category',
          data: ['', '差', '中', '好'],
          name: '评价',
        },
      ],
      xAxis: {
        data: listData.map(value => formatDate(value.createDate, 'YYYY/MM/dd')),
      },
      series: [{
        name: '质检员记录情况',
        type: 'bar',
        data: listData.map(value => GoodOrBadLabel[`${value.qualityInspectorRecords}`]),
      }, {
        name: '客户反馈情况',
        type: 'bar',
        data: listData.map(value => GoodOrBadLabel[`${value.customerFeedback}`]),
      }],
    },
    stock: {
      title: {
        text: '库存趋势',
      },
      yAxis: [
        {
          type: 'value',
          name: '数量',
        },
      ],
      xAxis: {
        data: listData.map(value => formatDate(value.createDate, 'YYYY/MM/dd')),
      },
      series: [{
        name: '库存',
        type: 'line',
        data: listData.map(value => value.stock),
      }],
    },
  }
}
