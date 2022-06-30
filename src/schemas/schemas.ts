import { object } from 'yup';
import { email, password, passwordRegex, fullname, phone, user_id } from './validations'

export const loginSchema = object().shape({ email, password })
export const registerSchema = object().shape({ user_id, fullname, phone, email, password: passwordRegex })
