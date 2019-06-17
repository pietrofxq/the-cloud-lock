import { getUser } from '../../../api'
import * as Actions from './actions'
import { AppState } from '..';
const initialState = {
  user: null,
  loginError: ''
}

export const setUser = (user: User) => ({
  type: Actions.LOGIN_SUCCESS,
  user,
})

const failLoginRequest = () => ({
  type: Actions.LOGIN_FAILURE
})

export const clearUser = () => ({
  type: Actions.LOGOUT,
})

export function login(username: string) {
  return dispatch => {
    getUser(username)
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

export default function(state = initialState, action: any = {}) {
  switch (action.type) {
    case Actions.LOGIN_SUCCESS:
      return { user: action.user, loginError: '' }
    case Actions.LOGIN_FAILURE:
      return { user: null, loginError: 'User does not exist'}
    case Actions.LOGOUT:
      return { ...state, user: null }
    default:
      return state
  }
}

export const selectCurrentUser = ({ auth: { user, loginError } }: AppState) => ({ user, loginError })
