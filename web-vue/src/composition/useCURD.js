/*
 * @Author: cui DengKe
 * @Date: 2021-06-14 11:54:54
 * @LastEditors: cui DengKe
 * @LastEditTime: 2021-06-17 23:33:53
 * @Description: Composition API 代码提取  curd的逻辑
 * @FilePath: \vue-salary-management\src\composition\useCURD.js
 */

/**
 * 使用方式: 
 * 先 import useCURD from "@/composition/useCURD";
 * 
 * 然后在 setup 中
 * 
 * @description: 拿到 setup进来的 数据和函数
 * @param {*} 表格数据 数据总条数 获取分页数据 行操作(增删改) 分页操作
 * const { tableData, dataTotal, useGetListData, useRowRequest, usePagingRequest } = useCURD();
 * 
 * @description: 获取分页数据 + 查询
 * @param {Object} staffApi 当前API文件对象
 * @param {String} apiFlag 当前API文件标识 首字母大写
 * useGetListData(attendanceApi, 'Attendance')
 * 
 * return {
 *  option,
 *  columns,
 *  tableData,
 *  dataTotal,
 *  useRowRequest,
 *  usePagingRequest
 * }
 *  */
import { ref } from "vue";
import { useStore } from 'vuex'
import { message } from 'ant-design-vue';
import { isEmpty } from "@/utils/validator";

export default function () {
  const store = useStore() // VueX

  const isLoading = ref(false) // 表格数据
  const tableData = ref([]) // 表格数据
  const pagingObj = ref({ // 分页数据
    current: 1, // 当前页面
    size: 10 //展示的条数
  })
  const searchData = ref() // 需要查询的数据
  const dataTotal = ref(10) // 总条数据

  const oApiObj = ref({}) // 当前 API 文件 对象 如 staffApi
  const sApiFlag = ref('') // 当前 API 文件 标识 如 Staff 首字母大写

  /**
   * @description: 获取页面数据
   * @param {Object} apiObj 当前 API 文件 对象 如 staffApi
   * @param {String} apiFlag 当前 API 文件 标识 如 Staff 首字母大写
   */
  const useGetListData = (apiObj, apiFlag) => {
    isLoading.value = true
    // 参数不存在直接 退出
    if (isEmpty(oApiObj.value) || isEmpty(sApiFlag.value)) {
      if (!isEmpty(apiObj) || !isEmpty(apiFlag)) {
        oApiObj.value = apiObj
        sApiFlag.value = apiFlag
      } else {
        isLoading.value = false
        return
      }
    }
    // 合并参数
    const params = Object.assign({}, pagingObj.value, searchData.value)
    // 拿到接口key 这里约定好的分页接口命名规范: get+标识+ListPort getStaffListPort
    const apiKey = `get${sApiFlag.value}ListPort`
    // 发请求 staffApi['Staff']
    oApiObj.value[apiKey](params).then((res) => {
      tableData.value = res.data || []
      dataTotal.value = res.total
      isLoading.value = false
    }).catch((err) => {
      isLoading.value = false
      console.log(err);
    });
  }

  /**
   * @description: 添加或者修改
   * @param {Number} flag 1增加 2编辑 3删除 4查询
   * @param {Object} data 当前表单数据
   */
  const useRowRequest = (flag, data) => {
    // 新增
    if (flag === 1) {
      oApiObj.value[`add${sApiFlag.value}Port`](data).then((res) => {
        if (res) {
          useGetListData()

          // 这里判断是不是 新增员工 是的话用VueX 在请求获取全部人员的接口
          if (sApiFlag.value === 'Staff') store.dispatch('getStaffList')

          message.success('添加成功')
        } else {
          message.error('添加失败')
        }
      }).catch((err) => {
        message.error('添加失败')
        console.log("添加失败", err);
      });
    }
    // 编辑
    if (flag === 2) {
      oApiObj.value[`put${sApiFlag.value}Port`](data).then((res) => {
        if (res) {
          useGetListData()
          message.success('编辑成功')
        } else {
          message.error('编辑失败')
        }
      }).catch((err) => {
        message.error('编辑失败')
        console.log("编辑失败", err);
      });
    }
    // 删除
    if (flag === 3) {
      oApiObj.value[`del${sApiFlag.value}Port`](data).then((res) => {
        if (res) {
          useGetListData()
          message.success('删除成功')
        } else {
          message.error('删除失败')
        }
      }).catch((err) => {
        message.error('删除失败')
        console.log("删除失败", err);
      });
    }
    // 查询
    if (flag === 4) {
      if (isEmpty(data)) {
        pagingObj.value.current = 1
      }
      searchData.value = data
      useGetListData()
    }
  }

  /**
  * @description: 分页
  * @param {Object} obj current 页面 size 当前页条数 total 总条数
  */
  const usePagingRequest = (obj) => {
    pagingObj.value = obj
    useGetListData()
  }

  return {
    store,
    isLoading,
    tableData,
    pagingObj,
    searchData,
    dataTotal,
    useGetListData,
    useRowRequest,
    usePagingRequest
  }
}