import React, {useContext} from 'react'
import {View} from 'react-native'
import {createDrawerNavigator} from '@react-navigation/drawer'

import StackHome from '@src/navigations/StackHome'
import AppStyles from '@src/themes/AppStyles'
import CustomDrawerContent from './content/CustomDrawerContent'

import {HomeDrawerProps} from '@src/types/declare'
import Header from '@src/components/headers/Header'
import ReportTabs from './ReportTabs'
import ConfigContext from '@src/contexts/config/ConfigContext'

const Drawer = createDrawerNavigator<HomeDrawerProps>()

const CustomDrawer = () => {
  const {ConfigState} = useContext(ConfigContext)
  return (
    <View style={{flex: 1, backgroundColor: AppStyles.color.bg_low_gray}}>
      <Drawer.Navigator
        initialRouteName="HOME_STACK"
        drawerContent={props => {
          return <CustomDrawerContent {...props} />
        }}
        screenOptions={{
          drawerType: 'slide',
          overlayColor: AppStyles.color.transparent,
          drawerStyle: {
            width: '65%',
            backgroundColor: AppStyles.color.transparent,
          },
          sceneContainerStyle: {
            backgroundColor: AppStyles.color.transparent,
          },
          header: props => <Header {...props} />,
          gestureHandlerProps: {
            enabled: !ConfigState.loading,
          },
        }}>
        <Drawer.Screen
          name="HOME_STACK"
          options={{headerShown: false}}
          component={StackHome}
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
