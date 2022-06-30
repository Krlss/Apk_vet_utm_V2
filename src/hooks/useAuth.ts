import React, { useState } from 'react'
import { fetchState, LAuth } from '@src/types/declare'
import { LOGIN } from '@src/services/auth'
const useAuth = () => {

    const [fetchState, setFetchState] = useState<fetchState>()

    const login = async ({ email, password }: LAuth) => {
        setFetchState('loading')
        try {
            LOGIN({ email, password })
        } catch (error) {
            setFetchState('error')
        }
    }


    return { fetchState, login }
}

export default useAuth