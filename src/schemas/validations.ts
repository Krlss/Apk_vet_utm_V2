import * as yup from 'yup';
import { lowercase, number, uppercase, onlyNumber } from '@src/constants/regex'
import { validate_user_id, separateFullname } from '@src/utils/utils'

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
    .test("isValidUserID", "La CI/RUC es incorrecta", (user_id?: string | null) => {
        return user_id && validate_user_id(user_id) ? true : false
    })

export const fullname = yup.string()
    .min(3, 'El nombre completo es muy corto')
    .max(50, 'El nombre completo es muy largo')
    .required('Digita un nombre completo')
    .test("isValidFullName", "Dos apellidos y al menos un nombre", (fullname: any) => {
        const [name, lastname1, lastname2] = separateFullname(fullname)
        return fullname && name && lastname1 && lastname2 ? true : false
    })

export const phone = yup.string()
    .matches(onlyNumber, 'El teléfono debe contener solo números')
    .matches(/^09/, 'El teléfono debe empezar con 09')
    .min(10, 'El teléfono es muy corto')
    .max(10, 'El teléfono es muy largo')
    .required('Digita un teléfono')

export const province = yup.string()
    .required('Selecciona una provincia')

export const canton = yup.string()
    .required('Selecciona un cantón')

export const parish = yup.string()
    .required('Selecciona una parroquia')

export const name = yup.string()
    .min(3, 'El nombre es muy corto')
    .max(50, 'El nombre es muy largo')
    .required('Digita un nombre')

export const specie = yup.string()
    .required('Selecciona una especie')

export const race = yup.string()
    .required('Selecciona una raza')

export const birth = yup.string()
    .required('Selecciona una fecha de nacimiento')

export const sex = yup.string()
    .required('El sexo es requerido')

export const castrated = yup.string()
    .required('Este campo es requerido')