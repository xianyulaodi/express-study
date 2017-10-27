import { UPDATEDETAILINFO,UPDATECOMMENTLIST,ADDCOMMENT,DELCOMMENT } from '../constants'

function updateDetailInfo(state = {detailInfo:'', commentList:[], addCommentStatus: null,delCommentStatus: false}, action){
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
        case DELCOMMENT:
		   return Object.assign({},state,{ delCommentStatus : action.data });
	    break;				
		default:
		  return state;
	}
}

export default updateDetailInfo