import React from 'react'
import ConfigProvider from '@src/contexts/config/ConfigProvider'
import {NavigationContainer} from '@react-navigation/native'

import StackAuth from '@src/navigations/stackAuth'

const Application = () => {
  return (
    <ConfigProvider>
      <NavigationContainer>
        <StackAuth />
      </NavigationContainer>
    </ConfigProvider>
  )
}
export default Application
