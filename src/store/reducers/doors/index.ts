import { createDoor, getDoors, canOpenDoor, closeDoor } from '../../../api'
import * as Actions from './actions'

type State = {
  doors: Door[]
  doorsLoading: string[],
  logs: Log[]
}

const initialState: State = {
  doors: [],
  doorsLoading: [],
  logs: []
}

const removeDoorFromLoading = (list, id) => list.filter(x => x !== id)

const updateElementById = (el, newEl) => (el.id === newEl.id ? newEl : el)

export const selectDoors = ({ doors: doorsReducer }: DoorsState) => {
  const doors = doorsReducer.doors.map(door => ({
    ...door,
    isLoading: doorsReducer.doorsLoading.includes(door.id),
  }))
  return { doors }
}

const createSuccessLog = (door: Door, user: User): Actions.DoorActionType => ({
  type: Actions.CREATE_SUCCESS_LOG,
  log: {
    type: 'opened',
    user,
    door
  }
})

const createFailureLog = (door: Door, user: User): Actions.DoorActionType => ({
  type: Actions.CREATE_FAILURE_LOG,
  log: {
    type: 'rejected',
    user,
    door
  }
})

const setDoor = (door: Door): Actions.DoorActionType => ({
  type: Actions.CREATE_DOOR,
  door,
})

const loadDoorsSuccess = (doors: Door[]): Actions.DoorActionType => ({
  type: Actions.LOAD_DOORS,
  doors,
})

const openDoorRequest = (door: Door): Actions.DoorActionType => ({
  type: Actions.OPEN_DOOR_REQUEST,
  door,
})

const openDoorSuccess = (door: Door): Actions.DoorActionType => ({
  type: Actions.OPEN_DOOR_SUCCESS,
  door,
})

const openDoorFailure = (door: Door): Actions.DoorActionType => ({
  type: Actions.OPEN_DOOR_FAILURE,
  door,
})

const closeDoorRequest = (door: Door): Actions.DoorActionType => ({
  type: Actions.CLOSE_DOOR,
  door,
})

export const tryToOpenDoor = (door: Door, user: User) => {
  // the setTimeouts here are just to show the loading spinners
  return dispatch => {
    dispatch(openDoorRequest(door))
    return canOpenDoor(door.id, user.id)
      .then(() => {
        setTimeout(() => {
          dispatch(openDoorSuccess(door))
          dispatch(createSuccessLog(door, user))
        }, 500)
      })
      .catch((err) => {
        setTimeout(() => {
          dispatch(openDoorFailure(door))
          dispatch(createFailureLog(door, user))
        }, 500)
      })
  }
}

export const closeOpenDoor = (door: Door) => {
  return dispatch => {
    return closeDoor(door.id).then(() => {
      dispatch(closeDoorRequest(door))
    })
  }
}

export const createNewDoor = (name: string) => {
  return dispatch => {
    return createDoor(name).then(door => {
      dispatch(setDoor(door))
    })
  }
}

export const loadDoors = () => {
  return dispatch => {
    return getDoors().then(doors => {
      dispatch(loadDoorsSuccess(doors))
    })
  }
}

const doorsReducer = (state = initialState, action: Partial<Actions.DoorActionType> = {}) => {
  switch (action.type) {
    case Actions.CREATE_DOOR:
      return { ...state, doors: [...state.doors, action.door] }
    case Actions.LOAD_DOORS:
      return { ...state, doors: action.doors }
    case Actions.OPEN_DOOR_REQUEST: {
      const door = {...action.door, failedToOpen: false}
      return {
        ...state,
        doors: state.doors.map(el => updateElementById(el, door)),
        doorsLoading: [...state.doorsLoading, action.door.id],
      }
    }
    case Actions.OPEN_DOOR_SUCCESS: {
      const door = { ...action.door, open: true, failedToOpen: false }
      return {
        ...state,
        doors: state.doors.map(el => updateElementById(el, door)),
        doorsLoading: removeDoorFromLoading(state.doorsLoading, door.id)
      }
    }
    case Actions.OPEN_DOOR_FAILURE: {
      const door = { ...action.door, failedToOpen: true }
      return {
        ...state,
        doors: state.doors.map(el => updateElementById(el, door)),
        doorsLoading: removeDoorFromLoading(state.doorsLoading, action.door.id),
      }
    }
    case Actions.CLOSE_DOOR: {
      const door = { ...action.door, open: false }
      return {
        ...state,
        doors: state.doors.map(el => updateElementById(el, door)),
      }
    }
    case Actions.CREATE_SUCCESS_LOG:
    case Actions.CREATE_FAILURE_LOG: {
      return {
        ...state,
        logs: [action.log, ...state.logs]
      }
    }
    default:
      return state
  }
}

export default doorsReducer
