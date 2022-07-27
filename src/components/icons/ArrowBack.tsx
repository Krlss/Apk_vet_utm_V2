import React from 'react'
import ArrowBack from '@src/assets/icon/arrow-back.svg'
import {IconProps} from '@src/types/declare'

const ArrowBackIcon = (props: IconProps) => {
  return (
    <ArrowBack width={props.width} height={props.height} fill={props.fill} />
  )
}

export default ArrowBackIcon
