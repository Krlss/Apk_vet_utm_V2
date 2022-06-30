import React from 'react'
import ToastApi from 'react-native-toast-message'
import {Response} from '@src/types/declare'
const Toast = (response: Response) => {
  ToastApi.show({
    type: response.type,
    text1: response.title,
    text2: response.message,
  })
}
export default Toast
