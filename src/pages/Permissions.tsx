import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import Paper from '@material-ui/core/Paper'
import TableRow from '@material-ui/core/TableRow'
import { getDoors } from '../api'

const Permissions = ({ navigation }) => {
  const [doors, setDoors] = useState([])
  useEffect(() => {
    getDoors().then(setDoors)
  }, [])

  return (
    <div>
      <h1>Set door permissions</h1>
      <h2>Select a door to configure which users can open it</h2>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {doors.map(row => (
              <TableRow key={row.name}>
                <TableCell component="td" scope="row">
                  <Link to={`/permissions/${row.id}`}>{row.name}</Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  )
}

export default Permissions
