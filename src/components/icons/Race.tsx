import React from 'react'
import Race from '@src/assets/icon/race.svg'
import {IconProps} from '@src/types/declare'

const RaceIcon = (props: IconProps) => {
  return <Race width={props.width} height={props.height} fill={props.fill} />
}

export default RaceIcon
