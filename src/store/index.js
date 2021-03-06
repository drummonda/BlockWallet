import {createStore, combineReducers, applyMiddleware} from 'redux'
import { createLogger } from 'redux-logger'
import { default as thunkMiddleware } from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import blockchain from './blockchain';
import message from './message';
import networks from './network';
import transactions from './transactions';

const reducer = combineReducers({blockchain, message, networks, transactions})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './blockchain'
export * from './message'
export * from './network'
export * from './transactions'
