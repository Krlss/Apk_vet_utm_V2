import React, {useEffect} from 'react'
import ConfigProvider from '@src/contexts/config/ConfigProvider'
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
    background: AppStyles.color.bg_low_gray,
  },
}

const Application = () => {
  useEffect(() => {
    SplashScreen.hide()
  }, [])
  return (
    <ConfigProvider>
      <NavigationContainer theme={MyTheme}>
        <StackAuth />
      </NavigationContainer>
      <Toast config={toastConfig} />
    </ConfigProvider>
  )
}
export default Application
