import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import AppStyles from '@src/themes/AppStyles'

const NameApplication = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>FindPets</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 25,
    fontWeight: 'bold',
    color: AppStyles.color.yellow,
  },
})

export default NameApplication
