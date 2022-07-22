import React from 'react'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'

const LabelHomeSkeleton = () => {
  return (
    <SkeletonPlaceholder speed={1000}>
      <SkeletonPlaceholder.Item
        width={200}
        height={25}
        borderRadius={10}
        marginVertical={10}
        marginLeft={20}
      />
    </SkeletonPlaceholder>
  )
}

export default LabelHomeSkeleton
