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
      iconConfig.name = 'user-step'
      break
    case 1:
      iconConfig.name = 'pet-step'
      break
    case 2:
      iconConfig.name = 'photo'
      break
    case 3:
      iconConfig.name = 'map'
      break
    default:
      iconConfig.name = 'Home'
      break
  }
  return iconConfig
}

const renderStepIndicatorknown = (params: any) => (
  <IconSwitch {...getStepIndicatorIconConfig(params)} />
)

export default renderStepIndicatorknown
