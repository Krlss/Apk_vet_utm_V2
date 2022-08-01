import React from 'react'
import {View, Text, TouchableWithoutFeedback} from 'react-native'
import ArrowRightIcon from '@src/components/icons/ArrowRight'

const InfoTouchables = ({
  onPress,
  title,
  value,
}: {
  onPress: () => void
  title: string
  value?: string
}) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: 'white',
          paddingVertical: 10,
          paddingHorizontal: 17,
          borderRadius: 10,
          elevation: 1,
          marginTop: 10,
          marginHorizontal: 20,
        }}>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View>
            {value ? (
              <Text numberOfLines={1} style={{color: 'gray'}}>
                {value}
              </Text>
            ) : null}

            <Text style={{color: 'black', fontWeight: 'bold'}}>{title}</Text>
          </View>
          <ArrowRightIcon fill="black" width={20} height={20} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default InfoTouchables
