import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import styled from 'styled-components'
import { Button } from '@material-ui/core'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import CustomTable from '../components/CustomTable'
import { getDoor, getUsersSuggestionsForDoor, assignDoorToUser } from '../api'

// little hack to make the button be placed nicely on side of the select
const SelectContainer = styled.div`
  display: flex;

  > div {
    flex: 1;
  }

  button {
    margin-left: 20px;
  }
`

const DoorPermissions = ({ match }) => {
  const doorId = match.params.id
  const [door, setDoor] = useState()
  const [suggestions, setSuggestions] = useState([])
  const [selectedOptions, setSelected] = useState([])
  useEffect(() => {
    getDoor(doorId).then(setDoor)
  }, [doorId])

  useEffect(() => {
    getUsersSuggestionsForDoor(doorId).then(setSuggestions)
  }, [doorId, door])

  const assignPermissions = () => {
    const promises = selectedOptions.map(user => assignDoorToUser(doorId, user.id))
    Promise.all(promises)
      .then(() => getDoor(doorId).then(setDoor))
      .then(() => setSelected([]))
  }

  if (!door) return null
  return (
    <div>
      <h1>{door.name} permissions</h1>
      <h2>Select new users who can open door</h2>
      <SelectContainer>
        <Select
          onChange={items => setSelected(items)}
          isMulti
          value={selectedOptions}
          options={suggestions}
          getOptionLabel={option => option.username}
          getOptionValue={option => option.username}
        />

        <Button
          variant="contained"
          onClick={assignPermissions}
          disabled={selectedOptions.length === 0}
        >
          Add
        </Button>
      </SelectContainer>
      <h2>Current users</h2>
      {door.users.length === 0 ? (
        <h3>No users can open this door.</h3>
      ) : (
        <CustomTable
          renderRows={() => {
            return door.users.map(row => (
              <TableRow key={row.username}>
                <TableCell component="td" scope="row">
                  {row.username}
                </TableCell>
              </TableRow>
            ))
          }}
          renderCells={() => <TableCell>Name</TableCell>}
        />
      )}
    </div>
  )
}

export default DoorPermissions
