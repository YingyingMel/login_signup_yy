import { createStore, applyMiddleware } from "redux"
import rootReducer from "../reducers"
import { composeWithDevTools } from "redux-devtools-extension"
import thunk from "redux-thunk"

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))//把控制state的reducer放到store里

export default store