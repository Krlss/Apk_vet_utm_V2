import React from 'react'
import {View, Text, TextInput} from 'react-native'
import Input from './Input'
import AppStyles from '@src/themes/AppStyles'
const InputNormal = ({
  onChangeText,
  value,
  placeholder,
  error,
}: {
  onChangeText: (text: string) => void
  value?: string
  placeholder: string
  error?: string
}) => {
  return (
    <View
      style={{
        marginVertical: 5,
      }}>
      <Input
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={value}
        style={{
          height: 40,
          paddingHorizontal: 10,
          backgroundColor: AppStyles.color.bg_low_gray,
          color: 'black',
          borderRadius: 10,
          borderColor: AppStyles.color.low_gray,
          borderWidth: 1,
        }}
        selectionColor={AppStyles.color.yellow}
        placeholderTextColor={AppStyles.color.gray}
      />
      {error && (
        <Text
          style={{
            color: AppStyles.color.error,
            fontSize: 12,
            marginTop: 5,
            marginHorizontal: 10,
          }}>
          {error}
        </Text>
      )}
    </View>
  )
}
export default InputNormal
