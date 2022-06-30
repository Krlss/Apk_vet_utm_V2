import React from "react"
import { AuthContextType } from '@src/types/declare'
const InitialState: AuthContextType = {
    user: {
        user_id: "",
        name: "",
        last_name1: "",
        last_name2: "",
        email: "",
        phone: "",
        email_verified_at: "",
        id_province: undefined,
        id_canton: undefined,
        id_parish: undefined,
        canton: undefined,
        province: undefined,
        parish: undefined,
        profile_photo_path: "",
        api_token: "",
        address_ref: "",
        main_street: "",
        street_1_sec: "",
        street_2_sec: "",
        pets: undefined,
    }
}

export default InitialState