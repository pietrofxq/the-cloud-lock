import React from 'react'
import { Snackbar, makeStyles, SnackbarContent } from '@material-ui/core'
import ErrorIcon from '@material-ui/icons/Error'

const useStyles = makeStyles(theme => ({
  error: {
    backgroundColor: '#c0392b',
  },
  icon: {
    fontSize: 20,
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
}))

export const DangerSnackbar = ({ message, open, ...props }) => {
  const classes = useStyles({})
  return (
    <Snackbar
      open={open}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      autoHideDuration={3000}
      {...props}
    >
      <SnackbarContent
        className={classes.error}
        message={
          <span className={classes.message}>
            <ErrorIcon className={classes.icon} />
            {message}
          </span>
        }
      />
    </Snackbar>
  )
}
