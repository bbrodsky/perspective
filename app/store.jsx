import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

const logger = createLogger()

const store = createStore(rootReducer, applyMiddleware(logger, thunkMiddleware));

export default store
