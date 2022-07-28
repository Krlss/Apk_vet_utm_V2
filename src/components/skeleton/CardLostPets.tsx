import React from 'react'
import {View, Text, Dimensions} from 'react-native'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'

const CardLostPetSkeleton = () => {
  const {width} = Dimensions.get('window')
  return (
    <SkeletonPlaceholder speed={1000}>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <View
          style={{
            width: width / 2 - 35,
            height: 285,
            marginRight: 10,
            borderRadius: 10,
            margin: 10,
          }}
        />
        <View
          style={{
            width: width / 2 - 35,
            height: 285,
            marginRight: 10,
            borderRadius: 10,
            margin: 10,
          }}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <View
          style={{
            width: width / 2 - 35,
            height: 285,
            marginRight: 10,
            borderRadius: 10,
            margin: 10,
          }}
        />
        <View
          style={{
            width: width / 2 - 35,
            height: 285,
            marginRight: 10,
            borderRadius: 10,
            margin: 10,
          }}
        />
      </View>

      <View
        style={{
          flexDirection: 'row',
        }}>
        <View
          style={{
            width: width / 2 - 35,
            height: 285,
            marginRight: 10,
            borderRadius: 10,
            margin: 10,
          }}
        />
        <View
          style={{
            width: width / 2 - 35,
            height: 285,
            marginRight: 10,
            borderRadius: 10,
            margin: 10,
          }}
        />
      </View>
    </SkeletonPlaceholder>
  )
}

export default CardLostPetSkeleton
