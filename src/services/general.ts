import { api_url_default } from '@src/constants/globals'

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}

export const SELECTS = async () => {
    const response = await fetch(api_url_default + 'selects', { method: 'GET', headers })
    return response;
}; 
