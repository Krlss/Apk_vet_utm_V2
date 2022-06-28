import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import Logo from '@src/components/images/Logo'
import AppStyles from '@src/themes/AppStyles'

const LogoAndNameApp = () => {
  return (
    <View style={styles.container_header}>
      <Logo />
      <Text style={styles.text_logo}>FindsPets</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container_header: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: AppStyles.margin.xlarge,
  },
  text_logo: {
    fontSize: AppStyles.font.size.xlarge,
    fontWeight: 'bold',
    color: AppStyles.color.yellow,
    fontFamily: AppStyles.fontFamily.default,
    marginTop: AppStyles.margin.medium,
  },
})

export default LogoAndNameApp
