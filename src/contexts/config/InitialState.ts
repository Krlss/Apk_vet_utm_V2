import React from "react"

import { ConfigContextType } from '@src/types/declare'

const InitialState: ConfigContextType = {
    keyboardStatus: false,
    Keyboard: {} as any,
    loading: false,
    provinces: [],
    cantons: [],
    parishes: [],
    species: [],
    races: [],
    furs: []
}

export default InitialState