import doorsReducer from '../index'
import * as Actions from '../actions'
const initialState: State = {
  doors: [],
  doorsLoading: [],
  logs: [],
}

const createState = state => ({
  ...initialState,
  ...state,
})

describe('store/doors/reducer', () => {
  it('should have initial state', () => {
    expect(doorsReducer()).toEqual(initialState)
  })

  it('should create new door on CREATE_DOOR', () => {
    const door = {
      id: '1',
      name: 'new_door',
    }
    expect(
      doorsReducer(initialState, {
        type: Actions.CREATE_DOOR,
        door,
      }),
    ).toMatchObject({
      doors: [door],
    })
  })

  it('should set doors on LOAD_DOORS', () => {
    const doors = [
      {
        id: '0',
        name: 'door0',
      },
      {
        id: '1',
        name: 'door1',
      },
    ]
    expect(
      doorsReducer(initialState, {
        type: Actions.LOAD_DOORS,
        doors,
      }),
    ).toMatchObject({
      doors,
    })
  })

  it('should set door loading on OPEN_DOOR_REQUEST', () => {
    const door = {
      id: '0',
      name: 'door',
    }
    expect(
      doorsReducer(initialState, {
        type: Actions.OPEN_DOOR_REQUEST,
        door,
      }),
    ).toEqual({
      doors: [],
      doorsLoading: [door.id],
      logs: [],
    })
  })

  it('should open door on OPEN_DOOR_SUCCESS', () => {
    const door = {
      id: '0',
      name: 'door',
    }
    const state = doorsReducer(
      createState({
        doors: [door],
      }),
      {
        type: Actions.OPEN_DOOR_SUCCESS,
        door: door,
      },
    )
    expect(state).toMatchObject({
      logs: [],
      doors: [
        {
          ...door,
          open: true,
          failedToOpen: false,
        },
      ],
      doorsLoading: [],
    })
  })

  it('should set failedToOpen in door on OPEN_DOOR_FAILURE', () => {
    const door = {
      id: '0',
      name: 'door',
      open: false,
    }
    const state = doorsReducer(
      createState({
        doors: [door],
      }),
      {
        type: Actions.OPEN_DOOR_FAILURE,
        door,
      },
    )
    expect(state).toEqual({
      logs: [],
      doorsLoading: [],
      doors: [
        {
          ...door,
          failedToOpen: true,
          open: false,
        },
      ],
    })
  })

  it('should close door on CLOSE_DOOR', () => {
    const door = {
      id: '0',
      name: 'door',
      open: true,
    }

    const state = doorsReducer(
      createState({
        doors: [door],
      }),
      {
        type: Actions.CLOSE_DOOR,
        door,
      },
    )

    expect(state).toEqual({
      logs: [],
      doors: [
        {
          ...door,
          open: false,
        },
      ],
      doorsLoading: [],
    })
  })

  it('should add logs on CREATE_SUCCESS_LOG and CREATE_FAILURE_LOG', () => {
    const log = {
      type: 'accepted',
      user: {},
      door: {},
    }

    const state = doorsReducer(initialState, {
      type: Actions.CREATE_SUCCESS_LOG,
      log,
    })

    expect(state).toMatchObject({
      logs: [log],
    })

    const log_failure = {
      type: 'rejected',
      user: {},
      door: {},
    }

    expect(
      doorsReducer(state, {
        type: Actions.CREATE_FAILURE_LOG,
        log: log_failure,
      }),
    ).toMatchObject({
      logs: [log_failure, log],
    })
  })
})
