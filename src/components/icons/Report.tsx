import React from 'react'
import Report from '@src/assets/icon/report.svg'
import ReportFill from '@src/assets/icon/report-fill.svg'
import {IconProps} from '@src/types/declare'

const ReportIcon = (props: IconProps) => {
  return props.active ? (
    <ReportFill width={props.width} height={props.height} fill={props.fill} />
  ) : (
    <Report width={props.width} height={props.height} fill={props.fill} />
  )
}

export default ReportIcon
