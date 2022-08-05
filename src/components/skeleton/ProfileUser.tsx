import React from 'react'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'
import {Dimensions, View} from 'react-native'
const ProfileUserSkeleton = () => {
  const {width} = Dimensions.get('window')
  return (
    <SkeletonPlaceholder speed={1000}>
      <View
        style={{
          width: width - 40,
          height: 65,
          borderRadius: 5,
          marginTop: 10,
          marginBottom: 5,
          marginHorizontal: 20,
        }}
      />
      <View
        style={{
          width: width - 40,
          height: 55,
          borderRadius: 5,
          marginVertical: 5,
          marginHorizontal: 20,
        }}
      />

      <View
        style={{
          width: width - 40,
          height: 55,
          borderRadius: 5,
          marginVertical: 5,
          marginHorizontal: 20,
        }}
      />

      <View
        style={{
          width: width - 40,
          height: 55,
          borderRadius: 5,
          marginVertical: 5,
          marginHorizontal: 20,
        }}
      />

      <View
        style={{
          width: width - 40,
          height: 55,
          borderRadius: 5,
          marginVertical: 5,
          marginHorizontal: 20,
        }}
      />

      <View
        style={{
          width: width - 40,
          height: 55,
          borderRadius: 5,
          marginVertical: 5,
          marginHorizontal: 20,
        }}
      />

      <View
        style={{
          width: width - 40,
          height: 40,
          borderRadius: 5,
          marginVertical: 5,
          marginHorizontal: 20,
        }}
      />
    </SkeletonPlaceholder>
  )
}

export default ProfileUserSkeleton
