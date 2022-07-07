import React from 'react'
import Pin from '@src/assets/icon/pin.svg'
import {IconProps} from '@src/types/declare'

const PinIcon = (props: IconProps) => {
  return <Pin width={props.width} height={props.height} fill={props.fill} />
}

export default PinIcon
