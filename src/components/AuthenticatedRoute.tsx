import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { selectCurrentUser } from '../store/reducers/auth'

const AuthenticatedRoute = ({ user, component: Component, ...routeProps }) => {
  return (
    <Route
      {...routeProps}
      render={props => (user ? <Component {...props} /> : <Redirect to="/login" />)}
    />
  )
}

export default connect(selectCurrentUser)(AuthenticatedRoute)
