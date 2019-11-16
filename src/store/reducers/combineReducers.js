import { combineReducers } from "redux";
import { addPersonReducer } from "./addPersonReducer";
import {storageReducer} from './storageReducer'

export default combineReducers({
  person: addPersonReducer,
  storage:storageReducer
});
