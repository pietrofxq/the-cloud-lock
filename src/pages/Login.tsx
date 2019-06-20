import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import CustomInput from '../components/CustomInput'
import { login, selectCurrentUser, setUser } from '../store/reducers/auth'

const Login = ({ user, loginError, login, setUser }) => {
  const [username, setUsername] = useState('')
  const auth = window.localStorage.getItem('UserAuth')
  if (auth) {
    try {
      const user = JSON.parse(auth)
      setUser(user)
    } catch (e) {
      window.localStorage.clear()
    }
  }
  if (user || auth) {
    return <Redirect to="/" />
  }
  return (
    <div>
      <h1>Login</h1>
      <form
        onSubmit={e => {
          e.preventDefault()
          login(username)
        }}
      >
        <CustomInput
          autoFocus
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="Enter your username"
        />
        {loginError && <p>{loginError}</p>}
      </form>
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    login: (user: string) => login(user)(dispatch),
    setUser: (user: User) => dispatch(setUser(user)),
  }
}

export default connect(
  selectCurrentUser,
  mapDispatchToProps,
)(Login)
