/*
 * @Author: cui DengKe
 * @Date: 2021-06-18 22:08:53
 * @LastEditors: cui DengKe
 * @LastEditTime: 2021-06-18 22:18:39
 * @Description: 项目主体 布局 国际化
 * @FilePath: \vue-salary-management\src\language\modules\subject\index.js
 */
import formatI18n from '../formatI18n';

const lang = {
  Admin: ['管理员', 'Admin'],
  SignOut: ['退出', 'Sign Out'],
  SwitchLanguageOut: ['切换语言', 'switch Language Out']
}

export default formatI18n(lang, 'subjectI18n')