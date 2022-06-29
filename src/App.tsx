import React from 'react'
import ConfigProvider from '@src/contexts/config/ConfigProvider'
import {NavigationContainer, DefaultTheme} from '@react-navigation/native'
import AppStyles from './themes/AppStyles'
import StackAuth from '@src/navigations/stackAuth'

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: AppStyles.color.bg_low_gray,
  },
}

const Application = () => {
  return (
    <ConfigProvider>
      <NavigationContainer theme={MyTheme}>
        <StackAuth />
      </NavigationContainer>
    </ConfigProvider>
  )
}
export default Application
