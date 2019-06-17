export const LOAD_DOORS = 'clay/doors/LOAD_DOORS'
export const CREATE_DOOR = 'clay/doors/CREATE_DOOR'
export const CLOSE_DOOR = 'clay/doors/CLOSE_DOOR'
export const OPEN_DOOR_REQUEST = 'clay/doors/OPEN_DOOR_REQUEST'
export const OPEN_DOOR_SUCCESS = 'clay/doors/OPEN_DOOR_SUCCESS'
export const OPEN_DOOR_FAILURE = 'clay/doors/OPEN_DOOR_FAILURE'
export const CREATE_SUCCESS_LOG = 'clay/logs/CREATE_SUCCESS_LOG'
export const CREATE_FAILURE_LOG = 'clay/logs/CREATE_FAILURE_LOG'

interface SuccessLogAction {
  type: typeof CREATE_SUCCESS_LOG,
  log: Log
}

interface FailureLogAction {
  type: typeof CREATE_FAILURE_LOG,
  log: Log
}

interface SetDoorAction {
  type: typeof CREATE_DOOR,
  door: Door
}

interface LoadDoorsAction {
  type: typeof LOAD_DOORS,
  doors: Door[]
}

interface OpenDoorRequestAction {
  type: typeof OPEN_DOOR_REQUEST,
  door: Door
}

interface OpenDoorSuccessAction {
  type: typeof OPEN_DOOR_SUCCESS,
  door: Door
}

interface OpenDoorFailureAction {
  type: typeof OPEN_DOOR_FAILURE,
  door: Door
}

interface CloseDoorAction {
  type: typeof CLOSE_DOOR,
  door: Door
}

export type DoorActionType = SuccessLogAction | FailureLogAction | SetDoorAction | LoadDoorsAction | OpenDoorRequestAction | OpenDoorSuccessAction | OpenDoorFailureAction | CloseDoorAction