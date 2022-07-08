import React from 'react'
import {View, Text, TouchableOpacity, Image} from 'react-native'
import MenuHomeIcon from '@src/components/icons/MenuHome'
import {DrawerHeaderProps} from '@react-navigation/drawer'
import AppStyles from '@src/themes/AppStyles'
import {getHeaderTitle} from '@react-navigation/elements'

interface Props extends DrawerHeaderProps {}

const Header = ({options, route, navigation}: Props) => {
  const title = getHeaderTitle(options, route.name)

  return (
    <View
      style={{
        flexDirection: 'row',
        paddingVertical: 20,
        paddingHorizontal: 20,
        alignItems: 'center',
        backgroundColor: AppStyles.color.white,
      }}>
      <TouchableOpacity
        onPress={navigation.openDrawer}
        style={{
          borderColor: AppStyles.color.gray,
          borderWidth: 1,
          padding: 8,
          borderRadius: 8,
          alignContent: 'center',
          alignItems: 'center',
        }}>
        <MenuHomeIcon height={20} width={20} fill={AppStyles.color.gray} />
      </TouchableOpacity>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            color: 'black',
            fontSize: 20,
            fontWeight: 'bold',
          }}>
          {title}
        </Text>
      </View>
      <Image
        source={require('@src/assets/img/icon.png')}
        style={{width: 40, height: 40}}
      />
    </View>
  )
}

export default Header
