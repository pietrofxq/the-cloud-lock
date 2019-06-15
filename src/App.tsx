import React from 'react'
import Header from './components/Header'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import styled from 'styled-components'
import './App.css'
import LoginPage from './pages/Login'
import DoorsPage from './pages/DoorsPage'
import CreateDoor from './pages/CreateDoor'
import CreateUser from './pages/CreateUser'
import Permissions from './pages/Permissions'
import DoorPermissions from './pages/DoorPermissions'
import AuthenticatedRoute from './components/AuthenticatedRoute'
import { Provider } from 'react-redux'
import store from './store/store'
import { createMuiTheme } from '@material-ui/core'
import { grey } from '@material-ui/core/colors'
import { ThemeProvider } from '@material-ui/styles'

const Container = styled.div`
  padding: 0 50px;
`

const theme = createMuiTheme({
  palette: {
    primary: grey,
  },
})

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Provider store={store}>
          <Header />
          <Container>
            <AuthenticatedRoute exact path="/" component={DoorsPage} />
            <Route path="/login" component={LoginPage} />
            <AuthenticatedRoute path="/create-door" component={CreateDoor} />
            <AuthenticatedRoute path="/create-user" component={CreateUser} />
            <Route
              path="/permissions"
              render={({ match }) => {
                return (
                  <>
                    <AuthenticatedRoute path={`${match.path}/`} exact component={Permissions} />
                    <AuthenticatedRoute path={`${match.path}/:id`} component={DoorPermissions} />
                  </>
                )
              }}
            />
          </Container>
        </Provider>
      </Router>
    </ThemeProvider>
  )
}

export default App
