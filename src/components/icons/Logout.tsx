import React from 'react'
import Logout from '@src/assets/icon/logout.svg'
import {IconProps} from '@src/types/declare'

const LogoutIcon = (props: IconProps) => {
  return <Logout width={props.width} height={props.height} fill={props.fill} />
}

export default LogoutIcon
