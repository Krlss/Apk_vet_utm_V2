import { Response } from '@src/types/declare'
import Toast from '@src/components/toast/Toast';


/** Código de Mario Andrés https://github.com/macool */
export const validate_user_id = (numero: string) => {
    var sum = 0;
    var residuo = 0;
    var pri = false;
    var pub = false;
    var nat = false;
    var numeroProvincias = 22;
    var modulo = 11;

    /* Verifico que el campo no contenga letras */
    var ok = 1;
    for (var i = 0; i < numero.length && ok == 1; i++) {
        var n = parseInt(numero.charAt(i));
        if (isNaN(n)) ok = 0;
    }
    if (ok == 0) {
        console.log("No puede ingresar caracteres en el número");
        return false;
    }

    if (numero.length < 10) {
        console.log('El número ingresado no es válido');
        return false;
    }

    /* Los primeros dos digitos corresponden al codigo de la provincia */
    var provincia = parseInt(numero.substr(0, 2));
    if (provincia < 1 || provincia > numeroProvincias) {
        console.log('El código de la provincia (dos primeros dígitos) es inválido');
        return false;
    }

    /* Aqui almacenamos los digitos de la cedula en variables. */
    var d1 = parseInt(numero.substr(0, 1));
    var d2 = parseInt(numero.substr(1, 1));
    var d3 = parseInt(numero.substr(2, 1));
    var d4 = parseInt(numero.substr(3, 1));
    var d5 = parseInt(numero.substr(4, 1));
    var d6 = parseInt(numero.substr(5, 1));
    var d7 = parseInt(numero.substr(6, 1));
    var d8 = parseInt(numero.substr(7, 1));
    var d9 = parseInt(numero.substr(8, 1));
    var d10 = parseInt(numero.substr(9, 1));

    var p1: number = 0;
    var p2: number = 0;
    var p3: number = 0;
    var p4: number = 0;
    var p5: number = 0;
    var p6: number = 0;
    var p7: number = 0;
    var p8: number = 0;
    var p9: number = 0;



    /* El tercer digito es: */
    /* 9 para sociedades privadas y extranjeros   */
    /* 6 para sociedades publicas */
    /* menor que 6 (0,1,2,3,4,5) para personas naturales */

    if (d3 == 7 || d3 == 8) {
        console.log('El tercer dígito ingresado es inválido');
        return false;
    }

    /* Solo para personas naturales (modulo 10) */
    if (d3 < 6) {
        nat = true;
        p1 = d1 * 2; if (p1 >= 10) p1 -= 9;
        p2 = d2 * 1; if (p2 >= 10) p2 -= 9;
        p3 = d3 * 2; if (p3 >= 10) p3 -= 9;
        p4 = d4 * 1; if (p4 >= 10) p4 -= 9;
        p5 = d5 * 2; if (p5 >= 10) p5 -= 9;
        p6 = d6 * 1; if (p6 >= 10) p6 -= 9;
        p7 = d7 * 2; if (p7 >= 10) p7 -= 9;
        p8 = d8 * 1; if (p8 >= 10) p8 -= 9;
        p9 = d9 * 2; if (p9 >= 10) p9 -= 9;
        modulo = 10;
    }

    /* Solo para sociedades publicas (modulo 11) */
    /* Aqui el digito verficador esta en la posicion 9, en las otras 2 en la pos. 10 */
    else if (d3 == 6) {
        pub = true;
        p1 = d1 * 3;
        p2 = d2 * 2;
        p3 = d3 * 7;
        p4 = d4 * 6;
        p5 = d5 * 5;
        p6 = d6 * 4;
        p7 = d7 * 3;
        p8 = d8 * 2;
        p9 = 0;
    }

    /* Solo para entidades privadas (modulo 11) */
    else if (d3 == 9) {
        pri = true;
        p1 = d1 * 4;
        p2 = d2 * 3;
        p3 = d3 * 2;
        p4 = d4 * 7;
        p5 = d5 * 6;
        p6 = d6 * 5;
        p7 = d7 * 4;
        p8 = d8 * 3;
        p9 = d9 * 2;
    }

    sum = p1 + p2 + p3 + p4 + p5 + p6 + p7 + p8 + p9;
    residuo = sum % modulo;

    /* Si residuo=0, dig.ver.=0, caso contrario 10 - residuo*/
    var digitoVerificador = residuo == 0 ? 0 : modulo - residuo;

    /* ahora comparamos el elemento de la posicion 10 con el dig. ver.*/
    if (pub == true) {
        if (digitoVerificador != d9) {
            console.log('El ruc de la empresa del sector público es incorrecto.');
            return false;
        }
        /* El ruc de las empresas del sector publico terminan con 0001*/
        if (numero.substr(9, 4) != '0001') {
            console.log('El ruc de la empresa del sector público debe terminar con 0001');
            return false;
        }
    }
    else if (pri == true) {
        if (digitoVerificador != d10) {
            console.log('El ruc de la empresa del sector privado es incorrecto.');
            return false;
        }
        if (numero.substr(10, 3) != '001') {
            console.log('El ruc de la empresa del sector privado debe terminar con 001');
            return false;
        }
    }

    else if (nat == true) {
        if (digitoVerificador != d10) {
            console.log('El número de cédula de la persona natural es incorrecto.');
            return false;
        }
        if (numero.length > 10 && numero.substr(10, 3) != '001') {
            console.log('El ruc de la persona natural debe terminar con 001');
            return false;
        }
    }
    return true;
}

export const separateFullname = (fullname: string): string[] => {
    if (!fullname) return []
    else {
        const names = fullname.split(' ');
        const last_name1 = names[0];
        names[0] = ''
        const last_name2 = names[1];
        names[1] = ''
        const name = names.filter(e => e).join(' ')
        return [name, last_name1, last_name2];
    }
}

export const getDataFromStatus = async (response: Response) => {
    if (response.status === 200 || response.status === 401 || response.status === 500 || response.status === 301 || response.status === 404) {
        const res = await response.json();
        Toast(res)
        return res;
    } else if (response.status === 422) {
        const res = await response.json();
        Toast({
            type: 'error',
            title: 'Validaciones',
            message: 'Algunos campos no cumplen con las validaciones',
        })
        return res;
    }
}
