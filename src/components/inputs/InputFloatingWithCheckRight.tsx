import React from 'react'
import {View} from 'react-native'
import {InputFloatingLabel} from '@src/components'
import AppStyles from '@src/themes/AppStyles'
import Checkbox from 'react-native-bouncy-checkbox'
interface Props {
  label: string
  editable?: boolean
  value?: boolean
  children?: JSX.Element
  onPress?: (value: boolean) => void
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
      <Checkbox isChecked={false} onPress={onPress} />
    </View>
  )
}

export default InputFloatingWithCheckRight
