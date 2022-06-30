import React, {useReducer} from 'react'

import INITIAL_STATE from './InitialState'
import AuthReducer from './AuthReducer'
import AuthContext from './AuthContext'
import {props, user} from '@src/types/declare'

const AuthProvider = (props: props) => {
  const [AuthState, dispatch] = useReducer(AuthReducer, INITIAL_STATE)

  const setDataUser = (data: user) => {
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
