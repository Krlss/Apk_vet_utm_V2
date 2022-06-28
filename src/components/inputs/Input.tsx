import React from 'react'
import {TextInput, StyleSheet} from 'react-native'
import AppStyles from '@src/themes/AppStyles'

interface InputProps {
  style?: {}
  [x: string]: any
}
/**
 * @param style if exist
 * @returns JSX.Element Input
 */
const Input = ({style = {}, ...props}: InputProps) => {
  const inputStyles = [styles.input, style]
  return (
    <TextInput
      style={inputStyles}
      autoCapitalize="none"
      autoCorrect={false}
      {...props}
    />
  )
}

const styles = StyleSheet.create({
  input: {
    width: '100%',
    height: AppStyles.inputHeight.default,
    borderWidth: 1,
    borderRadius: AppStyles.inputBorderRadius.default,
    fontSize: AppStyles.font.size.medium,
    color: AppStyles.color.gray,
    borderColor: AppStyles.color.low_gray,
  },
})

export default Input
