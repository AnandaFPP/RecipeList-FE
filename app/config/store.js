import { applyMiddleware, createStore } from "@reduxjs/toolkit";
import rootReducer from "./redux/reducers/rootReducer";
import thunk from "redux-thunk";
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;