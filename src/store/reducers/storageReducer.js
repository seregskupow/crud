import { SAVE_TO_STORAGE } from "../action/saveToStorage";
import { GET_FROM_LOCAL_ST } from "../action/getFromLS";

const defaultState = {
  data: []
};

export const storageReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SAVE_TO_STORAGE:
      return {
        ...state,
        data: [...state.data,action.data]
      };
    case GET_FROM_LOCAL_ST:
        return{
            ...state,
            data:action.data
        }
    default:return state
  }
  
};

