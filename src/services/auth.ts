import { api_url_default } from '@src/constants/globals'
import { LAuth, RAuth, AuthContextType, Response } from '@src/types/declare'

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}

export const LOGIN = async ({ email, password }: LAuth) => {
    const response = await fetch(api_url_default + 'login', { method: 'POST', headers, body: JSON.stringify({ email, password }) })
    const data = await response.json() as AuthContextType
    return data;
};

export const REGISTER = async ({ user_id, name, last_name1, last_name2, phone, email, password }: RAuth) => {
    const response = await fetch(api_url_default + 'register', { method: 'POST', headers, body: JSON.stringify({ user_id, name, last_name1, last_name2, phone, email, password }) })
    const data = await response.json() as Response
    return data;
}
