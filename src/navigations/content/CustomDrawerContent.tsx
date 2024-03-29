import React, {useContext} from 'react'

import {
  DrawerContentScrollView,
  DrawerContentComponentProps,
} from '@react-navigation/drawer'

import {View} from 'react-native'

import AppStyles from '@src/themes/AppStyles'
import CloseDrawer from '@src/components/drawer/CloseDrawer'
import ProfileDrawer from '@src/components/drawer/Profile'
import ContainerItemsDrawer from '@src/components/drawer/ContainerItems'
import ItemsDrawer from '@src/components/drawer/ItemsDrawer'
import AuthContext from '@src/contexts/auth/AuthContext'

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  const {AuthState, resetDataUser} = useContext(AuthContext)
  return (
    <DrawerContentScrollView
      scrollEnabled={true}
      contentContainerStyle={{flex: 1}}>
      <View style={{flex: 1, paddingHorizontal: AppStyles.padding.xlarge}}>
        {/* Close button */}
        <CloseDrawer {...props} />
        {/* Profile */}
        {AuthState?.user?.user_id ? <ProfileDrawer {...props} /> : null}
        {/* Container items */}
        <ContainerItemsDrawer>
          {/* Items */}
          <ItemsDrawer
            label="Inicio"
            nameIcon="home"
            active={props.state.index === 1}
            onPress={() => {
              props.navigation.navigate('HOME')
            }}
          />

          <ItemsDrawer
            label="Reporte"
            nameIcon="report"
            active={props.state.index === 2}
            onPress={() => {
              props.navigation.navigate('REPORT')
            }}
          />

          {/* separate line */}
          <View
            style={{
              height: 1,
              backgroundColor: AppStyles.color.low_gray,
              marginVertical: AppStyles.padding.small,
              marginHorizontal: AppStyles.padding.small,
            }}
          />
        </ContainerItemsDrawer>

        <View style={{marginBottom: 30}}>
          {AuthState?.user?.user_id ? (
            <ItemsDrawer
              label="Cerrar sesión"
              nameIcon="logout"
              active={false}
              onPress={() => {
                resetDataUser()
                props.navigation.closeDrawer()
                props.navigation.navigate('HOME')
              }}
            />
          ) : (
            <>
              <ItemsDrawer
                label="Iniciar Sesión"
                nameIcon="login"
                active={props.state.index === 3}
                onPress={() => {
                  props.navigation.navigate('LOGIN')
                }}
              />

              <ItemsDrawer
                label="Registrarse"
                nameIcon="signup"
                active={props.state.index === 4}
                onPress={() => {
                  props.navigation.navigate('REGISTER')
                }}
              />
            </>
          )}
        </View>
      </View>
    </DrawerContentScrollView>
  )
}

export default CustomDrawerContent
