import { UPDATEPOSTERINFO,UPDATETOPICLIST,GETBANNERLIST } from '../constants'

function indexData(state = { posterInfo : null, bannerList:[], topicList:[]}, action) {
    //console.log('updatePosterInfo in reducers,state is ', state, 'action is ', action);
    switch(action.type) {
    	case UPDATEPOSTERINFO:
    		  return Object.assign({},state,{ posterInfo: action.data });
    	    break;
    	case UPDATETOPICLIST:
    		  return Object.assign({},state,{ topicList : action.data });
    	    break;
    	case GETBANNERLIST:
    		  return Object.assign({},state,{ bannerList : action.data });
    	    break;        
    	default:
    	  return state;
    }
    console.log('state',state);
}

export default indexData;
