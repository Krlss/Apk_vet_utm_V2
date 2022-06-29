import * as yup from 'yup';
import { fullnameRegex, lowercase, number, uppercase, onlyNumber } from '@src/constants/regex'

export const email = yup.string()
    .email('El email no es válido')
    .max(100, 'El email no puede tener más de 100 caracteres')
    .required('Digita un correo electrónico')

export const password = yup.string().
    min(6, 'La contraseña es muy corta')
    .max(50, 'La contraseña es muy larga')
    .required('Digita una contraseña')

export const passwordRegex = password
    .matches(lowercase, 'La contraseña debe tener al menos una letra minúscula')
    .matches(uppercase, 'La contraseña debe tener al menos una letra mayúscula')
    .matches(number, 'La contraseña debe tener al menos un número')

export const user_id = yup.string()
    .matches(onlyNumber, 'La CI/RUC debe contener solo números')
    .min(10, 'La CI/RUC es muy corta')
    .max(13, 'La CI/RUC es muy larga')
    .required('Digita una CI/RUC')

export const full_name = yup.string()
    .min(3, 'El nombre completo es muy corto')
    .max(50, 'El nombre completo es muy largo')
    .required('Digita un nombre completo')
    .matches(fullnameRegex, 'El nombre completo no es válido (Al menos un nombre y dos apellidos)')

export const phone = yup.string()
    .matches(onlyNumber, 'El teléfono debe contener solo números')
    .matches(/^09/, 'El teléfono debe empezar con 09')
    .min(10, 'El teléfono es muy corto')
    .max(10, 'El teléfono es muy largo')
    .required('Digita un teléfono')


