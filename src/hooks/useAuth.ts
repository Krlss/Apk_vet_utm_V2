import { useContext } from 'react'
import { LAuth, ServiceRAuth, AuthContextType, user, pet } from '@src/types/declare'
import { LOGIN, REGISTER, GET_USER_DATA } from '@src/services/auth'
import { UPDATED_USER_PROFILE, UPDATED_PASSWORD } from '@src/services/user'
import { UPDATED_PET_PROFILE } from '@src/services/pet'
import AuthContext from '@src/contexts/auth/AuthContext';
import ConfigContext from '@src/contexts/config/ConfigContext';
import { separateFullname } from '@src/utils/utils'
import { getDataFromStatus } from '@src/utils/utils'
const useAuth = () => {

    const { setDataUser } = useContext(AuthContext)
    const { KeyboardDismiss, toggleLoading } = useContext(ConfigContext)
    const login = async ({ email, password }: LAuth) => {
        KeyboardDismiss() // Hide keyboard
        toggleLoading(true)
        try {
            const response = await LOGIN({ email, password })
            const res = await getDataFromStatus(response) as AuthContextType
            if (res?.user) setDataUser(res.user)
            toggleLoading(false)
            return res
        } catch (error) {
            toggleLoading(false)
        }
    }

    const register = async ({ user_id, fullname, phone, email, password }: ServiceRAuth) => {
        KeyboardDismiss() // Hide keyboard
        toggleLoading(true)
        try {
            const [name, last_name1, last_name2] = separateFullname(fullname)
            const response = await REGISTER({ user_id, name, last_name1, last_name2, phone, email, password })
            const res = await getDataFromStatus(response)
            toggleLoading(false)
            return res
        } catch (error) {
            toggleLoading(false)
        }
    }

    const get_profile = async (api_token: string, user_id: string) => {
        KeyboardDismiss() // Hide keyboard
        toggleLoading(true)
        try {
            const response = await GET_USER_DATA({ api_token, user_id })
            const res = await getDataFromStatus(response) as AuthContextType
            toggleLoading(false)
            if (res?.user) return res
            return res
        } catch (error) {
            toggleLoading(false)
        }
    }

    const UPDATED_USER = async (data: user, api_token?: string) => {
        KeyboardDismiss() // Hide keyboard
        toggleLoading(true)
        try {
            const response = await UPDATED_USER_PROFILE(data, api_token)
            const res = await getDataFromStatus(response) as AuthContextType
            toggleLoading(false)
            if (res?.user) setDataUser(res.user)
            return res
        } catch (error) {
            toggleLoading(false)
        }
    }

    const CHANGE_PASSWORD = async (data: user, api_token?: string) => {
        KeyboardDismiss() // Hide keyboard
        toggleLoading(true)
        try {
            const response = await UPDATED_PASSWORD(data, api_token)
            const res = await getDataFromStatus(response) as AuthContextType
            toggleLoading(false)
            if (res?.user) setDataUser(res.user)
            return res
        } catch (error) {
            toggleLoading(false)
        }
    }

    const UPDATED_PET = async (data: FormData, api_token?: string) => {
        KeyboardDismiss() // Hide keyboard
        toggleLoading(true)
        try {
            const response = await UPDATED_PET_PROFILE(data, api_token)
            const res = await getDataFromStatus(response) as AuthContextType
            toggleLoading(false)
            if (res?.user) setDataUser(res.user)
            return res
        } catch (error) {
            toggleLoading(false)
        }
    }


    return { login, register, get_profile, UPDATED_USER, CHANGE_PASSWORD, UPDATED_PET }
}

export default useAuth