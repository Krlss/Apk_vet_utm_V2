import * as Yup from 'yup';

export const email = Yup.string()
    .email('El email no es válido')
    .max(100, 'El email no puede tener más de 100 caracteres')
    .required('Correo electrónico requerido')

export const password = Yup.string().
    min(6, 'Contraseña muy corta')
    .max(50, 'Contraseña muy larga')
    .required('Contraseña requerida')