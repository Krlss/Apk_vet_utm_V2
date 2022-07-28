import React from 'react'
import {View, Text} from 'react-native'

const CardsInfoPetLost = ({
  label,
  value,
  children,
}: {
  label: string
  value: string
  children?: React.ReactNode
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10,
        margin: 5,
        elevation: 1,
        flex: 1,
      }}>
      {children}
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'flex-start',
          flex: 1,
        }}>
        <Text numberOfLines={1} style={{color: 'black', fontWeight: 'bold'}}>
          {value}
        </Text>
        <Text style={{color: 'gray'}}>{label}</Text>
      </View>
    </View>
  )
}
export default CardsInfoPetLost
