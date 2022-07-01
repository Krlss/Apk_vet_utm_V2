import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native'
import React, {useContext} from 'react'
import AppStyles from '@src/themes/AppStyles'
import ConfigContext from '@src/contexts/config/ConfigContext'

interface Props {
  onPress: () => void
  /** Text for Button */
  text: string
  /** is valid only  */
  isValid: boolean
  [x: string]: any
}

/**
 * Button with text and validation
 * @param opPress
 * @param text
 * @param isValid
 * @returns JSX.Element Button
 */
const LongButton = ({onPress, text, isValid}: Props) => {
  const {ConfigState} = useContext(ConfigContext)
  const styles = ThisStyles(isValid, ConfigState.loading)
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      disabled={!isValid || ConfigState.loading}>
      <Text style={styles.text}>
        {ConfigState.loading ? 'CARGANDO ' : text}
      </Text>
      {ConfigState.loading && (
        <ActivityIndicator size="small" color={AppStyles.color.black} />
      )}
    </TouchableOpacity>
  )
}

const ThisStyles = (isValid: boolean, loading?: boolean) =>
  StyleSheet.create({
    text: {
      fontSize: AppStyles.font.size.large,
      color: AppStyles.color.black,
      fontWeight: 'bold',
      fontFamily: AppStyles.fontFamily.default,
    },
    button: {
      width: '100%',
      height: AppStyles.inputHeight.medium,
      flexDirection: 'row',
      backgroundColor: AppStyles.color.yellow,
      opacity: isValid && !loading ? 1 : 0.5,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: AppStyles.borderRadius.default,
      marginTop: AppStyles.margin.large,
    },
  })

export default LongButton
