export interface AuthState {
  auth: {
    user: User | null
    loginError: string
  }
}
