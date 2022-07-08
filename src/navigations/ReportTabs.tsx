import React from 'react'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import Known from '@src/pages/app/report/Known'
import Unknown from '@src/pages/app/report/Unknown'
import AppStyles from '@src/themes/AppStyles'
const Tab = createMaterialTopTabNavigator()

const ReportTabs = () => {
  return (
    <Tab.Navigator
      keyboardDismissMode="on-drag"
      screenOptions={{
        tabBarIndicatorContainerStyle: {
          backgroundColor: AppStyles.color.bg_low_gray,
        },
      }}>
      <Tab.Screen
        name="Unknown"
        component={Unknown}
        options={{
          tabBarLabel: 'Desconocida',
          tabBarIndicatorStyle: {
            backgroundColor: AppStyles.color.yellow,
          },
        }}
      />
      <Tab.Screen
        name="Known"
        component={Known}
        options={{
          tabBarLabel: 'Conocida',
          tabBarIndicatorStyle: {
            backgroundColor: AppStyles.color.yellow,
          },
        }}
      />
    </Tab.Navigator>
  )
}

export default ReportTabs
