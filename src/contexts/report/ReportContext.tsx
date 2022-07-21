import {createContext} from 'react'

import {ReportContextType} from '@src/types/declare'

export type ReportContextProps = {
  ReportState: ReportContextType
  setUser: (user: ReportContextType['user']) => void
  setPet: (pet: ReportContextType['pet']) => void
  setLocation: (location: ReportContextType['location']) => void
  requestLocationPermission: () => void
}

const ReportContext = createContext<ReportContextProps>(
  {} as ReportContextProps,
)

export default ReportContext
