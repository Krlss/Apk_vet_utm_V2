import { useState, useContext } from 'react'
import { fetchState, LAuth, RAuth } from '@src/types/declare'
import { LOGIN } from '@src/services/auth'
import Toast from '@src/components/toast/Toast';
import AuthContext from '@src/contexts/auth/AuthContext';
import ConfigContext from '@src/contexts/config/ConfigContext';

const useAuth = () => {

    const [fetchState, setFetchState] = useState<fetchState>(false)
    const { setDataUser } = useContext(AuthContext)
    const { KeyboardDismiss } = useContext(ConfigContext)

    const login = async ({ email, password }: LAuth) => {
        KeyboardDismiss() // Hide keyboard
        setFetchState(true)
        try {
            const response = await LOGIN({ email, password })
            if (response.user) {
                setDataUser(response.user)
            }
            Toast(response)
            setFetchState(false)
        } catch (error) {
            setFetchState(false)
        }
    }

    const register = async ({ email, password }: RAuth) => { }


    return { fetchState, login, register }
}

export default useAuth