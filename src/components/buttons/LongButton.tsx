import {TouchableOpacity, Text, StyleSheet} from 'react-native'
import React from 'react'
import AppStyles from '@src/themes/AppStyles'

interface Props {
  onPress: () => void
  /** Text for Button */
  text: string
  /** is valid only  */
  isValid: boolean
  [x: string]: any
  loading?: boolean
}

/**
 * Button with text and validation
 * @param opPress
 * @param text
 * @param isValid
 * @returns JSX.Element Button
 */
const LongButton = ({onPress, text, isValid, loading}: Props) => {
  const styles = ThisStyles(isValid, loading)

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      disabled={!isValid || loading}>
      <Text style={styles.text}>{loading ? 'Cargando...' : text}</Text>
    </TouchableOpacity>
  )
}

const ThisStyles = (isValid: boolean, loading?: boolean) =>
  StyleSheet.create({
    text: {
      fontSize: AppStyles.font.size.large,
      color:
        isValid && !loading ? AppStyles.color.black : AppStyles.color.white,
      fontWeight: 'bold',
      fontFamily: AppStyles.fontFamily.default,
    },
    button: {
      width: '100%',
      height: AppStyles.inputHeight.medium,
      backgroundColor:
        isValid && !loading ? AppStyles.color.yellow : AppStyles.color.low_gray,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: AppStyles.borderRadius.default,
      marginTop: AppStyles.margin.large,
    },
  })

export default LongButton
