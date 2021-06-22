<!--
 * @Author: cui DengKe
 * @Date: 2021-04-15 20:33:01
 * @LastEditors: cui DengKe
 * @LastEditTime: 2021-06-16 10:55:09
 * @Description: 首屏 年度迟到情况 数据统计图表
 * @FilePath: \vue-salary-management\src\views\dashBoard\components\EchatrtsStatistics.vue
-->
<template>
  <div class="margin-txl">
    <EchartsTitle title="年度迟到情况" subTitle="数据统计图表">
      <template #rightSlot>
        <div style="float: right">
          <a-button :type="isChoose === 'now' ? 'primary' : 'default'">今年</a-button>
          <a-button :type="isChoose === 'now' ? 'default' : 'primary'" class="margin-ls">去年</a-button>
          <a-button class="margin-ls">近七日</a-button>
          <a-range-picker
            :locale="locale"
            class="margin-ls"
            format="YYYY-MM-DD"
            v-model:value="dateRange"
          />
        </div>
      </template>
    </EchartsTitle>
    <div class="charts-box bg-white">
      <MyEcharts v-model="option"></MyEcharts>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import MyEcharts from '@/components/MyEcharts'
import locale from 'ant-design-vue/es/date-picker/locale/zh_CN'
import EchartsTitle from './EchartsTitle';

export default {
  name: 'EchatrtsStatistics',
  components: { MyEcharts, EchartsTitle },
  setup() {
    const dateRange = ref([])
    const isChoose = ref('now')
    let xData = ['月份']
    for (let i = 1; i < 13; i++) {
      xData.push(`${i}月`)
    }
    let manYData = ['男']
    for (let i = 1; i < 13; i++) {
      manYData.push((Math.round(Math.random() * i) * i).toString())
    }
    let womanYData = ['女']
    for (let i = 1; i < 13; i++) {
      womanYData.push(((Math.round(Math.random() * i) + 1) * i).toString())
    }
    let option = ref({
      grid: {
        containLabel: true,
        left: 50,
        right: 50
      },
      dataset: {
        // 提供一份数据。
        source: [xData, manYData, womanYData]
      },
      color: ['#FF944B', '#A76DFF'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          crossStyle: {
            color: '#999'
          }
        }
      },
      legend: {
        bottom: 10
      },
      xAxis: {
        type: 'category',
        axisPointer: {
          type: 'shadow'
        }
      },
      yAxis: {
        axisPointer: {
          type: 'shadow'
        }
      },
      series: [
        {
          type: 'bar',
          seriesLayoutBy: 'row'
        },
        {
          type: 'bar',
          seriesLayoutBy: 'row'
        }
      ]
    })

    return {
      locale,
      dateRange,
      isChoose,
      option
    }
  }
}
</script>

<style lang="scss" scoped>
.charts-box {
  width: 100%;
  height: 420px;
}
</style>