import mockAxios from 'axios'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { tryToOpenDoor, createNewDoor, loadDoors, closeOpenDoor } from '../index'
import * as Actions from '../actions'
const buildStore = configureStore([thunk])

jest.mock('axios')
jest.useFakeTimers()
const door = {
  id: '0',
  name: 'door',
}

const user = {
  id: '0',
  username: 'user',
}

describe('Door actions', () => {
  let store

  beforeEach(() => {
    store = buildStore({
      doors: {
        doors: [],
        doorsLoading: [],
        logs: [],
      },
    })
  })

  describe('tryToOpenDoor', () => {
    const mockResponse = { data: { doors: [door.id] } }
    const doorRequest = {
      type: Actions.OPEN_DOOR_REQUEST,
      door,
    }

    it('should dispatch door request, success action and create log', async () => {
      mockAxios.get.mockImplementationOnce(() => Promise.resolve(mockResponse))
      await store.dispatch(tryToOpenDoor(door, user))
      jest.runAllTimers()
      const actions = store.getActions()
      expect(actions[0]).toEqual(doorRequest)
      expect(actions[1]).toEqual({
        type: Actions.OPEN_DOOR_SUCCESS,
        door,
      })
      expect(actions[2]).toEqual({
        type: Actions.CREATE_SUCCESS_LOG,
        log: {
          type: 'opened',
          door,
          user,
        },
      })
    })

    it('should dispatch door request, failure action and create log', async () => {
      mockAxios.get.mockImplementationOnce(() => Promise.resolve({ data: { doors: [] } }))
      await store.dispatch(tryToOpenDoor(door, user))
      jest.runAllTimers()
      const actions = store.getActions()
      expect(actions[0]).toEqual(doorRequest)
      expect(actions[1]).toEqual({
        type: Actions.OPEN_DOOR_FAILURE,
        door,
      })
      expect(actions[2]).toEqual({
        type: Actions.CREATE_FAILURE_LOG,
        log: {
          type: 'rejected',
          door,
          user,
        },
      })
    })
  })

  it('should dispatch CREATE_DOOR and return door', async () => {
    mockAxios.post.mockImplementationOnce(() => Promise.resolve({ data: door }))
    await store.dispatch(createNewDoor(door.name))
    expect(store.getActions()[0]).toEqual({
      type: Actions.CREATE_DOOR,
      door,
    })
  })

  it('should dispatch LOAD_DOORS and return list of doors', async () => {
    const doors = [door, door]
    mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: doors,
      }),
    )
    await store.dispatch(loadDoors())
    expect(store.getActions()[0]).toEqual({
      type: Actions.LOAD_DOORS,
      doors,
    })
  })

  it('should dispatch CLOSE_DOOR and return door', async () => {
    mockAxios.patch.mockImplementationOnce(() => Promise.resolve())
    await store.dispatch(closeOpenDoor(door))
    expect(store.getActions()[0]).toEqual({
      type: Actions.CLOSE_DOOR,
      door,
    })
  })
})
