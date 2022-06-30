import {createContext} from 'react'

import {AuthContextType} from '@src/types/declare'

export type AuthContextProps = {
  AuthState: AuthContextType
  setDataUser: (data: AuthContextType) => void
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

export default AuthContext
