import 'react-native-gesture-handler'
import React, {useEffect} from 'react'
import ConfigProvider from '@src/contexts/config/ConfigProvider'
import AuthProvider from '@src/contexts/auth/AuthProvider'
import {NavigationContainer, DefaultTheme} from '@react-navigation/native'
import AppStyles from './themes/AppStyles'
import StackAuth from '@src/navigations/stackAuth'
import SplashScreen from 'react-native-splash-screen'
import Toast from 'react-native-toast-message'
import {toastConfig} from '@src/components/toast/Custom'
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: AppStyles.color.white,
  },
}

const Application = () => {
  useEffect(() => {
    SplashScreen.hide()
  }, [])
  return (
    <ConfigProvider>
      <AuthProvider>
        <NavigationContainer theme={MyTheme}>
          <StackAuth />
        </NavigationContainer>
        <Toast config={toastConfig} />
      </AuthProvider>
    </ConfigProvider>
  )
}
export default Application
