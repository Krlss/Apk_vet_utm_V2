import { api_url_default } from '@src/constants/globals'
import { LAuth, RAuth, AuthContextType, Response } from '@src/types/declare'

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}

export const LOGIN = async ({ email, password }: LAuth) => {
    const response = await fetch(api_url_default + 'login', { method: 'POST', headers, body: JSON.stringify({ email, password }) })
    return response;
};

export const REGISTER = async ({ user_id, name, last_name1, last_name2, phone, email, password }: RAuth) => {
    const response = await fetch(api_url_default + 'register', { method: 'POST', headers, body: JSON.stringify({ user_id, name, last_name1, last_name2, phone, email, password }) })
    return response;
}

export const GET_USER_DATA = async ({ api_token, user_id }: { api_token: string, user_id: string }) => {
    api_token = api_token ? 'Bearer ' + api_token : ''
    const response = await fetch(api_url_default + 'users/' + user_id, { method: 'GET', headers: { ...headers, 'Authorization': api_token } })
    return response;
}
