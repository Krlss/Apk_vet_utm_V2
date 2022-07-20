import { object } from 'yup';
import { email, password, passwordRegex, fullname, phone, user_id, canton, parish, province } from './validations'

export const loginSchema = object().shape({ email, password })
export const registerSchema = object().shape({ user_id, fullname, phone, email, password: passwordRegex })

export const KnownUserSchema = object().shape({ user_id, fullname, phone, email, province, canton, parish })