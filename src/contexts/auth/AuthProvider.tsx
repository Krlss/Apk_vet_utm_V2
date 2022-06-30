import React, {useReducer} from 'react'

import INITIAL_STATE from './InitialState'
import AuthReducer from './AuthReducer'
import AuthContext from './AuthContext'
import {props, AuthContextType} from '@src/types/declare'

const AuthProvider = (props: props) => {
  const [AuthState, dispatch] = useReducer(AuthReducer, INITIAL_STATE)

  const setDataUser = (data: AuthContextType) => {
    dispatch({
      type: 'SAVE',
      payload: data,
    })
  }

  return (
    <AuthContext.Provider
      value={{
        AuthState,
        setDataUser,
      }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
