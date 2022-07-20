import React from 'react'
import Signup from '@src/assets/icon/user-add.svg'
import {IconProps} from '@src/types/declare'

const SignupIcon = (props: IconProps) => {
  return <Signup width={props.width} height={props.height} fill={props.fill} />
}

export default SignupIcon
