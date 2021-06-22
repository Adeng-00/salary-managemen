<!--
 * @Author: cui DengKe
 * @Date: 2021-04-15 20:33:00
 * @LastEditors: cui DengKe
 * @LastEditTime: 2021-06-14 17:01:26
 * @Description: 首屏 考勤数据统计
 * @FilePath: \vue-salary-management\src\views\dashBoard\components\CardStatistics.vue
-->
<template>
  <EchartsTitle title="考勤数据统计" subTitle="上月考勤情况"></EchartsTitle>
  <a-row class="padding-lrxl padding-blg bg-white">
    <a-col v-for="(item, index) in cardData" :key="index" :span="24 / cardData.length">
      <a-card class="overflow-hidden" :style="'background: rgb(' + item.bgColor + ');'">
        <div class="pos-ab border-bfb bg-white_shallow bg-circle_tl"></div>
        <div class="pos-ab border-bfb bg-white_shallow bg-circle_tr"></div>
        <div class="pos-ab border-bfb bg-white_shallow bg-circle_br"></div>
        <a-statistic :value="item.value" :value-style="{ color: '#fff' }" suffix="人">
          <template #title>
            <div style="color: #fff">{{ item.title }}</div>
          </template>
        </a-statistic>
      </a-card>
    </a-col>
  </a-row>
</template>

<script>
import { ref } from "vue";
import EchartsTitle from './EchartsTitle';
import { lastMonthAttendance } from '@/api/dashBoardApi';

export default {
  name: "CardStatistics",
  components: { EchartsTitle },
  setup() {
    const cardData = ref([
      {
        title: "迟到人数",
        bgColor: "150,161,245",
        value: 0,
      },
      {
        title: "早退情况",
        bgColor: "255,167,167",
        value: 0,
      },
      {
        title: "未写日志人数",
        bgColor: "176,140,214",
        value: 0,
      },
      {
        title: "未打卡人数",
        bgColor: "34,211,167",
        value: 0,
      }
    ]);
    lastMonthAttendance().then((res) => {
      if (res) {
        for (const item in res.data) {
          let nTemp = res.data[item] ? res.data[item] : 0
          switch (item) {
            case 'late':
              cardData.value[0].value = nTemp
              break;
            case 'leaveEarly':
              cardData.value[1].value = nTemp
              break;
            case 'noClockIn':
              cardData.value[2].value = nTemp
              break;
            case 'nogNotWritten':
              cardData.value[3].value = nTemp
              break;
          }

        }
      }
    }).catch((err) => {
      console.log("上个月考勤接口错误==>", err);
    });
    return {
      cardData,
    };
  },
}
</script>

<style lang="scss" scoped>
.bg-circle_tl {
  top: -15px;
  left: -30px;
  padding: 30px;
}

.bg-circle_tr {
  top: -15px;
  right: -30px;
  padding: 40px;
}

.bg-circle_br {
  bottom: -45px;
  right: -10px;
  padding: 50px;
}
</style>