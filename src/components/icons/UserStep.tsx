import React from 'react'
import User from '@src/assets/icon/user-step.svg'
import {IconProps} from '@src/types/declare'

const UserStepIcon = (props: IconProps) => {
  return <User width={props.width} height={props.height} fill={props.fill} />
}

export default UserStepIcon
