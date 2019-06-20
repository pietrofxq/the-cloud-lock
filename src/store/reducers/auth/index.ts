import { getUser } from '../../../api'
import * as Actions from './actions'
import { AppState } from '..'
import { AuthActionType } from './actions'

type State = {
  user: User | null
  loginError: string
}

const initialState: State = {
  user: null,
  loginError: '',
}

export const setUser = (user: User): AuthActionType => ({
  type: Actions.LOGIN_SUCCESS,
  user,
})

const failLoginRequest = (): AuthActionType => ({
  type: Actions.LOGIN_FAILURE,
})

export const clearUser = (): AuthActionType => ({
  type: Actions.LOGOUT,
})

export function login(username: string) {
  return dispatch => {
    return getUser(username)
      .then(user => {
        dispatch(setUser(user))
        window.localStorage.setItem('UserAuth', JSON.stringify(user))
      })
      .catch(() => dispatch(failLoginRequest()))
  }
}

export function logout() {
  return dispatch => {
    dispatch(clearUser())
    window.localStorage.clear()
  }
}

function AuthReducer(state = initialState, action: AuthActionType = {} as AuthActionType) {
  switch (action.type) {
    case Actions.LOGIN_SUCCESS:
      return { user: action.user, loginError: '' }
    case Actions.LOGIN_FAILURE:
      return { user: null, loginError: 'User does not exist' }
    case Actions.LOGOUT:
      return { ...state, user: null }
    default:
      return state
  }
}

export const selectCurrentUser = ({ auth: { user, loginError } }: AppState) => ({
  user,
  loginError,
})

export default AuthReducer
