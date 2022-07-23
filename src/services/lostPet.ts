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

export const GET_NEXT_PAGE_PETS_LOST = async (url: string) => {
    const response = await fetch(url, { method: 'GET', headers })
    return response;
}

export const GET_ALL_PETS_LOST_BY_SPECIE = async (id: number) => {
    const response = await fetch(api_url_default + 'petsLostBySpecie/' + id, { method: 'GET', headers })
    return response;
}

export const GET_PETS_SEARCH = async (query: string) => {
    const response = await fetch(api_url_default + 'petsLost/search/' + query, { method: 'GET', headers })
    return response;
}