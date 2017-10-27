import { LOGIN, LOGOUT,GETUSERID,NOLOGIN } from '../constants'

function changeLoginState(state = { isLogin: null, uid: 0 }, action) {
	//console.log('changeLoginState in reducers,state is ',state,'action is ',action);
  if(action.type === LOGIN) {
  	return { isLogin: true, uid: action.data };

  } else if(action.type === LOGOUT || action.type === NOLOGIN) {
  	
    return { isLogin: false }
  } 
  return state
}

export default changeLoginState