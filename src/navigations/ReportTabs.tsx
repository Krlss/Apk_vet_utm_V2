import React from 'react'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Known from '@src/pages/app/report/Known'
import Unknown from '@src/pages/app/report/Unknown'
import AppStyles from '@src/themes/AppStyles'
import Photos from '@src/components/photos/Photos'
import ReportProvider from '@src/contexts/report/ReportProvider'

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

const ReportTabs = () => {
  return (
    <ReportProvider>
      <Tab.Navigator
        keyboardDismissMode="on-drag"
        screenOptions={{
          tabBarIndicatorContainerStyle: {
            backgroundColor: AppStyles.color.bg_low_gray,
          },
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
          name="Known"
          options={{
            tabBarLabel: 'Conocida',
            tabBarIndicatorStyle: {
              backgroundColor: AppStyles.color.yellow,
            },
          }}
          component={Known}
        />
      </Tab.Navigator>
    </ReportProvider>
  )
}

export default ReportTabs
