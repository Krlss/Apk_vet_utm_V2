import { useState, useContext } from 'react'
import { fetchState, LAuth, RAuth, ServiceRAuth } from '@src/types/declare'
import { LOGIN, REGISTER } from '@src/services/auth'
import Toast from '@src/components/toast/Toast';
import AuthContext from '@src/contexts/auth/AuthContext';
import ConfigContext from '@src/contexts/config/ConfigContext';
import { separateFullname } from '@src/utils/utils'

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

    const register = async ({ user_id, fullname, phone, email, password }: ServiceRAuth) => {
        KeyboardDismiss() // Hide keyboard
        setFetchState(true)
        try {
            const [name, last_name1, last_name2] = separateFullname(fullname)
            const response = await REGISTER({ user_id, name, last_name1, last_name2, phone, email, password })
            setFetchState(false)
            if (!response.ok) {
                if (response.errors) {
                    return response
                } else {
                    Toast(response)
                    return response
                }
            }
        } catch (error) {
            setFetchState(false)
        }
    }


    return { fetchState, login, register }
}

export default useAuth