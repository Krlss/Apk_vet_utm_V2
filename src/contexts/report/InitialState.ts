import React from "react"

import { ReportContextType } from '@src/types/declare'

const InitialState: ReportContextType = {
    user: undefined,
    pet: undefined,
    location: {
        latitude: -1.0523174,
        longitude: -80.4588391,
        latitudeDelta: 1,
        longitudeDelta: 1,
    },
    images: []
}

export default InitialState