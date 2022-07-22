import React from 'react'
import CrossLight from '@src/assets/icon/charm_cross.svg'
import {IconProps} from '@src/types/declare'

const CrossLightIcon = (props: IconProps) => {
  return (
    <CrossLight
      stroke={props.stroke}
      width={props.width}
      height={props.height}
      fill={props.fill}
    />
  )
}

export default CrossLightIcon
