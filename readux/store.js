import { createStore, applyMiddleware, combineReducers } from "redux";
import taskReducer from "./reducer";
import thunk from "redux-thunk";

const rootReducer= combineReducers({taskReducer})

export const store = createStore(rootReducer, applyMiddleware(thunk))