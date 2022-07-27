import React from 'react'
import ImageExpand from '@src/assets/icon/image-expand.svg'
import {IconProps} from '@src/types/declare'

const ImageExpandIcon = (props: IconProps) => {
  return (
    <ImageExpand width={props.width} height={props.height} fill={props.fill} />
  )
}

export default ImageExpandIcon
