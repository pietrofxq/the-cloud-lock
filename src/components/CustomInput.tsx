import React from 'react'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import DoneIcon from '@material-ui/icons/Done'

const useStyles = makeStyles(
  createStyles({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: 400,
    },
    input: {
      marginLeft: 8,
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      width: 1,
      height: 28,
      margin: 4,
    },
  }),
)

export default function CustomInput({ placeholder, value, onChange, ...props }) {
  const classes = useStyles({})
  return (
    <Paper className={classes.root}>
      <InputBase
        className={classes.input}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        inputProps={{ 'aria-label': placeholder }}
        {...props}
      />
      <Divider className={classes.divider} />
      <IconButton
        disabled={!value}
        type="submit"
        color="primary"
        className={classes.iconButton}
        aria-label="Create"
      >
        <DoneIcon />
      </IconButton>
    </Paper>
  )
}
