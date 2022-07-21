import React from 'react'
import {View, Switch} from 'react-native'
import {InputFloatingLabel} from '@src/components'
import AppStyles from '@src/themes/AppStyles'
interface Props {
  label: string
  editable?: boolean
  value?: boolean
  children?: JSX.Element
  onPress: (value: boolean) => void
  disabled?: boolean
  [key: string]: any
}

const InputFloatingWithCheckRight = ({
  label,
  editable,
  children,
  onPress,
  value,
  disabled,
  ...props
}: Props) => {
  const handlePress = (value: boolean) => {
    onPress(value)
  }
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <InputFloatingLabel
        editable={editable}
        value={value ? 'Si' : 'No'}
        label={label}
        {...props}
      />
      <Switch
        value={value}
        onValueChange={handlePress}
        style={{
          marginTop: 15,
        }}
        thumbColor={AppStyles.color.yellow}
        trackColor={{
          false: AppStyles.color.low_gray,
          true: AppStyles.color.yellow,
        }}
      />
    </View>
  )
}

export default InputFloatingWithCheckRight
