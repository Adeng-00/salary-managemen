/**
 * 操作浏览器储存数据
 * localStorage（生命周期是永久性的，这意味着除非用户手动清除localStorage信息，否则这些信息将永远存在。） 
 * sessionStorage（生命周期为当前窗口或标签页，一旦窗口或标签页被关闭了，那么所有sessionStorage存储的数据也就被清空了。）
 * 注意：通过getItem或直接使用localStorage["key"]获取到的信息均为实际存储的副本。是无法​对实际存储的值产生作用的。
 */

/**
 * 储存客户端临时信息，并经过JSON.stringify()序列化信息
 * @param key 键名
 * @param info 数据
 * @param flag local session 默认 session
 * */
export function setStorage(key, info, flag = 'session') {
  try {
    let infoStr = JSON.stringify(info);
    if (flag === 'session')
      window.sessionStorage.setItem(key, infoStr);
    else
      window.localStorage.setItem(key, infoStr);
  } catch (err) {
    return
  }
}
/**
 * 序列化信息 查看客户端临时信息
 * @param key 键名
 * @param flag local session 默认 session
 * @return Object 从客户端读取数据，并经过JSON.parse()序列化
 * */
export function getStorage(key, flag = 'session') {
  try {
    let data;
    if (flag === 'session')
      data = window.sessionStorage.getItem(key)
    else
      data = window.localStorage.getItem(key)
    let info = JSON.parse(data);
    return info
  } catch (err) {
    return {}
  }
}

/**
 * 删除 客户端储存的临时信息
 * @param key 键名
 * @param flag local session 默认 local 因为session关闭窗口或者标签页就自动清空了，所以用到此方法的地方多为localStorage
 * @return Object 从客户端读取数据，并经过JSON.parse()序列化
 * */
export function remStorage(key, flag = 'local') {
  try {
    if (flag === 'local')
      window.localStorage.removeItem(key)
    else
      window.sessionStorage.removeItem(key)
  } catch (err) {
    console.log("删除浏览器储存数据错误", err);
  }
}

/**
 * 清空 客户端储存的所有临时信息
 * @description 调用此方法清空 localStorage 和 sessionStorage
 * */
export function cleStorage() {
  try {
    window.localStorage.clear()
    window.sessionStorage.clear()
  } catch (err) {
    console.log("清空浏览器储存数据错误", err);
  }
}



