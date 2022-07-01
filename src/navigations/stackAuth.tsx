import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Login from '@src/pages/auth/login'
import Register from '@src/pages/auth/register'
import {AuthStackProps} from '@src/types/declare'
import StackHome from './stackHome'
const Stack = createNativeStackNavigator<AuthStackProps>()

const StackAuth = () => {
  return (
    <Stack.Navigator
      initialRouteName="LOGIN"
      screenOptions={{
        gestureEnabled: true,
        animation: 'slide_from_right',
      }}>
      <Stack.Screen
        name="LOGIN"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="REGISTER"
        component={Register}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="STACK_HOME"
        component={StackHome}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  )
}
export default StackAuth
