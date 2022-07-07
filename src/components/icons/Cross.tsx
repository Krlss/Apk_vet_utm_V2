import React from 'react'
import Cross from '@src/assets/icon/cross.svg'
import {IconProps} from '@src/types/declare'

const CrossIcon = (props: IconProps) => {
  return <Cross width={props.width} height={props.height} fill={props.fill} />
}

export default CrossIcon
