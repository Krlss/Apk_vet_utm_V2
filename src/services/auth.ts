import { api_url_default } from '@src/constants/globals'
import { LAuth } from '@src/types/declare'
import Toast from 'react-native-toast-message';
const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}

export const LOGIN = async ({ email, password }: LAuth) => {
    const response = await fetch(api_url_default + 'login', { method: 'POST', headers, body: JSON.stringify({ email, password }) })
    const data = await response.json()
    if (response.ok) {
        console.log({ data })
    } else {
        Toast.show({
            type: data.type,
            text1: data.title,
            text2: data.message,
        });
        console.log({ data })
    }
};