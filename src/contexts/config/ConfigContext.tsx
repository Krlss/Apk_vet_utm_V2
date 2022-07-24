import {createContext} from 'react'

import {ConfigContextType, KeyboardType} from '@src/types/declare'

export type ConfigContextProps = {
  ConfigState: ConfigContextType
  toggleKeyboardStatus: (status: boolean) => void
  toggleKeyboard: (Keyboard: KeyboardType) => void
  KeyboardDismiss: () => void
  toggleLoading: (status: boolean) => void
  headerShown: (status: boolean) => void
}

const ConfigContext = createContext<ConfigContextProps>(
  {} as ConfigContextProps,
)

export default ConfigContext
