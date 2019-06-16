interface User {
  username: string
  doors: Door[]
  id: string
}

interface Door {
  id: string
  name: string
  open: boolean
}

declare module "*.mp3" {
  const name: string
  export default name
}