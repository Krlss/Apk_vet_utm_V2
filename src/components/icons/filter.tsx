import React from 'react'
import Filter from '@src/assets/icon/filter.svg'
import {IconProps} from '@src/types/declare'

const FilterIcon = (props: IconProps) => {
  return <Filter width={props.width} height={props.height} fill={props.fill} />
}

export default FilterIcon
