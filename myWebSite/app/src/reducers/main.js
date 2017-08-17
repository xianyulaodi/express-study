import { UPDATEPOSTERINFO,UPDATETOPICLIST } from '../constants'

function updatePosterInfo(state = { posterInfo : null }, action) {
    //console.log('updatePosterInfo in reducers,state is ', state, 'action is ', action);
    if (action.type === UPDATEPOSTERINFO) {
    	
        return { posterInfo:action.data }

    } else if (action.type === UPDATETOPICLIST) {

    	 return { topicList : action.data }
    }
    return state;
}

export default updatePosterInfo;
