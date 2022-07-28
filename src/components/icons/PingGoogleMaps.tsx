import React from 'react'
import PingGoogleMaps from '@src/assets/icon/logos_google-maps.svg'
import {IconProps} from '@src/types/declare'

const PingGoogleMapsIcon = (props: IconProps) => {
  return (
    <PingGoogleMaps
      width={props.width}
      height={props.height}
      fill={props.fill}
    />
  )
}

export default PingGoogleMapsIcon
