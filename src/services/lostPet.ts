import { api_url_default } from '@src/constants/globals'
import { LAuth, RAuth, AuthContextType, Response } from '@src/types/declare'

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}

export const GET_ALL_SPECIES_WITH_PETS = async () => {
    const response = await fetch(api_url_default + 'petsLost', { method: 'GET', headers })
    return response;
}; 