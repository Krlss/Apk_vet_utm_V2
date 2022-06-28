import {TouchableOpacity, Text, StyleSheet} from 'react-native'
import React from 'react'
import AppStyles from '@src/themes/AppStyles'

interface Props {
  onPress: () => void
  text: string
}

const LongButton = ({onPress, text}: Props) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: AppStyles.font.size.large,
    color: AppStyles.color.white,
    fontWeight: '700',
    fontFamily: AppStyles.fontFamily.default,
  },
  button: {
    width: '100%',
    height: AppStyles.inputHeight.medium,
    backgroundColor: AppStyles.color.low_gray,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: AppStyles.borderRadius.default,
    marginTop: AppStyles.margin.large,
  },
})

export default LongButton
