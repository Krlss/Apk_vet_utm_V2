import React from 'react'
import {BaseToast, ToastConfig} from 'react-native-toast-message'
import AppStyles from '@src/themes/AppStyles'
import {props} from '@src/types/declare'

export const toastConfig: ToastConfig = {
  success: (props: props) => (
    <BaseToast
      {...props}
      style={{borderLeftColor: AppStyles.color.success}}
      contentContainerStyle={{paddingHorizontal: 15}}
      text1Style={{
        fontSize: 15,
        fontWeight: '400',
      }}
      text2NumberOfLines={2}
    />
  ),
  info: (props: props) => (
    <BaseToast
      {...props}
      style={{borderLeftColor: AppStyles.color.info}}
      contentContainerStyle={{paddingHorizontal: 15}}
      text1Style={{
        fontSize: 15,
        fontWeight: '400',
      }}
      text2NumberOfLines={2}
    />
  ),
  error: (props: props) => (
    <BaseToast
      {...props}
      style={{borderLeftColor: AppStyles.color.error}}
      contentContainerStyle={{paddingHorizontal: 15}}
      text1Style={{
        fontSize: 15,
        fontWeight: '400',
      }}
      text2NumberOfLines={2}
    />
  ),
}
