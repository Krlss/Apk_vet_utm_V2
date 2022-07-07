import React, {useState} from 'react'
import {View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native'
import AppStyles from '@src/themes/AppStyles'
import PingButton from '@src/assets/icon/ping-button.svg'

interface InputButtonProps {
  onPress: () => void
  text: string
  style?: any
  textStyle?: any
  iconStyle?: any
  icon?: any
}

const InputButton = ({text, onPress}: InputButtonProps) => {
  return (
    <View style={{paddingHorizontal: 20}}>
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={styles.container}>
          <PingButton width={20} height={20} fill={AppStyles.color.gray} />
          <Text style={styles.text}>{text}</Text>
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
    borderColor: AppStyles.color.low_gray,
    borderWidth: 1,
    borderRadius: AppStyles.inputBorderRadius.default,
  },
  text: {
    fontSize: AppStyles.font.size.medium,
    fontWeight: '400',
    color: AppStyles.color.gray,
  },
})

export default InputButton
