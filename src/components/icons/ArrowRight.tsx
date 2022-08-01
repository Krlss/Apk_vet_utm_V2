import React from 'react'
import ArrowRight from '@src/assets/icon/arrow-right.svg'
import {IconProps} from '@src/types/declare'

const ArrowRightIcon = (props: IconProps) => {
  return (
    <ArrowRight width={props.width} height={props.height} fill={props.fill} />
  )
}

export default ArrowRightIcon
