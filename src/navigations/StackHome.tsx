import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Home from '@src/pages/app/home'
import PetDetailLost from '@src/pages/app/pet/detail_pet_lost'
import {HomeStackProps} from '@src/types/declare'
import Header from '@src/components/headers/Header'
import MapPage from '@src/pages/app/maps/map_pet_lost'
import Photos from '@src/components/photos/Photos'
const Stack = createNativeStackNavigator<HomeStackProps>()

const StackAuth = () => {
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
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MAP_PET_LOST"
        component={MapPage}
        options={{
          headerTransparent: true,
          title: 'Ultima ubicación',
        }}
      />
      <Stack.Screen
        name="IMAGES"
        component={Photos}
        options={{headerTransparent: true, title: ''}}
      />
    </Stack.Navigator>
  )
}
export default StackAuth
