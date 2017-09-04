import { UPDATEDETAILINFO,UPDATECOMMENTLIST,ADDCOMMENT } from '../constants'

function updateDetailInfo(state = {detailInfo:'', commentList:[], addCommentStatus: null}, action){
	switch(action.type) {
		case UPDATEDETAILINFO:
			  return Object.assign({},state,{ detailInfo: action.data });
		    break;
		case UPDATECOMMENTLIST:
			  return Object.assign({},state,{ commentList : action.data });
		    break; 
        case ADDCOMMENT:
			  return Object.assign({},state,{ addCommentStatus : action.data });
		    break;		
		default:
		  return state;
	}
}

export default updateDetailInfo