import React from 'react'
import HomeFill from '@src/assets/icon/home-fill.svg'
import {IconProps} from '@src/types/declare'

const HomeIcon = (props: IconProps) => {
  return (
    <HomeFill width={props.width} height={props.height} fill={props.fill} />
  )
}

export default HomeIcon
