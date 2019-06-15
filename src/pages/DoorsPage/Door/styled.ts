import styled from 'styled-components'

export const DoorLabel = styled.h2`
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 16px;
`

export const Shake = styled.div`
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

export const SignContainer = styled.div`
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

export const DoorSign = styled.div`
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

export const Triangle = styled.div`
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

export const Card = styled.div`
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  padding: 0 90px;
  margin-right: 15px;

  &:last-child {
    border-right: none;
  }
`

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 16px;
`