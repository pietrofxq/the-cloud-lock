import React from 'react'
import { Door } from '../Door'
import { render, cleanup, fireEvent } from '@testing-library/react'

const setup = (props = {}, doorProps) => {
  const defaultProps = {
    user: {
      id: '0',
      username: 'user',
    },
    door: {
      id: '0',
      name: 'door',
      ...doorProps,
    },
    tryToOpenDoor: () => {},
    closeOpenDoor: () => {},
  }
  return render(<Door {...defaultProps} {...props} />)
}

afterEach(cleanup)

describe('Door component', () => {
  it('should display spinner if door is loading', () => {
    const { container } = setup({}, { isLoading: true })
    const spinner = container.querySelector('svg circle')
    expect(spinner).toBeTruthy()
  })
  describe('Closed door', () => {
    it('should render with closed class by default', () => {
      const { getByTestId } = setup()
      const container = getByTestId('sign-container')
      expect(container.classList.contains('closed')).toBeTruthy()
    })

    it('should call tryToOpenDoor if door is closed', () => {
      const fn = jest.fn()
      const { getByText } = setup({
        tryToOpenDoor: fn,
      })
      const button = getByText('Open door')
      fireEvent.click(button)
      expect(fn).toHaveBeenCalled()
    })
  })

  describe('Open door', () => {
    it('should render open class if door is open', () => {
      const { getByTestId } = setup({}, { open: true })
      const container = getByTestId('sign-container')
      expect(container.classList.contains('closed')).toBeFalsy()
    })

    it('should call closeDoor if door is open', () => {
      const fn = jest.fn()
      const { getByText } = setup(
        {
          closeOpenDoor: fn,
        },
        { open: true },
      )
      const button = getByText('Close door')
      fireEvent.click(button)
      expect(fn).toHaveBeenCalled()
    })
  })
})
