import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { Button, CircularProgress } from '@material-ui/core'
import { tryToOpenDoor, closeOpenDoor } from '../../store/reducers/doors'
import doorImage from './door.png'
import { selectCurrentUser } from '../../store/reducers/auth'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/styles'
import { usePrevious } from '../../utils'
import { DangerSnackbar } from '../../components/Snackbar'

const DoorLabel = styled.h2`
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 16px;
`

const Shake = styled.div`
  position: relative;
  &.shake {
    animation: shake 0.7s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
    transform: translate3d(0, 0, 0);
  }

  @keyframes shake {
    10%,
    90% {
      transform: translate3d(-1px, 0, 0);
    }

    20%,
    80% {
      transform: translate3d(2px, 0, 0);
    }

    30%,
    50%,
    70% {
      transform: translate3d(-4px, 0, 0);
    }

    40%,
    60% {
      transform: translate3d(4px, 0, 0);
    }
  }
`

const SignContainer = styled.div`
  position: absolute;
  transform: translateX(-50%);
  left: 50%;
  top: 50px;
  width: 70px;
  height: 30px;
  perspective: 200px;

  &.closed {
    .box-inner {
      transform: rotateY(180deg);
    }
  }

  .box-inner {
    position: relative;
    transition: transform 0.8s;
    transform-style: preserve-3d;
    transform-origin: top center;
  }

  .box-front,
  .box-back {
    width: 100%;
    position: absolute;
    backface-visibility: hidden;
  }

  .box-back {
    transform: rotateY(180deg);
  }
`

const DoorSign = styled.div`
  border: 2px solid black;
  position: relative;
  padding: 2px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  font-weight: 600;
  color: white;
  width: 100%;

  &.closed {
    background: #e74c3c;
  }

  &.open {
    background: #27ae60;
  }
`

const Triangle = styled.div`
  position: relative;
  z-index: -1;
  left: 15px;
  top: 1px;

  &::before,
  &::after {
    content: '';
    display: block;
    position: absolute;
    top: -20px;
    width: 0;
    height: 0;
    border-style: solid;
  }

  &::before {
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 20px 20px 20px;
    border-color: transparent transparent black transparent;
    position: absolute;
  }

  &::after {
    position: absolute;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 16px 16px 16px;
    border-color: transparent transparent white transparent;
    top: -17px;
    left: 4px;
  }
`

const Card = styled.div`
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  padding: 0 90px;
  margin-right: 15px;

  &:last-child {
    border-right: none;
  }
`

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

const Door = ({ user, door, tryToOpenDoor, closeOpenDoor }) => {
  const isOpen = door.open
  const prevLoading = usePrevious({ isLoading: door.isLoading })
  const ref = useRef<HTMLDivElement>()
  const [animate, setAnimate] = useState(false)
  const [snackbarOpen, setSnackbar] = useState(false)
  useEffect(() => {
    if (door.isLoading) return
    // Failed to open the door
    if (prevLoading && prevLoading.isLoading && !isOpen) {
      setAnimate(true)
      setSnackbar(true)
    }
  }, [door.isLoading, isOpen, prevLoading])
  return (
    <>
      <DangerSnackbar
        open={snackbarOpen}
        onClose={() => setSnackbar(false)}
        message={`You don't have permission to open this door.`}
      />

      <Card>
        <DoorLabel>{door.name}</DoorLabel>
        <Shake className={animate ? 'shake' : ''} onAnimationEnd={() => setAnimate(false)}>
          <SignContainer
            className={`${isOpen ? '' : 'closed'}`}
            onAnimationEndCapture={() => setAnimate(false)}
            ref={ref}
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
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <CustomButton
            variant="contained"
            onClick={() => {
              isOpen ? closeOpenDoor(door) : tryToOpenDoor(door, user)
            }}
          >
            {door.isLoading ? <Spinner /> : isOpen ? 'Close door' : 'Open door'}
          </CustomButton>
        </div>
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
