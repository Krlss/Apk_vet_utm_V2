import React, {useContext} from 'react'
import {View, Text} from 'react-native'
import animationFloatingLabelInput from '@src/animations/animationFloatingLabelInput'
import ShowOrHiddenPassword from './ShowOrHiddenPassword'
import Animated from 'react-native-reanimated'
import ConfigContext from '@src/contexts/config/ConfigContext'
import Input from './Input'
import AppStyles from '@src/themes/AppStyles'
interface FloatingLabelInputProps {
  label: string
  value?: string
  /** if exist error validation */
  error?: string
  /** password input */
  secureTextEntry?: boolean
  onChange?: (text: string) => void
  [x: string]: any
}

/**
 * Input with floating label
 * @param label
 * @param value
 * @param error
 * @param secureTextEntry
 * @param onChange
 * @returns JSX.Element Input with floating label
 */

const FloatingLabelInput = ({
  label,
  value,
  error,
  secureTextEntry,
  onChange,
  ...props
}: FloatingLabelInputProps) => {
  const {animatedLabel, setIsFocused, styles, setShow, show, setIsBlur} =
    animationFloatingLabelInput(value, error, secureTextEntry)
  const {ConfigState} = useContext(ConfigContext)

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.label, animatedLabel]}>
        {label}
      </Animated.Text>
      <Input
        style={styles.input}
        onFocus={() => {
          setIsFocused(true)
          setIsBlur(false)
        }}
        onBlur={() => {
          setIsFocused(value ? true : false)
          setIsBlur(true)
        }}
        value={value}
        onChangeText={onChange}
        key={label}
        secureTextEntry={secureTextEntry && (!show || ConfigState.loading)}
        {...props}
      />
      {secureTextEntry && (
        <ShowOrHiddenPassword
          show={show && !ConfigState.loading}
          onPress={() => setShow(!show)}
        />
      )}
    </View>
  )
}

export default FloatingLabelInput
