import React from 'react'
import Pet from '@src/assets/icon/pet-step.svg'
import {IconProps} from '@src/types/declare'

const PetStepIcon = (props: IconProps) => {
  return <Pet width={props.width} height={props.height} fill={props.fill} />
}

export default PetStepIcon
