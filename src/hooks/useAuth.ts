import { useState, useEffect } from 'react'
import { Keyboard } from 'react-native'

const useAuth = () => {

    const [keyboardStatus, setKeyboardStatus] = useState(false)

    useEffect(() => {
        const showSubscription = Keyboard.addListener("keyboardDidShow", () => setKeyboardStatus(true));
        const hideSubscription = Keyboard.addListener("keyboardDidHide", () => setKeyboardStatus(false));

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);

    return {
        keyboardStatus,
        Keyboard
    }
}

export default useAuth