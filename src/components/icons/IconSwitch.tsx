import React from 'react'
import HomeIcon from './Home'
import ReportIcon from './Report'
import Map from './Map'
import Logout from './Logout'
import SearchIcon from './Search'
import PhotoSteep from './PhotoSteep'
import PetStep from './PetStep'
import UserStep from './UserStep'
import LoginIcon from './Login'
import SignupIcon from './Signup'
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
    case 'user-step':
      return (
        <UserStep
          width={24}
          height={24}
          fill={active ? '#fff' : '#000'}
          active={active}
          {...props}
        />
      )
    case 'pet-step':
      return (
        <PetStep
          width={24}
          height={24}
          fill={active ? '#fff' : '#000'}
          active={active}
          {...props}
        />
      )
    case 'login':
      return (
        <LoginIcon
          width={24}
          height={24}
          fill={active ? '#fff' : '#000'}
          active={active}
          {...props}
        />
      )
    case 'signup':
      return (
        <SignupIcon
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
