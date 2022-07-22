import React from 'react'
import {View} from 'react-native'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'

const SpeciesHomeSkeleton = () => {
  return (
    <SkeletonPlaceholder speed={1000}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingLeft: 20,
          paddingTop: 10,
        }}>
        <View
          style={{width: 120, height: 50, marginRight: 10, borderRadius: 10}}
        />
        <View
          style={{width: 130, height: 50, marginRight: 10, borderRadius: 10}}
        />
        <View
          style={{
            width: 120,
            height: 50,
            borderRadius: 10,
          }}
        />
      </View>
    </SkeletonPlaceholder>
  )
}

export default SpeciesHomeSkeleton
