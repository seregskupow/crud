import { SET_PERSON_PARAMETER } from "../action/actions";
import { SAVE_TO_STORAGE } from "../action/saveToStorage";
import {CLEAR_STORE} from '../action/clearStore'

const defaultState = {
  params: {
    firstName: "",
    lastName: "",
    phone: "",
    gender: "-",
    age: ""
  }
};

export const addPersonReducer = (state = defaultState, action) => {
 
  switch (action.type) {
    case SET_PERSON_PARAMETER:
      return {
        ...state,
        params: {
          ...state.params,
          [action.parameter]: action.value
        }
      };
      case CLEAR_STORE:
        return{
          ...state,
          params:defaultState.params
        }
      default:return state
    }
  

};
