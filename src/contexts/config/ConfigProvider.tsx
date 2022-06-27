import React, { useReducer, useEffect, useState } from 'react'
import { KeyboardType, props } from '@src/types/declare'
import { Keyboard } from 'react-native'
import INITIAL_STATE from './InitialState'
import ConfigReducer from './ConfigReducer'
import ConfigContext from './ConfigContext'


const ConfigProvider = (props: props) => {

    const [ConfigState, dispatch] = useReducer(ConfigReducer, INITIAL_STATE)

    useEffect(() => {
        const keyboardDidShow = Keyboard.addListener("keyboardDidShow", () => toggleKeyboardStatus(true));
        const keyboardDidHide = Keyboard.addListener("keyboardDidHide", () => toggleKeyboardStatus(false));

        return () => {
            keyboardDidShow.remove();
            keyboardDidHide.remove();
        }
    }, [])

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

    const KeyboardDissmiss = () => {
        Keyboard.dismiss()
    }

    return (
        <ConfigContext.Provider value={{
            ConfigState,
            toggleKeyboardStatus,
            toggleKeyboard,
            KeyboardDissmiss
        }}>
            {props.children}
        </ConfigContext.Provider>
    )
}

export default ConfigProvider