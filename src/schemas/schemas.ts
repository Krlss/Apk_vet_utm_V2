import { object } from 'yup';
import {
    email, password, passwordRegex, fullname, phone, user_id, canton, parish, province,
    confirmPassword,
    name, specie, race, birth, sex, castrated
} from './validations'

export const loginSchema = object().shape({ email, password })
export const registerSchema = object().shape({ user_id, fullname, phone, email, password: passwordRegex })

export const KnownUserSchema = object().shape({ user_id, fullname, phone, email, province, canton, parish })
export const KnownPetSchema = object().shape({
    name,
    specie,
    race,
    birth,
    sex,
    castrated
})

export const NameUserProfile = object().shape({ fullname })
export const EmailUserProfile = object().shape({ email })
export const PhoneUserProfile = object().shape({ phone })
export const AddressUserProfile = object().shape({ province, canton, parish })
export const PasswordUserProfile = object().shape({ password: passwordRegex, confirmPassword, currentPassword: password })