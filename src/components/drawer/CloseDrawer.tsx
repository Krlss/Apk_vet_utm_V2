import React from 'react'

import {DrawerContentComponentProps} from '@react-navigation/drawer'

import {View, TouchableOpacity, Text} from 'react-native'

import AppStyles from '@src/themes/AppStyles'
import Cross from '@src/components/icons/Cross'
import NameApplication from '../images/NameApplication'

const CloseDrawer = ({navigation}: DrawerContentComponentProps) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        marginBottom: 10,
      }}>
      <NameApplication />
      <TouchableOpacity onPress={() => navigation.closeDrawer()}>
        <Cross fill={AppStyles.color.gray} height={15} width={15} />
      </TouchableOpacity>
    </View>
  )
}

export default CloseDrawer
