import React, { useReducer } from 'react'
import { KeyboardType, props } from '@src/types/declare'

import INITIAL_STATE from './InitialState'
import ConfigReducer from './ConfigReducer'
import ConfigContext from './ConfigContext'


const ConfigProvider = (props: props) => {

    const [ConfigState, dispatch] = useReducer(ConfigReducer, INITIAL_STATE)

    const toggleKeyboardStatus = (status: boolean) => {
        dispatch({
            type: 'SET_KEYBOARD_STATUS',
            payload: status
        })
    }

    const toggleKeyboard = (Keyboard: KeyboardType) => {
        dispatch({
            type: 'SET_KEYBOARD',
            payload: Keyboard
        })
    }

    return (
        <ConfigContext.Provider value={{
            ConfigState,
            toggleKeyboardStatus,
            toggleKeyboard
        }}>
            {props.children}
        </ConfigContext.Provider>
    )
}

export default ConfigProvider