import {createContext} from 'react'

import {user, AuthContextType} from '@src/types/declare'

export type AuthContextProps = {
  AuthState: AuthContextType
  setDataUser: (data: user) => void
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

export default AuthContext
