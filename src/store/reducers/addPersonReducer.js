import { SET_PERSON_PARAMETER } from "../action/actions";
import { SAVE_TO_STORAGE } from "../action/saveToStorage";

const defaultState = {
  params: {
    firstName: "",
    lastName: "",
    phone: "",
    gender: "M",
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
      default:return state
    }
  

};
