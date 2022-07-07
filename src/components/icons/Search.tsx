import React from 'react'
import Search from '@src/assets/icon/search.svg'
import {IconProps} from '@src/types/declare'

const SearchIcon = (props: IconProps) => {
  return <Search width={props.width} height={props.height} fill={props.fill} />
}

export default SearchIcon
