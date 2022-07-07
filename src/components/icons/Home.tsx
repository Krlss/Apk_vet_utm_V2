import React from 'react'
import Home from '@src/assets/icon/home.svg'
import HomeFill from '@src/assets/icon/home-fill.svg'
import {IconProps} from '@src/types/declare'

const HomeIcon = (props: IconProps) => {
  return props.active ? (
    <HomeFill width={props.width} height={props.height} fill={props.fill} />
  ) : (
    <Home width={props.width} height={props.height} fill={props.fill} />
  )
}

export default HomeIcon
