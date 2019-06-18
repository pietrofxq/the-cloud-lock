import React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { styled } from '@material-ui/core/styles'

const FixedTable = styled(Table)({
  tableLayout: 'fixed',
})

const CustomTable = ({ renderRows, renderCells, className = '' }) => {
  return (
    <Paper>
      <FixedTable className={className}>
        <TableHead>
          <TableRow>{renderCells()}</TableRow>
        </TableHead>
        <TableBody>{renderRows()}</TableBody>
      </FixedTable>
    </Paper>
  )
}

export default CustomTable
