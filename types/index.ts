export interface User {
  id: string
  email: string
  username: string
  firstName: string
  lastName: string
  isAdmin: boolean
}

export interface MenuItem {
  id: string
  title: string
  icon?: string
  href?: string
  children?: MenuItem[]
}

export interface AppState {
  currentUser: User | null
  currentPage: string
  logoUrl: string
  isLoggedIn: boolean
}
