import {View, Text, StyleSheet} from 'react-native'
import React from 'react'
import AppStyles from '@src/themes/AppStyles'

const FooterUTM = () => {
  return (
    <View style={styles.footer}>
      <Text style={styles.footer_text}>
        © 2022 Facultad de Ciencias Informáticas.
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  footer: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer_text: {
    fontSize: AppStyles.font.size.small,
    color: AppStyles.color.gray,
    fontFamily: AppStyles.fontFamily.default,
  },
})

export default FooterUTM
