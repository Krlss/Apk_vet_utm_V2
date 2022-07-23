import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Home from '@src/pages/app/home'
import PetDetailLost from '@src/pages/app/pet/detail_pet_lost'
import {HomeStackProps} from '@src/types/declare'
import Header from '@src/components/headers/Header'

const Stack = createNativeStackNavigator<HomeStackProps>()

const StackAuth = (route: any) => {
  console.log(route)
  return (
    <Stack.Navigator
      screenOptions={{
        animation: 'slide_from_right',
      }}>
      <Stack.Screen
        name="HOME"
        component={Home}
        options={{
          title: 'INICIO',
          header: props => <Header {...props} />,
        }}
      />
      <Stack.Screen
        name="PET_DETAIL"
        component={PetDetailLost}
        options={{headerTransparent: true, title: ''}}
      />
    </Stack.Navigator>
  )
}
export default StackAuth
