import React from 'react'
import Province from '@src/assets/icon/province.svg'
import {IconProps} from '@src/types/declare'

const ProvinceIcon = (props: IconProps) => {
  return (
    <Province width={props.width} height={props.height} fill={props.fill} />
  )
}

export default ProvinceIcon
