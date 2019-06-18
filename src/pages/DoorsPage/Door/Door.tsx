import React, { useState, useEffect } from 'react'
import { Button, CircularProgress } from '@material-ui/core'
import { tryToOpenDoor, closeOpenDoor } from '../../../store/reducers/doors'
import doorImage from './door.png'
import { selectCurrentUser } from '../../../store/reducers/auth'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/styles'
import { DangerSnackbar } from '../../../components/Snackbar'
import {Card, DoorLabel, DoorSign, Shake, Triangle, SignContainer, ButtonContainer } from './styled'
import doorUnlockedSound from './door_unlocked.mp3'
import doorLockedSound from './door_locked.mp3'
import doorStuck from './door_stuck.mp3'
import { usePrevious } from '../../../utils';

const audio = new Audio()

const playSound = (url) => {
  audio.src = url
  audio.play()
}

const Spinner = () => {
  return <CircularProgress size={20} />
}

const CustomButton = withStyles(theme => ({
  root: {
    background: '#fff',
    width: '100%',
    marginTop: '16px',
  },
}))(Button)

export const Door = ({ user, door, tryToOpenDoor, closeOpenDoor }) => {
  const isOpen = door.open
  const [animate, setAnimate] = useState(false)
  const [snackbarOpen, setSnackbar] = useState(false)
  const wasOpen = usePrevious({ isOpen })
  useEffect(() => {
    if (!wasOpen.isOpen && isOpen) playSound(doorUnlockedSound)
    else if (wasOpen.isOpen && !isOpen) playSound(doorLockedSound)
  }, [wasOpen, isOpen])
  useEffect(() => {
    if (door.failedToOpen) {
      playSound(doorStuck)
      setAnimate(true)
      setSnackbar(true)
    }
  }, [door.failedToOpen])
  return (
    <>
      <DangerSnackbar
        open={snackbarOpen}
        onClose={() => setSnackbar(false)}
        message={`You don't have permission to open this door.`}
      />

      <Card>
        <DoorLabel>{door.name}</DoorLabel>
        <Shake 
          data-testid='shake-container' 
          className={animate ? 'shake' : ''} onAnimationEnd={() => setAnimate(false)}
          >
          <SignContainer data-testid='sign-container'
            className={`${isOpen ? '' : 'closed'}`}
          >
            <div className="box-inner">
              <div className="box-front">
                <Triangle />
                <DoorSign className="open">Open</DoorSign>
              </div>
              <div className="box-back">
                <Triangle />
                <DoorSign className="closed">Closed</DoorSign>
              </div>
            </div>
          </SignContainer>
          <img src={doorImage} alt='Door' width={200} />
        </Shake>
        <ButtonContainer>
          <CustomButton
            data-testid='door-button'
            variant="contained"
            onClick={() => {
              isOpen ? closeOpenDoor(door) : tryToOpenDoor(door, user)
            }}
          >
            {door.isLoading ? 
              <Spinner 
                data-testid='door-spinner' /> : 
                isOpen ? 'Close door' : 'Open door'}
          </CustomButton>
        </ButtonContainer>
      </Card>
    </>
  )
}

export default connect(
  selectCurrentUser,
  {
    tryToOpenDoor,
    closeOpenDoor,
  },
)(Door)
