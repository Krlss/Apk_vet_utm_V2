import React from 'react'
import Map from '@src/assets/icon/map.svg'
import {IconProps} from '@src/types/declare'

const MapIcon = (props: IconProps) => {
  return <Map width={props.width} height={props.height} fill={props.fill} />
}

export default MapIcon
