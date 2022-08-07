import React from 'react'
import RowDelete from '@src/assets/icon/ci_delete.svg'
import {IconProps} from '@src/types/declare'

const RowDeleteIcon = (props: IconProps) => {
  return (
    <RowDelete width={props.width} height={props.height} fill={props.fill} />
  )
}

export default RowDeleteIcon
