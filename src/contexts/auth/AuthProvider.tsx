import React, {useReducer, useState, useEffect} from 'react'

import INITIAL_STATE from './InitialState'
import AuthReducer from './AuthReducer'
import AuthContext from './AuthContext'
import {props, user} from '@src/types/declare'
import useStorage from '@src/hooks/useStorage'

const AuthProvider = (props: props) => {
  const [AuthState, dispatch] = useReducer(AuthReducer, INITIAL_STATE)
  const [splashScreen, setSplashScreen] = useState(true)
  const {removeItem, setItem, getItem} = useStorage()

  const setDataUser = (data: user) => {
    setItem('vet.utm.user', data)
    dispatch({
      type: 'SAVE',
      payload: data,
    })
  }

  const resetDataUser = () => {
    removeItem('vet.utm.user')
    dispatch({
      type: 'LOGOUT',
      payload: INITIAL_STATE.user,
    })
  }

  const isLogin = async () => {
    try {
      setSplashScreen(true)
      const data = (await getItem('vet.utm.user')) as user
      if (data) {
        dispatch({
          type: 'SAVE',
          payload: data,
        })
      }
      setSplashScreen(false)
    } catch (error) {
      setSplashScreen(false)
      console.log(error)
    }
  }

  useEffect(() => {
    isLogin()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        AuthState,
        setDataUser,
        resetDataUser,
        isLogin,
        splashScreen,
      }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
