import { UPDATEDETAILINFO,UPDATECOMMENTLIST } from '../constants'

function updateDetailInfo(state = {detailInfo:'',commentList:[]}, action){
	switch(action.type) {
		case UPDATEDETAILINFO:
			  return Object.assign({},state,{ detailInfo: action.data });
		    break;
		case UPDATECOMMENTLIST:
			  return Object.assign({},state,{ commentList : action.data });
		    break; 
		default:
		  return state;
	}
}

export default updateDetailInfo