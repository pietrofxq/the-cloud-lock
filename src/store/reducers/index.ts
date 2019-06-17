import authReducer from './auth'
import doorsReducer from './doors'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  auth: authReducer,
  doors: doorsReducer,
})

export type AppState = ReturnType<typeof rootReducer>

export default rootReducer
