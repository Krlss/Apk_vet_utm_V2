import { api_url_default } from '@src/constants/globals'
import { LAuth, AuthContextType } from '@src/types/declare'

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}

export const LOGIN = async ({ email, password }: LAuth) => {
    const response = await fetch(api_url_default + 'login', { method: 'POST', headers, body: JSON.stringify({ email, password }) })
    const data = await response.json() as AuthContextType
    return data;
};