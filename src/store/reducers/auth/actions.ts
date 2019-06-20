export const LOGIN_SUCCESS = 'clay/auth/LOGIN_SUCCESS'
export const LOGOUT = 'clay/auth/LOGOUT'
export const LOGIN_FAILURE = 'clay/auth/LOGIN_FAILURE'

interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS
  user: User
}

interface LoginFailureAction {
  type: typeof LOGIN_FAILURE
}

interface LogoutAction {
  type: typeof LOGOUT
}

export type AuthActionType = LoginSuccessAction | LoginFailureAction | LogoutAction
