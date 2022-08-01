import { api_url_default } from '@src/constants/globals'
import { user, Response } from '@src/types/declare'

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}

export const UPDATED_USER_PROFILE = async (data: user, token?: string) => {
    const response = await fetch(api_url_default + 'updatedUser', { method: 'PUT', headers: { ...headers, 'Authorization': token ?? '' }, body: JSON.stringify(data) })
    return response;
};


export const GET_USER_PROFILE = async (user_id?: string, token?: string) => {
    const response = await fetch(api_url_default + 'users/' + user_id, { method: 'GET', headers: { ...headers, 'Authorization': token ?? '' } })
    return response;
}

export const UPDATED_PASSWORD = async (data: user, token?: string) => {
    const response = await fetch(api_url_default + 'updatedPassword', { method: 'PUT', headers: { ...headers, 'Authorization': token ?? '' }, body: JSON.stringify(data) })
    return response;
}