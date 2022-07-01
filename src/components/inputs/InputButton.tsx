import React from 'react'
import {View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native'
import AppStyles from '@src/themes/AppStyles'
import PingButton from '@src/assets/icon/ping-button.svg'
const InputButton = () => {
  return (
    <View style={{flex: 1, backgroundColor: '#fff', paddingHorizontal: 20}}>
      <TouchableWithoutFeedback onPress={() => console.log('OnPress')}>
        <View style={styles.container}>
          <PingButton width={20} height={20} fill={AppStyles.color.gray} />
          <Text style={styles.text}>Ubicación</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: AppStyles.inputHeight.default,
    borderRadius: 10,
    backgroundColor: AppStyles.color.default_bg,
  },
  text: {
    fontSize: AppStyles.font.size.medium,
    fontWeight: 'bold',
    color: AppStyles.color.gray,
  },
})

export default InputButton
