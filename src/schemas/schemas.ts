import { object } from 'yup';
import { email, password, passwordRegex, full_name, phone, user_id } from './validations'

export const loginSchema = object().shape({ email, password })
export const registerSchema = object().shape({ user_id, full_name, phone, email, password: passwordRegex })
