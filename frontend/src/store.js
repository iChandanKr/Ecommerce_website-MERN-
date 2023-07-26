import { createStore, combinedReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import { composeWithDevTools } from "redux-devtools-extesion";


const reducer = combinedReducers({

});
let initialState = {};
const middleWare = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleWare)));
export default store;