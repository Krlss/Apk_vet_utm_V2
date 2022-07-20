import React from 'react'
import {View, TouchableOpacity} from 'react-native'
import {InputFloatingLabel} from '@src/components'
import AppStyles from '@src/themes/AppStyles'

interface Props {
  label: string
  editable?: boolean
  value?: string
  children?: JSX.Element
  onPress?: () => void
  disabled?: boolean
  [key: string]: any
}

const InputFloatingWithIconRight = ({
  label,
  editable,
  children,
  onPress,
  value,
  disabled,
  ...props
}: Props) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <InputFloatingLabel
        editable={editable}
        value={value}
        label={label}
        {...props}
      />
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        style={{
          backgroundColor: AppStyles.color.yellow,
          height: AppStyles.inputHeight.default,
          opacity: disabled ? 0.5 : 1,
          marginLeft: 10,
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 10,
          borderRadius: 10,
          marginTop: 15,
        }}>
        {children}
      </TouchableOpacity>
    </View>
  )
}

export default InputFloatingWithIconRight
