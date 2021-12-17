import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';

import {
  userSigninReducer,
  userRegisterReducer
} from "./redux/reducers/userReducers";
// const userInfo = null;
const initialState = { userSignin: { userInfo: null } };
const reducer = combineReducers({
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
});

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;