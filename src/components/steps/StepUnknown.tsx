import React from 'react'
import IconSwitch from '@src/components/icons/IconSwitch'

interface IProps {
  position: number
  stepStatus: string
}

const getStepIndicatorIconConfig = ({position, stepStatus}: IProps) => {
  const iconConfig = {
    name: 'feed',
    active: stepStatus === 'finished' ? true : false,
  }
  switch (position) {
    case 0:
      iconConfig.name = 'photo'
      break
    case 1:
      iconConfig.name = 'map'
      break
    default:
      iconConfig.name = 'Home'
      break
  }
  return iconConfig
}

const renderStepIndicatorUnknown = (params: any) => (
  <IconSwitch {...getStepIndicatorIconConfig(params)} />
)

export default renderStepIndicatorUnknown
