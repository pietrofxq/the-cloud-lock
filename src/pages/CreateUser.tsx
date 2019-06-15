import React, { useState, useEffect } from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { createUser, getUsers } from '../api'
import CustomInput from '../components/CustomInput'

const CreateUser = () => {
  const [name, setName] = useState('')
  const [users, setUsers] = useState([])

  const refreshUsers = () => getUsers().then(setUsers)

  useEffect(() => {
    refreshUsers()
  }, [])

  return (
    <div>
      <h1>Create user</h1>
      <form
        onSubmit={e => {
          e.preventDefault()
          createUser(name)
            .then(refreshUsers)
            .then(() => setName(''))
        }}
      >
        <CustomInput
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Type new user name"
        />
      </form>
      <h2>List of users</h2>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(row => (
              <TableRow key={row.username}>
                <TableCell component="th" scope="row">
                  {row.username}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  )
}

export default CreateUser
