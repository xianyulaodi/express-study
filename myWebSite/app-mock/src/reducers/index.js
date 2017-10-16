import {combineReducers} from "redux"
// import changeSider from './sider'
import changeLoginState from './header'
// import switchModal from './modalDialog'
import updateUserInfo from './userInfo'
// import changePage from './page'
import indexData from './main'
import updateDetailInfo from './detailInfo'
import authorCenter from './authorCenter'
import register from './register'
import newTopic from './newTopic'

export const stores = combineReducers({
  // sider:changeSider,
  header:changeLoginState,
  // modalDialog:switchModal,
  userInfo:updateUserInfo,
  // page:changePage,
  indexData:indexData,
  detailInfo:updateDetailInfo,
  authorCenter:authorCenter,
  register: register,
  newTopic: newTopic
})


