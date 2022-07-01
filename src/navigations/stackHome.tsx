import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Home from '@src/pages/app/home'
import {HomeStackProps} from '@src/types/declare'

const Stack = createNativeStackNavigator<HomeStackProps>()

const StackHome = () => {
  return (
    <Stack.Navigator
      initialRouteName="HOME"
      screenOptions={{
        gestureEnabled: true,
        animation: 'slide_from_right',
      }}>
      <Stack.Screen
        name="HOME"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  )
}
export default StackHome
