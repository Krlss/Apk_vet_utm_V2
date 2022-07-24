import React, {useContext} from 'react'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Known from '@src/pages/app/report/Known'
import Unknown from '@src/pages/app/report/Unknown'
import AppStyles from '@src/themes/AppStyles'
import Photos from '@src/components/photos/Photos'
import ReportProvider from '@src/contexts/report/ReportProvider'
import ConfigContext from '@src/contexts/config/ConfigContext'
const Tab = createMaterialTopTabNavigator()
const Stack = createNativeStackNavigator()

const UnknownStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'fade_from_bottom',
      }}>
      <Stack.Screen name="Unknown" component={Unknown} />
      <Stack.Screen name="Photos" component={Photos} />
    </Stack.Navigator>
  )
}
const KnownStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'fade_from_bottom',
      }}>
      <Stack.Screen name="Known" component={Known} />
      <Stack.Screen name="Photos_" component={Photos} />
    </Stack.Navigator>
  )
}

const ReportTabs = () => {
  const {ConfigState} = useContext(ConfigContext)
  return (
    <ReportProvider>
      <Tab.Navigator
        keyboardDismissMode="on-drag"
        screenOptions={{
          tabBarIndicatorContainerStyle: {
            backgroundColor: AppStyles.color.bg_low_gray,
          },
          swipeEnabled: !ConfigState.loading,
        }}>
        <Tab.Screen
          name="UnknownStack"
          options={{
            tabBarLabel: 'Desconocida',
            tabBarIndicatorStyle: {
              backgroundColor: AppStyles.color.yellow,
            },
          }}
          component={UnknownStack}
        />
        <Tab.Screen
          name="KnownStack"
          options={{
            tabBarLabel: 'Conocida',
            tabBarIndicatorStyle: {
              backgroundColor: AppStyles.color.yellow,
            },
          }}
          component={KnownStack}
        />
      </Tab.Navigator>
    </ReportProvider>
  )
}

export default ReportTabs
