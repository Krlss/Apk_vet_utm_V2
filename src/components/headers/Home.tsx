import React from 'react'
import {View, StyleSheet, TouchableWithoutFeedback} from 'react-native'
import AppStyles from '@src/themes/AppStyles'
import MenuHome from '@src/assets/icon/menu-home.svg'
import LogoSmallWithName from '../images/LogoSmallWithName'
const HomeHeader = () => {
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback>
        <MenuHome
          width={23}
          height={17}
          style={styles.icon}
          fill={AppStyles.color.black}
        />
      </TouchableWithoutFeedback>
      <LogoSmallWithName />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  icon: {
    position: 'absolute',
    left: 25,
    top: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default HomeHeader
