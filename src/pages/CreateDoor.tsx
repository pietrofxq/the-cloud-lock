import React, { useState } from 'react'
import { createNewDoor, selectDoors } from '../store/reducers/doors'
import { connect } from 'react-redux'
import CustomInput from '../components/CustomInput'
import CustomTable from '../components/CustomTable'
import { TableRow, TableCell, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'

const CreateDoor = ({ doors, createNewDoor }) => {
  const [name, setName] = useState('')

  return (
    <div>
      <h1>Create new door</h1>
      <form
        onSubmit={e => {
          e.preventDefault()
          createNewDoor(name)
          setName('')
        }}
      >
        <CustomInput
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Type new door name"
        />
      </form>
      <h2>List of doors</h2>
      <CustomTable
        renderRows={() => {
          return doors.map(row => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell>
                <Button variant="contained">
                  <Link className="no-style" to={`/permissions/${row.id}`}>
                    See users
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          ))
        }}
        renderCells={() => (
          <>
            <TableCell>Name</TableCell>
            <TableCell style={{ width: '150px' }} />
          </>
        )}
      />
    </div>
  )
}

export default connect(
  selectDoors,
  { createNewDoor },
)(CreateDoor)
