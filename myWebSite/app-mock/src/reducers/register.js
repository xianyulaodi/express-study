import { REGISTER  } from '../constants'

function register(state = { registerStatus : null }, action) {
    switch(action.type) {
    	case REGISTER:
    		  return Object.assign({},state,{ registerStatus: action.data });
    	    break;
    	default:
    	  return state;
    }
}

export default register;
