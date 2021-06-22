<template>
  <div class="img-verify">
    <canvas
      ref="verify"
      :width="width"
      :height="height"
      @click="handleDraw"
    ></canvas>
  </div>
</template>

<script>
/*
 * 验证码组件
 */
import { reactive, onMounted, ref, toRefs } from "vue";
export default {
  name: "VerificationCode",
  props: {
    passWidth: {
      type: Number,
      default: 120,
    },
    passHeight: {
      type: Number,
      default: 40,
    },
  },
  setup(props) {
    const verify = ref();
    const state = reactive({
      pool: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890", // 字符串
      width: props.passWidth,
      height: props.passHeight,
      imgCode: "",
    });
    // 初始化绘制图片验证码
    onMounted(() => {
      state.imgCode = draw();
    });
    // 点击图片重新绘制
    const handleDraw = () => {
      state.imgCode = draw();
    };
    // 随机数 toFixed()后是字符串 所以Number()转换一下 确保输出是number类型
    const randomNum = (min, max) => {
      return Number((Math.random() * (max - min) + min).toFixed());
    };
    // 随机颜色
    const randomColor = (min, max) => {
      const r = randomNum(min, max);
      const g = randomNum(min, max);
      const b = randomNum(min, max);
      return `rgb(${r},${g},${b})`;
    };

    // 绘制图片
    const draw = () => {
      const ctx = verify.value.getContext("2d"); // 创建canvas 2d
      ctx.fillStyle = randomColor(180, 230); // 填充颜色
      ctx.fillRect(0, 0, state.width, state.height); // 填充的位置
      // 定义paramText
      let imgCode = "";
      for (let i = 0; i < 4; i++) {
        // 随机产生字符串，并且随机旋转
        const text = state.pool[randomNum(0, state.pool.length)]; // 随机的四个字
        imgCode += text;
        const fontSize = randomNum(18, 40); // 随机的字体大小
        const deg = randomNum(-30, 30); // 字体随机的旋转角度
        /*
         * 绘制文字并让四个文字在不同的位置显示的思路 :
         * 1、定义字体
         * 2、定义对齐方式
         * 3、填充不同的颜色
         * 4、保存当前的状态（以防止以上的状态受影响）
         * 5、平移 translate()
         * 6、旋转 rotate()
         * 7、填充文字
         * 8、restore 出栈
         * */
        // 使用 font 属性来定义字体和字号，
        // 使用 textBaseline 定义对齐方式
        // 使用 fillStyle 属性以另一种颜色/渐变来渲染文本。
        ctx.font = fontSize + "px Simhei";
        ctx.textBaseline = "top";
        ctx.fillStyle = randomColor(80, 150);
        /*
         * save() 方法把当前状态的一份拷贝压入到一个保存图像状态的栈中。
         * 这就允许您临时地改变图像状态，
         * 然后，通过调用 restore() 来恢复以前的值。
         * save是入栈，restore是出栈。
         * 用来保存Canvas的状态。save之后，可以调用Canvas的平移、放缩、旋转、错切、裁剪等操作。 restore：用来恢复Canvas之前保存的状态。防止save后对Canvas执行的操作对后续的绘制有影响。
         * */
        ctx.save(); // save 入栈
        ctx.translate(20 * i + 10, 10); // translate() 平移位置
        ctx.rotate((deg * Math.PI) / 180); // rotate() 旋转角度
        // fillText() 方法在画布上绘制填色的文本。文本的默认颜色是黑色。
        // 上边具体进行了样式配置 font属性来定义字体和字号 textBaseline定义对齐方式
        // fillStyle属性以另一种颜色/渐变来渲染文本。
        // context.fillText(text,x,y,maxWidth);
        ctx.fillText(text, 5, -15);
        ctx.restore(); // restore 出栈
      }
      // 5.随机产生5条干扰线,干扰线的颜色要浅一点
      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.moveTo(randomNum(0, state.width), randomNum(0, state.height));
        ctx.lineTo(randomNum(0, state.width), randomNum(0, state.height));
        ctx.strokeStyle = randomColor(180, 230);
        ctx.closePath();
        ctx.stroke();
      }
      // 6.随机产生40个干扰的小点
      for (let i = 0; i < 40; i++) {
        ctx.beginPath();
        ctx.arc(
          randomNum(0, state.width),
          randomNum(0, state.height),
          1,
          0,
          2 * Math.PI
        );
        ctx.closePath();
        ctx.fillStyle = randomColor(150, 200);
        ctx.fill();
      }
      return imgCode;
    };

    return {
      ...toRefs(state),
      verify,
      handleDraw,
    };
  },
}
</script>

<style scoped>
.img-verify canvas {
  cursor: pointer;
}
</style>