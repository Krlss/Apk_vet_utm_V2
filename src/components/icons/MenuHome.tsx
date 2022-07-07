import React from 'react'
import MenuHome from '@src/assets/icon/MenuHome.svg'
import {IconProps} from '@src/types/declare'

const MenuHomeIcon = (props: IconProps) => {
  return (
    <MenuHome width={props.width} height={props.height} fill={props.fill} />
  )
}

export default MenuHomeIcon
