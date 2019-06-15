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