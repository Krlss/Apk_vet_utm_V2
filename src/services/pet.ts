import { api_url_default } from '@src/constants/globals'
import { pet, Response } from '@src/types/declare'

const headers = {
    'Content-Type': 'multipart/form-data'
}


export const UPDATED_PET_PROFILE = async (data: FormData, token?: string) => {
    const response = await fetch(api_url_default + 'updatedPet', { method: 'POST', headers: { ...headers, 'Authorization': token ?? '' }, body: data })
    return response;
};