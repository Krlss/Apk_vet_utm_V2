import React, {useContext} from 'react'
import {View, Text, TouchableWithoutFeedback} from 'react-native'
import ArrowRightIcon from '@src/components/icons/ArrowRight'
import ConfigContext from '@src/contexts/config/ConfigContext'

const InfoTouchables = ({
  onPress,
  title,
  value,
}: {
  onPress: () => void
  title: string
  value?: string
}) => {
  const {ConfigState} = useContext(ConfigContext)
  return (
    <TouchableWithoutFeedback disabled={ConfigState.loading} onPress={onPress}>
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
          <View style={{flex: 1}}>
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
