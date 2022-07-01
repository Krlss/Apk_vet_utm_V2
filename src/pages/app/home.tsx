import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import HomeHeader from '@src/components/headers/Home'
import InputButton from '@src/components/inputs/InputButton'
import AppStyles from '@src/themes/AppStyles'
const Home = () => {
  return (
    <>
      <HomeHeader />
      <View style={styles.container}></View>
      <InputButton />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    backgroundColor: '#fff',
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    paddingHorizontal: 20,
  },
  input: {
    width: '100%',
    borderWidth: 0,
    color: '#000',
    textAlign: 'center',
    borderRadius: 15,
    fontSize: AppStyles.font.size.medium,
    backgroundColor: AppStyles.color.default_bg,
    marginBottom: 10,
  },
})

export default Home
