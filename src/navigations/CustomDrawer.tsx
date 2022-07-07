import React from 'react'
import {View, useWindowDimensions} from 'react-native'
import {createDrawerNavigator} from '@react-navigation/drawer'

import Home from '@src/pages/app/home'
import Report from '@src/pages/app/report'
import AppStyles from '@src/themes/AppStyles'
import CustomDrawerContent from './content/CustomDrawerContent'

import {HomeDrawerProps} from '@src/types/declare'
import Header from '@src/components/headers/Header'

const Drawer = createDrawerNavigator<HomeDrawerProps>()

const CustomDrawer = () => {
  const {width} = useWindowDimensions()
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
          swipeEdgeWidth: width * 0.5,
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
          component={Report}
          options={{
            title: 'REPORTE',
          }}
        />
      </Drawer.Navigator>
    </View>
  )
}

export default CustomDrawer
