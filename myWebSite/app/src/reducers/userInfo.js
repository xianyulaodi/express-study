import { UPDATEUSERINFO,GETTINGINFO,UPLOADHEADPIC } from '../constants'

function updateUserInfo(state = { userInfo: null, updateSuccess: false, newHeadPic:'' }, action) {
	//console.log('in reducers,state is ',state,'action is ',action);
  switch(action.type) {
  	case GETTINGINFO:
  	   return Object.assign({},state,{ userInfo: action.data });
  	   break;
    case UPDATEUSERINFO:
  	   return Object.assign({},state,{ updateSuccess: action.data });
  	   break;  	
    case UPLOADHEADPIC:
  	   return Object.assign({},state,{ newHeadPic: action.data });
  	   break; 
  	default:
  	   	return state;
  	    break; 	
  }
}

export default updateUserInfo