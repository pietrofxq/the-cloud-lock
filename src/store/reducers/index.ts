import authReducer from './auth'
import doorsReducer from './doors'
import { combineReducers } from 'redux'

export default combineReducers({
  authReducer,
  doorsReducer,
})
