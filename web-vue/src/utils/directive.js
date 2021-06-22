import Vue from 'vue'

/**
 * 防抖指令 单位时间只触发最后一次
 * @param {Function} fn - 执行事件
 * @param {?String|"click"} event - 事件类型 例："click"
 * @param {?Number|500} time - 间隔时间
 * @param {Array} binding.value - [fn,event,time]
 * 直接使用： <XXX v-debounce="reset]">刷新</XXX>
 * 配置事件，间隔时间： <button v-debounce="[reset,'click',500]">刷新</button>
 * 事件传递参数则： <button v-debounce="[()=>reset(param),`click`,500]">刷新</button>
 */

Vue.directive('debounce', {
  bind: function (el, binding) {
    try {
      let fn, event = "click", time = 500;
      if (typeof binding.value == 'function') {
        fn = binding.value
      } else {
        [fn, event, time] = binding.value
      }
      let timer;
      el.addEventListener(event, () => {
        timer && clearTimeout(timer)
        timer = setTimeout(() => fn(), time)
      })
    } catch (e) {
      console.log(e);
    }
  }
});

/**
 * 节流指令 一段时间内首次触发时立即执行，此时间段内再次触发，不会执行！
 * @param {Function} fn - 执行事件
 * @param {?String|"click"} event - 事件类型 例："click"
 * @param {?Number|500} time - 间隔时间
 * @param {Array} binding.value - [fn,event,time]
 * 直接使用： <XXX v-throttle="reset]">刷新</XXX>
 * 配置事件，间隔时间： <button v-throttle="[reset,'click',500]">刷新</button>
 * 事件传递参数则： <button v-throttle="[()=>reset(param),`click`,500]">刷新</button>
 */
Vue.directive('throttle', {
  bind: function (el, binding) {
    let fn, event = "click", time = 1500;
    if (typeof binding.value == 'function') {
      fn = binding.value
    } else {
      [fn, event, time] = binding.value
    }
    /**
     * el.preTime 记录上次触发事件，
     * 每次触发比较nowTime（当前时间） 和 el.preTime 的差是否大于指定的时间段！
     */
    el.addEventListener(event, () => {
      const nowTime = new Date().getTime()
      if (!el.preTime || nowTime - el.preTime > time) {
        console.log(!el.preTime, nowTime - el.preTime, nowTime - el.preTime > time);
        el.preTime = nowTime
        fn();
      }
    })
  }
})

/**
 * 拖拽指令 
 * 例：<div v-drag></div>
 */
Vue.directive('drag', {
  //1.指令绑定到元素上回立刻执行bind函数，只执行一次
  //2.每个函数中第一个参数永远是el，表示绑定指令的元素，el参数是原生js对象
  //3.通过el.focus()是无法获取焦点的，因为只有插入DOM后才生效
  // bind: function (el, binding, vnode) {}
  //inserted表示一个元素，插入到DOM中会执行inserted函数，只触发一次
  inserted: function (el) {
    el.onmousedown = function (e) {
      const disX = e.clientX - el.offsetLeft;
      const disY = e.clientY - el.offsetTop;

      document.onmousemove = function (e) {
        const left = e.clientX - disX;
        const top = e.clientY - disY;

        el.style.left = left + 'px';
        el.style.top = top + 'px';

      }

      document.onmouseup = function () {
        document.onmousemove = document.onmouseup = null;
      }

    }
  }
})

/**
 * 权限指令 
 * 例：<div v-drag></div>
 */
import store from '@/store'
Vue.directive('permission', {
  //1.指令绑定到元素上回立刻执行bind函数，只执行一次
  //2.每个函数中第一个参数永远是el，表示绑定指令的元素，el参数是原生js对象
  //3.通过el.focus()是无法获取焦点的，因为只有插入DOM后才生效
  // bind: function (el, binding, vnode) {}
  //inserted表示一个元素，插入到DOM中会执行inserted函数，只触发一次
  inserted: function (el, binding) {
    const { value } = binding
    console.log(value, "v-permission");

    // 获取VueX中的 权限按钮列表
    const buttonList = store.state.user.permission

    if (value) {
      // some 遇到 return true 时 会结束遍历
      const hasPermission = buttonList.some(btnKey => btnKey === value)
      // 没有权限直接移除 dom元素
      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error(`需要指定权限标识！ 如：v-permission="'table_del'"`)
    }
  }
})