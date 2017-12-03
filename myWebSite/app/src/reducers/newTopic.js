import { ADDTOPIC,UPLOADPIC } from '../constants'

function newTopic(state = { newTopicStatus: null,picUrl: null }, action) {
    if (action.type === ADDTOPIC) {
        return Object.assign({},state,{ newTopicStatus: action.data });
    } else if(action.type === UPLOADPIC) {
        return Object.assign({},state,{ picUrl: action.data });
    }
    return state;
}

export default newTopic;
