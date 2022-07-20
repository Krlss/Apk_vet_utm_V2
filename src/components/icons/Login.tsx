import React from 'react'
import Login from '@src/assets/icon/login.svg'
import {IconProps} from '@src/types/declare'

const LoginIcon = (props: IconProps) => {
  return <Login width={props.width} height={props.height} fill={props.fill} />
}

export default LoginIcon
