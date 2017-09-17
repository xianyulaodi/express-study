import { GETAUTHORDETAIL,FOCUS } from '../constants'

function getAuthorDetail(state = { data: null,isFocus: false }, action) {
    if (action.type === GETAUTHORDETAIL) {
        return Object.assign({},state,{ data: action.data });
    } else if(action.type === FOCUS) {
    	return Object.assign({},state,{ isFocus: action.data });
    }
    return state;
}
export default getAuthorDetail;
