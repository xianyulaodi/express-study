import { ADDTOPIC } from '../constants'

function newTopic(state = { newTopicStatus : null }, action) {
    if (action.type === ADDTOPIC) {
       return { newTopicStatus: action.data }
    }
    return state;
}

export default newTopic;
