import React from 'react'
import {View} from 'react-native'
import {createDrawerNavigator} from '@react-navigation/drawer'

import Home from '@src/pages/app/home'
import AppStyles from '@src/themes/AppStyles'
import CustomDrawerContent from './content/CustomDrawerContent'

import {HomeDrawerProps} from '@src/types/declare'
import Header from '@src/components/headers/Header'
import ReportTabs from './ReportTabs'

const Drawer = createDrawerNavigator<HomeDrawerProps>()

const CustomDrawer = () => {
  return (
    <View style={{flex: 1, backgroundColor: AppStyles.color.bg_low_gray}}>
      <Drawer.Navigator
        initialRouteName="HOME"
        drawerContent={props => {
          return <CustomDrawerContent {...props} />
        }}
        screenOptions={{
          drawerType: 'slide',
          overlayColor: AppStyles.color.transparent,
          drawerStyle: {
            flex: 1,
            width: '65%',
            backgroundColor: AppStyles.color.transparent,
          },
          sceneContainerStyle: {
            backgroundColor: AppStyles.color.transparent,
          },
          header: props => <Header {...props} />,
        }}>
        <Drawer.Screen
          name="HOME"
          component={Home}
          options={{
            title: 'INICIO',
          }}
        />
        <Drawer.Screen
          name="REPORT"
          component={ReportTabs}
          options={{
            title: 'REPORTE',
          }}
        />
      </Drawer.Navigator>
    </View>
  )
}

export default CustomDrawer
