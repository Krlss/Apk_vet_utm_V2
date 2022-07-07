import React, {useContext} from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Login from '@src/pages/auth/login'
import Register from '@src/pages/auth/register'
import {AuthStackProps} from '@src/types/declare'
import CustomDrawer from './CustomDrawer'
import AuthContext from '@src/contexts/auth/AuthContext'
import Loading from '@src/components/splash/Loading'

const Stack = createNativeStackNavigator<AuthStackProps>()

const StackAuth = () => {
  const {AuthState, splashScreen} = useContext(AuthContext)
  return (
    <Stack.Navigator
      screenOptions={{
        animation: 'slide_from_right',
      }}>
      {splashScreen ? (
        <Stack.Screen
          name="LOADING"
          component={Loading}
          options={{headerShown: false}}
        />
      ) : AuthState.user.api_token ? (
        <Stack.Screen
          name="HOME_DRAWER"
          component={CustomDrawer}
          options={{headerShown: false}}
        />
      ) : (
        <>
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
            name="HOME_DRAWER"
            component={CustomDrawer}
            options={{headerShown: false}}
          />
        </>
      )}
    </Stack.Navigator>
  )
}
export default StackAuth
