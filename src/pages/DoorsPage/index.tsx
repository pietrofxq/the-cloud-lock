import React, { useEffect } from 'react'
import Door from './Door'
import styled from 'styled-components'
import { loadDoors, selectDoors } from '../../store/reducers/doors'
import { connect } from 'react-redux'
import Logs from './Logs';

const Container = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 1024px) {
    flex-direction: column;
    padding-bottom: 50px;
  }
`

const DoorContainer = styled.div`
  display: flex;
  flex: 1;
  padding: 0 50px;
  overflow-x: auto;
  padding-bottom: 20px;
  margin-right: 32px;

  @media (max-width: 768px) {
    padding: 0 20px;
  }
`

const Doors = ({ doors, loadDoors }) => {
  useEffect(() => {
    loadDoors()
  }, [loadDoors])
  return (
    <div>
      <h1>Available doors</h1>
      <Container>
        <DoorContainer>
          {doors.map(door => (
            <Door key={door.id} door={door} />
          ))}
        </DoorContainer>
        <Logs />
      </Container>
    </div>
  )
}

export default connect(
  selectDoors,
  { loadDoors },
)(Doors)
