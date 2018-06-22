 import { combineReducers, applyMiddleware, createStore } from 'redux';
import ReduxPromise from 'redux-promise';

import randomtext from './text';

 const reducer = combineReducers({
     randomtext
 })

 const cswm = applyMiddleware(ReduxPromise)(createStore);

 var store = cswm(reducer);

 export default store;