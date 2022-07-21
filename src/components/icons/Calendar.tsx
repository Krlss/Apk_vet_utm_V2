import React from 'react'
import Calendar from '@src/assets/icon/calendar-date.svg'
import {IconProps} from '@src/types/declare'

const CalendarIcon = (props: IconProps) => {
  return (
    <Calendar width={props.width} height={props.height} fill={props.fill} />
  )
}

export default CalendarIcon
