import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { TableRow, TableCell, makeStyles } from '@material-ui/core'
import CustomTable from '../../components/CustomTable'

const Container = styled.div`
  width: 480px;

  @media (max-width: 1024px) {
    width: 100%;
  }
`

const useStyles = makeStyles({
  root: {
    '& td': {
      color: 'white',
      fontWeight: 600,
    },
  },
  bg: {
    backgroundColor: (props: { backgroundColor: string }) => props.backgroundColor,
  },
})

const useTableStyles = makeStyles({
  table: {
    '& thead, & tbody tr': {
      display: 'table',
      width: '100%',
      tableLayout: 'fixed',
    },
    '& tbody': {
      maxHeight: '440px',
      overflowY: 'auto',
      display: 'block',
    },
  },
})

const Log = ({ log }) => {
  const bg = { backgroundColor: log.type === 'opened' ? '#2ecc71' : '#e74c3c' }
  const classes = useStyles(bg)
  return (
    <TableRow className={`${classes.root} ${classes.bg}`}>
      <TableCell>{log.type}</TableCell>
      <TableCell>{log.door.name}</TableCell>
      <TableCell>{log.user.username}</TableCell>
    </TableRow>
  )
}

const Logs = ({ logs }) => {
  const classes = useTableStyles({})
  return (
    <Container>
      <h2>History</h2>
      {logs.length === 0 ? (
        <p>No actions done yet.</p>
      ) : (
        <CustomTable
          className={classes.table}
          renderCells={() => (
            <>
              <TableCell>Status</TableCell>
              <TableCell>Door</TableCell>
              <TableCell>User</TableCell>
            </>
          )}
          renderRows={() => {
            return logs.map((log, idx) => <Log log={log} key={idx} />)
          }}
        />
      )}
    </Container>
  )
}

const mapStateToProps = ({ doors: { logs } }: DoorsState) => ({ logs })

export default connect(mapStateToProps)(Logs)
