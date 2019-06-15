import { getUser } from '../../api'

const initialState = {
  user: null,
  loginError: ''
}

const LOGIN_SUCCESS = 'clay/auth/LOGIN_SUCCESS'
const LOGOUT = 'clay/auth/LOGOUT'
const LOGIN_FAILURE = 'clay/auth/LOGIN_FAILURE'

export const setUser = (user: User) => ({
  type: LOGIN_SUCCESS,
  user,
})

const failLoginRequest = () => ({
  type: LOGIN_FAILURE
})

export const clearUser = () => ({
  type: LOGOUT,
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

export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { user: action.user, loginError: '' }
    case LOGIN_FAILURE:
      return { user: null, loginError: 'User does not exist'}
    case LOGOUT:
      return { ...state, user: null }
    default:
      return state
  }
}

export const selectCurrentUser = ({ authReducer: { user, loginError } }) => ({ user, loginError })
