<template>
  <div :id="echartsId" style="width: 100%; height: 100%"></div>
</template>

<script>
import * as echarts from "echarts";
import {
  onMounted,
  reactive,
  toRefs,
  nextTick,
  watch,
} from "vue";

export default {
  name: "MyEcharts",
  props: {
    // 传递定义echartsId
    idKey: {
      type: String,
      default: "",
    },
    // 传递定义option数据
    modelValue: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  setup(props, context) {
    const data = reactive({
      echartsId: "",
      option: {
        title: {
          text: "默认图表",
        },
        tooltip: {},
        xAxis: {
          data: [""],
        },
        yAxis: {},
        series: [
          {
            name: "",
            type: "bar",
            data: [0],
          },
        ],
      },
    });
    // 创建局部变量 存放图表实例，如果是响应式的变量 会报错 所以这里选择用创建局部变量的方式 规避错误
    // Error: `resize` should not be called during main process.
    let myChart = {};
    // 监听 数据是否改变
    watch(
      () => props.modelValue,
      (nval, oval) => {
        data.option = nval;
        initEchatrsData();
      }
    );
    onMounted(() => {
      if (!props.idKey) data.echartsId = "echarts" + getID();
      else data.echartsId = props.idKey;
      if (props.modelValue) {
        data.option = props.modelValue;
      }
      // 在下次 DOM 更新循环结束之后执行延迟回调
      nextTick(() => {
        // 获取 DOM
        const portalDiv = document.getElementById(data.echartsId);
        if (!portalDiv) {
          throw new Error("The element #portal wasn't found");
        } else {
          // 初始化图表实例
          myChart = echarts.init(portalDiv);
          initEchatrsData();
        }
      });
    });
    // 获取随机数拼接到 echartsId上
    function getID() {
      return Number(
        Math.random().toString().substr(3, 9) + Date.now()
      ).toString(36);
    }
    // 初始化图表数据
    function initEchatrsData() {
      myChart.clear && myChart.clear(); // myChart 存在先清除 在重新初始化渲染
      myChart.setOption(data.option, true); // 正式初始化填入数据
      if (data.option.callback) {
        // 有回调函数 化执行回调函数
        data.option.callback();
      }
      if (data.option.click) {
        // 点击事件
        myChart.off("click");
        myChart.on("click", data.option.click);
      }
      if (data.option.legendselectchanged) {
        myChart.off("legendselectchanged");
        myChart.on("legendselectchanged", data.option.legendselectchanged);
      }
      //  让图表可以根据浏览器窗口大小调整其自身大小
      // window.addEventListener("resize", () => {
      //   myChart.resize();
      // });
      window.onresize = myChart.resize;
    }
    return {
      ...toRefs(data),
    };
  },
}
</script>

<style scoped lang="scss">
</style>
