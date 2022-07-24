import React from 'react'
import {View, useWindowDimensions, Animated} from 'react-native'
import AppStyles from '@src/themes/AppStyles'

const PhotosReportsPaginator = ({
  data,
  scrollX,
  currentIndex,
}: {
  data: any[]
  scrollX: Animated.Value
  currentIndex: number
}) => {
  const {width} = useWindowDimensions()
  return (
    <View
      style={{
        position: 'absolute',
        bottom: 40,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
      }}>
      {data.map((item, index) => {
        const inputRange = [
          (index - 1) * width,
          index * width,
          (index + 1) * width,
        ]
        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [10, 20, 10],
          extrapolate: 'clamp',
        })
        return (
          <Animated.View
            key={index.toString()}
            style={[
              {
                height: 10,
                borderRadius: 5,
                backgroundColor:
                  currentIndex === index
                    ? AppStyles.color.yellow
                    : AppStyles.color.gray,
                marginHorizontal: 5,
              },
              {width: dotWidth},
            ]}
          />
        )
      })}
    </View>
  )
}

export default PhotosReportsPaginator
