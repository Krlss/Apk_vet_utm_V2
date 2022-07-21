import { api_url_default } from '@src/constants/globals'

const headers = {
    'Content-Type': 'multipart/form-data',
}

export const ReportUnknown = async (data: FormData) => {
    const response = await fetch(api_url_default + 'upload/petUnknown', { method: 'POST', headers, body: data })
    return response;
}

export const ReportKnown = async (data: FormData) => {
    const response = await fetch(api_url_default + 'reportPet', { method: 'POST', headers, body: data })
    return response;
}