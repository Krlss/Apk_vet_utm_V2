import React from 'react'
import PhotoStep from '@src/assets/icon/photo-step.svg'
import {IconProps} from '@src/types/declare'

const PhotoStepIcon = (props: IconProps) => {
  return (
    <PhotoStep width={props.width} height={props.height} fill={props.fill} />
  )
}

export default PhotoStepIcon
