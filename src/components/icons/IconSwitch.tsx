import React from 'react'
import HomeIcon from './Home'
import ReportIcon from './Report'
import Map from './Map'
import Logout from './Logout'
import SearchIcon from './Search'
import PhotoSteep from './PhotoSteep'
interface IconProps {
  name: string
  active?: boolean
  [x: string]: any
}

const IconSwitch = ({name, active, ...props}: IconProps) => {
  switch (name) {
    case 'home':
      return (
        <HomeIcon
          width={24}
          height={24}
          fill={active ? '#fff' : '#000'}
          active={active}
          {...props}
        />
      )
    case 'report':
      return (
        <ReportIcon
          width={24}
          height={24}
          fill={active ? '#fff' : '#000'}
          active={active}
          {...props}
        />
      )
    case 'map':
      return (
        <Map
          width={24}
          height={24}
          fill={active ? '#fff' : '#000'}
          active={active}
          {...props}
        />
      )
    case 'logout':
      return (
        <Logout
          width={24}
          height={24}
          fill={active ? '#fff' : '#000'}
          active={active}
          {...props}
        />
      )
    case 'search':
      return (
        <SearchIcon
          width={24}
          height={24}
          fill={active ? '#fff' : '#000'}
          active={active}
          {...props}
        />
      )
    case 'photo':
      return (
        <PhotoSteep
          width={24}
          height={24}
          fill={active ? '#fff' : '#000'}
          active={active}
          {...props}
        />
      )
    default:
      return (
        <HomeIcon
          width={24}
          height={24}
          fill={active ? '#fff' : '#000'}
          active={active}
          {...props}
        />
      )
  }
}

export default IconSwitch
