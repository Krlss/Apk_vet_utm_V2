import React from 'react'
import {View, Text, Image, StyleSheet} from 'react-native'
import AppStyles from '@src/themes/AppStyles'

const LogoSmallWithName = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>FindPets</Text>
      <Image
        source={require('@src/assets/img/icon.png')}
        style={styles.image}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  image: {
    width: 40,
    height: 40,
    marginTop: 5,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: AppStyles.color.yellow,
  },
})

export default LogoSmallWithName
