import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Login from '@src/pages/auth/login'
import Register from '@src/pages/auth/register'
import {AuthStackProps} from '@src/types/declare'

const Stack = createNativeStackNavigator<AuthStackProps>()

const StackAuth = () => {
  return (
    <Stack.Navigator initialRouteName="LOGIN">
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
    </Stack.Navigator>
  )
}
export default StackAuth
