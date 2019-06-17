import React from 'react'
import logo from './logo.png'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../../store/reducers/auth'
import { AppState } from '../../store/reducers';

const HeaderStyled = styled.header`
  display: flex;
  background: #232323;
  align-items: center;
  justify-content: space-between;
  padding: 5px 50px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);

  .active {
    font-weight: bold;
  }

  a {
    text-decoration: none;

    &,
    &:visited {
      color: inherit;
    }
  }

  ul {
    display: flex;
    list-style: none;
    color: white;

    li {
      margin-left: 20px;
      cursor: pointer;
    }
  }
`
const mapState = ({ auth: { user } }: AppState) => {
  return {
    auth: user,
  }
}

const Header = ({ auth, logout }) => {
  return (
    <HeaderStyled>
      <img src={logo} alt="logo" width={70} />
      <ul>
        {auth && (
          <>
            <li>
              <NavLink to="/" exact activeClassName="active">
                Doors
              </NavLink>
            </li>
            <li>
              <NavLink to="/create-user" activeClassName="active">
                Create user
              </NavLink>
            </li>
            <li>
              <NavLink to="/create-door" activeClassName="active">
                Create door
              </NavLink>
            </li>
            <li>
              <NavLink to="/permissions" activeClassName="active">
                Permissions
              </NavLink>
            </li>
            <li onClick={() => logout()}>Logout</li>
          </>
        )}
        {!auth && (
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
        )}
      </ul>
    </HeaderStyled>
  )
}

export default connect(
  mapState,
  { logout },
)(Header)
