import { combineReducers, applyMiddleware, createStore } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

//reducer functions
import users from "./utilities/users";
import loggeduser from "./utilities/loggeduser"
import receiptdata from "./utilities/receiptdata";
import orders from './utilities/orders'

const rootReducer = combineReducers({users, receiptdata, loggeduser, orders});
const logger = createLogger({ collapsed: true });
const middleware = composeWithDevTools(applyMiddleware(thunkMiddleware, logger));
const store = createStore(rootReducer, middleware);

export default store;