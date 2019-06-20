import React from 'react'
import styled from 'styled-components'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { grey } from '@material-ui/core/colors'
import { createMuiTheme } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/styles'
import LoginPage from './pages/Login'
import DoorsPage from './pages/DoorsPage'
import CreateDoor from './pages/CreateDoor'
import CreateUser from './pages/CreateUser'
import Permissions from './pages/Permissions'
import DoorPermissions from './pages/DoorPermissions'
import AuthenticatedRoute from './components/AuthenticatedRoute'
import Header from './components/Header'
import store from './store/store'
import './App.css'

const Container = styled.div`
  padding: 0 50px;
`

const Footer = styled.footer`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #efefef;
  padding: 15px;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
`

const theme = createMuiTheme({
  palette: {
    primary: grey,
  },
})

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
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
          <Footer>
            Created with{' '}
            <span role="img" aria-label="coffee">
              ️☕
            </span>{' '}
            by <a href="http://github.com/pietrofxq">Pietro Coelho</a>
          </Footer>
        </Router>
      </Provider>
    </ThemeProvider>
  )
}

export default App
