import { api_url_default } from '@src/constants/globals'
import { pet, Response } from '@src/types/declare'

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}

export const UPDATED_PET_PROFILE = async (data: pet, token?: string) => {
    const response = await fetch(api_url_default + 'updatedPet', { method: 'PUT', headers: { ...headers, 'Authorization': token ?? '' }, body: JSON.stringify(data) })
    return response;
}; 