/*
 * @Author: cui DengKe
 * @Date: 2021-06-15 22:20:10
 * @LastEditors: cui DengKe
 * @LastEditTime: 2021-06-20 21:19:42
 * @Description: 全局指令
 * @FilePath: \vue-salary-management\src\plugins\directive.js
 */

// 权限指令  需要使用 store 暂时不做权限 这块先不研究
import store from '@/store'

// directive  钩子函数
// beforeMount：当指令第一次绑定到元素并且在挂载父组件之前调用。在这里你可以做一次性的初始化设置。
// mounted：在挂载绑定元素的父组件时调用。
export default {
  install: (app) => {
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
    app.directive('debounce', {
      mounted: function (el, binding) {
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
        } catch (error) {
          console.log("防抖指令---error==>", error)
        }
      }
    })

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
    app.directive('throttle', {
      mounted: function (el, binding) {
        try {
          let fn, event = "click", time = 1500;
          if (typeof binding.value == 'function') {
            fn = binding.value
          } else {
            [fn, event, time] = binding.value
          }
          /**
           * el.preTime 记录上次触发的时间
           * 每次触发比较nowTime（当前时间） 和 el.preTime 的差是否大于指定的时间段！
           */
          el.addEventListener(event, () => {
            const nowTime = new Date().getTime()
            if (!el.preTime || nowTime - el.preTime > time) {
              console.log(!el.preTime, nowTime - el.preTime, nowTime - el.preTime > time)
              el.preTime = nowTime
              fn()
            }
          })
        } catch (error) {
          console.log("节流指令---error==>", error)
        }
      }
    })

    /**
     * 拖拽指令 
     * 例：<div v-drag></div>
     */
    app.directive('drag', {
      mounted: function (el) {
        try {
          const dialogHeaderEl = el.querySelector('.ant-modal-header')
          const dragDom = el.querySelector('.ant-modal-content')
          dialogHeaderEl.style.cursor = 'move'
          // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
          const sty = dragDom.currentStyle || window.getComputedStyle(dragDom, null)

          dialogHeaderEl.onmousedown = e => {
            // 鼠标按下，计算当前元素距离可视区的距离
            const disX = e.clientX - dialogHeaderEl.offsetLeft
            const disY = e.clientY - dialogHeaderEl.offsetTop

            // 获取到的值带px 正则匹配替换
            let styL, styT

            // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
            if (sty.left.includes('%')) {
              styL = +document.body.clientWidth * (+sty.left.replace(/\%/g, '') / 100)
              styT = +document.body.clientHeight * (+sty.top.replace(/\%/g, '') / 100)
            } else {
              styL = +sty.left.replace(/\px/g, '')
              styT = +sty.top.replace(/\px/g, '')
            }

            document.onmousemove = function (e) {
              // 通过事件委托，计算移动的距离
              const l = e.clientX - disX
              const t = e.clientY - disY

              // 移动当前元素
              dragDom.style.left = `${l + styL}px`
              dragDom.style.top = `${t + styT}px`

            }

            document.onmouseup = function (e) {
              document.onmousemove = null
              document.onmouseup = null
            }
          }
        } catch (error) {
          console.log("拖拽指令---error==>", error)
        }
      }
    })

    /**
     * 权限指令 
     * 例：<div v-permission="'table/del'"></div>
     */
    app.directive('permission', {
      mounted: function (el, binding) {
        const { value } = binding

        // 获取VueX中的 权限按钮列表
        const permissionList = store.getters.PERMISSION_ALL

        // 因为有crud配置 所有区分一下是权限 还是crud crud用的布尔值
        if (typeof value === 'boolean') { // 这里是crud的配置
          if (!value) {
            el.parentNode && el.parentNode.removeChild(el)
          }
        } else if (typeof value === 'string') { // 这里是系统配置的权限
          // some 遇到 return true 时 会结束遍历
          const hasPermission = permissionList.some(s => s.flag === value)
          // 没有权限直接移除 dom元素
          if (!hasPermission) {
            el.parentNode && el.parentNode.removeChild(el)
          }
        } else {
          throw new Error(`需要指定权限标识！ 如：v-permission="'table/del'"`)
        }
      }
    })

  }
}