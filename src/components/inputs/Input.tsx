import React, {useContext} from 'react'
import {TextInput, StyleSheet} from 'react-native'
import AppStyles from '@src/themes/AppStyles'
import ConfigContext from '@src/contexts/config/ConfigContext'
interface InputProps {
  style?: {}
  [x: string]: any
}
/**
 * @param style if exist
 * @returns JSX.Element Input
 */
const Input = ({style = {}, ...props}: InputProps) => {
  const {ConfigState} = useContext(ConfigContext)
  const inputStyles = [styles.input, style]
  return (
    <TextInput
      style={[inputStyles, ConfigState.loading && {opacity: 0.5}]}
      editable={!ConfigState.loading}
      selectTextOnFocus={!ConfigState.loading}
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
    color: AppStyles.color.black,
    borderColor: AppStyles.color.low_gray,
  },
})

export default Input
