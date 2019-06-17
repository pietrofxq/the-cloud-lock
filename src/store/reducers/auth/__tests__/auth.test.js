import authReducer from '..'
import * as Actions from '../actions'

const initialState = {
  user: null,
  loginError: ''
}

describe('store/auth/reducer', () => {
  it('should have initial state', () => {
    expect(authReducer()).toEqual(initialState)
  })

  it('should set user and empty error on LOGIN_SUCCESS', () => {
    const user = {
      id: 0,
      username: 'user'
    }

    expect(authReducer(initialState, {
      type: Actions.LOGIN_SUCCESS,
      user
    })).toEqual({
      user: user,
      loginError: ''
    })
  })

  it('should set user to null and display error message on LOGIN_FAILURE', () => {
    expect(authReducer(initialState, {
      type: Actions.LOGIN_FAILURE
    })).toEqual({
      user: null,
      loginError: 'User does not exist'
    })
  })

  it('should remove user on LOGOUT', () => {
    const user = {
      id: 0,
      username: 'user'
    }
    const state = authReducer(initialState, {
      type: Actions.LOGIN_SUCCESS,
      user
    })
    expect(state).toMatchObject({
      user
    })
    expect(authReducer(state, {
      type: Actions.LOGOUT
    })).toEqual({
      user: null,
      loginError: ''
    })
  })
})