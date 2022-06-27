import { useState, useEffect, useContext } from 'react'
import { Keyboard } from 'react-native'
import ConfigContext from '@src/contexts/config/ConfigContext'

const useConfig = () => {

    const [keyboardStatus, setKeyboardStatus] = useState(false)

    const { toggleKeyboardStatus } = useContext(ConfigContext)

    useEffect(() => {
        const showSubscription = Keyboard.addListener("keyboardDidShow", () => setKeyboardStatus(true));
        const hideSubscription = Keyboard.addListener("keyboardDidHide", () => setKeyboardStatus(false));

        toggleKeyboardStatus(keyboardStatus);

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, [keyboardStatus]);

    const KeyboardDissmiss = () => {
        Keyboard.dismiss();
    }

    return {
        keyboardStatus,
        Keyboard,
        KeyboardDissmiss
    }
}

export default useConfig