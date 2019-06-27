import axios, { AxiosResponse } from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:4000',
})

const getData = (body: AxiosResponse) => body.data

/* Doors API */

const getDoorsUserCanOpen = userId => {
  return instance.get(`/users/${userId}`).then(body => body.data.doors)
}

export const createDoor = (name: string): Promise<Door> => {
  return instance
    .post('/doors', {
      name,
      doors: [],
    })
    .then(getData)
}

export const assignDoorToUser = async (doorId, userId) => {
  const doors = await getDoorsUserCanOpen(userId)
  return instance.patch(`/users/${userId}`, {
    doors: [...doors, doorId],
  })
}

const openDoor = doorId => {
  return instance.patch(`/doors/${doorId}`, {
    open: true,
  })
}

export const closeDoor = doorId => {
  return instance.patch(`/doors/${doorId}`, {
    open: false,
  })
}

export const getDoors = (): Promise<Door[]> => {
  return instance.get('/doors').then(getData)
}

export const getDoor = async doorId => {
  const [door, users] = await Promise.all([
    instance.get(`/doors/${doorId}`),
    getUsersWhoCanOpenDoor(doorId),
  ])
  return {
    ...door.data,
    users,
  }
}

export const canOpenDoor = (doorId, userId): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    const doors = await getDoorsUserCanOpen(userId)
    if (doors.indexOf(doorId) !== -1) {
      await openDoor(doorId)
      resolve()
    } else reject(new Error('No permissions to open door'))
  })
}

/* Users API */

export const createUser = (username: string) => {
  return instance.post('/users', {
    username,
    doors: [],
  })
}

export const getUsers = (): Promise<User[]> => {
  return instance.get('/users').then(getData)
}

export const getUsersWhoCanOpenDoor = (doorId): Promise<User[]> => {
  return getUsers().then(users => users.filter(user => user.doors.includes(doorId)))
}

export const getUsersSuggestionsForDoor = async (doorId): Promise<User[]> => {
  const users = await getUsers()
  return users.filter(user => !user.doors.includes(doorId))
}

export const getUser = async (username): Promise<User> => {
  return instance.get(`/users?username_like=${username}`).then(body => {
    if (body.data.length === 0) throw new Error('User not found')
    return body.data[0]
  })
}
