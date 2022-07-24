import React, {useReducer, useEffect, useState} from 'react'
import {KeyboardType, props} from '@src/types/declare'
import {Keyboard, BackHandler} from 'react-native'
import INITIAL_STATE from './InitialState'
import ConfigReducer from './ConfigReducer'
import ConfigContext from './ConfigContext'
import {SELECTS} from '@src/services/general'

const ConfigProvider = (props: props) => {
  const [ConfigState, dispatch] = useReducer(ConfigReducer, INITIAL_STATE)

  useEffect(() => {
    const keyboardDidShow = Keyboard.addListener('keyboardDidShow', () =>
      toggleKeyboardStatus(true),
    )
    const keyboardDidHide = Keyboard.addListener('keyboardDidHide', () =>
      toggleKeyboardStatus(false),
    )

    SELECTS()
      .then(res => res.json())
      .then(res => {
        dispatch({
          type: 'SET_SELECTS',
          payload: res.data,
        })
      })

    return () => {
      keyboardDidShow.remove()
      keyboardDidHide.remove()
    }
  }, [])

  // disabled back button keyboard
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => ConfigState.loading,
    )
    return () => backHandler.remove()
  }, [ConfigState.loading])

  const toggleKeyboardStatus = (status: boolean) => {
    dispatch({
      type: 'SET_KEYBOARD_STATUS',
      payload: status,
    })
  }

  const toggleKeyboard = (Keyboard: KeyboardType) => {
    dispatch({
      type: 'SET_KEYBOARD',
      payload: Keyboard,
    })
  }

  const toggleLoading = (status: boolean) => {
    dispatch({
      type: 'SET_LOADING',
      payload: status,
    })
  }

  const KeyboardDismiss = () => {
    Keyboard.dismiss()
  }

  const headerShown = (status: boolean) => {
    dispatch({
      type: 'SET_HEADER_SHOWN',
      payload: status,
    })
  }

  return (
    <ConfigContext.Provider
      value={{
        ConfigState,
        toggleKeyboardStatus,
        toggleKeyboard,
        KeyboardDismiss: KeyboardDismiss,
        toggleLoading,
        headerShown,
      }}>
      {props.children}
    </ConfigContext.Provider>
  )
}

export default ConfigProvider
