import * as Yup from 'yup';
import { email, password } from './validations'

export const loginSchema = Yup.object().shape({ email, password })
