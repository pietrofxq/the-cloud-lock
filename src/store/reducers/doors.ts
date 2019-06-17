import { createDoor, getDoors, canOpenDoor, closeDoor } from '../../api'

type Log = {
  type: 'accepted' | 'rejected',
  user: User,
  door: Door
}

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

const LOAD_DOORS = 'clay/doors/LOAD_DOORS'
const CREATE_DOOR = 'clay/doors/CREATE_DOOR'
const CLOSE_DOOR = 'clay/doors/CLOSE_DOOR'
const OPEN_DOOR_REQUEST = 'clay/doors/OPEN_DOOR_REQUEST'
const OPEN_DOOR_SUCCESS = 'clay/doors/OPEN_DOOR_SUCCESS'
const OPEN_DOOR_FAILURE = 'clay/doors/OPEN_DOOR_FAILURE'

const CREATE_SUCCESS_LOG = 'clay/logs/CREATE_SUCCESS_LOG'
const CREATE_FAILURE_LOG = 'clay/logs/CREATE_FAILURE_LOG'

const removeDoorFromLoading = (list, id) => list.filter(x => x !== id)

const updateElementById = (el, newEl) => (el.id === newEl.id ? newEl : el)

export const selectDoors = ({ doorsReducer }) => {
  const doors = doorsReducer.doors.map(door => ({
    ...door,
    isLoading: doorsReducer.doorsLoading.includes(door.id),
  }))
  return { doors }
}

const createSuccessLog = (door, user) => ({
  type: CREATE_SUCCESS_LOG,
  log: {
    type: 'opened',
    user,
    door
  }
})

const createFailureLog = (door, user) => ({
  type: CREATE_FAILURE_LOG,
  log: {
    type: 'rejected',
    user,
    door
  }
})

const setDoor = (door: Door) => ({
  type: CREATE_DOOR,
  door,
})

const loadDoorsSuccess = (doors: Door[]) => ({
  type: LOAD_DOORS,
  doors,
})

const openDoorRequest = (door: Door) => ({
  type: OPEN_DOOR_REQUEST,
  door,
})

const openDoorSuccess = (door: Door) => ({
  type: OPEN_DOOR_SUCCESS,
  door,
})

const openDoorFailure = (door: Door) => ({
  type: OPEN_DOOR_FAILURE,
  door,
})

const closeDoorRequest = (door: Door) => ({
  type: CLOSE_DOOR,
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

const doorsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_DOOR:
      return { ...state, doors: [...state.doors, action.door] }
    case LOAD_DOORS:
      return { ...state, doors: action.doors }
    case OPEN_DOOR_REQUEST: {
      const door = {...action.door, failedToOpen: false}
      return {
        ...state,
        doors: state.doors.map(el => updateElementById(el, door)),
        doorsLoading: [...state.doorsLoading, action.door.id],
      }
    }
    case OPEN_DOOR_SUCCESS: {
      const door = { ...action.door, open: true, failedToOpen: false }
      return {
        ...state,
        doors: state.doors.map(el => updateElementById(el, door)),
        doorsLoading: removeDoorFromLoading(state.doorsLoading, door.id)
      }
    }
    case OPEN_DOOR_FAILURE: {
      const door = { ...action.door, failedToOpen: true }
      return {
        ...state,
        doors: state.doors.map(el => updateElementById(el, door)),
        doorsLoading: removeDoorFromLoading(state.doorsLoading, action.door.id),
      }
    }
    case CLOSE_DOOR: {
      const door = { ...action.door, open: false }
      return {
        ...state,
        doors: state.doors.map(el => updateElementById(el, door)),
      }
    }
    case CREATE_SUCCESS_LOG:
    case CREATE_FAILURE_LOG: {
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
