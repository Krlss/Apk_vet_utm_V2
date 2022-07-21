import React from 'react'
import Specie from '@src/assets/icon/specie.svg'
import {IconProps} from '@src/types/declare'

const SpecieIcon = (props: IconProps) => {
  return <Specie width={props.width} height={props.height} fill={props.fill} />
}

export default SpecieIcon
