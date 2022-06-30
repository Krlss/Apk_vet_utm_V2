import { KeyboardStatic } from 'react-native';

export type justifyContentType = 'flex-start' | 'flex-end' | 'space-between' | 'space-around' | 'center' | 'space-evenly' | undefined;

export type props = {
    [key: string]: any;
}

export type KeyboardType = KeyboardStatic;

export type ConfigContextType = {
    keyboardStatus: boolean;
    Keyboard: KeyboardType;
}

export type AuthContextType = {
    user: user
}

export type AuthStackProps = {
    LOGIN,
    REGISTER,
}

export type fetchState = 'loading' | 'success' | 'error' | undefined;
export interface LAuth {
    email: string;
    password: string;
}

export interface IAuth {
    USER: {
        user_id?: string;
        fullname?: string;
        phone?: string;
        email: string;
        password: string;
    };
    url: string;
}
export interface user {
    user_id: string,
    profile_photo_path?: string,
    name: string,
    last_name1?: string,
    last_name2?: string,
    email: string,
    id_parish?: number,
    id_canton?: number,
    id_province?: number,
    phone?: string,
    email_verified_at?: string,
    api_token?: string,
    main_street?: string,
    street_1_sec?: string,
    street_2_sec?: string,
    address_ref?: string,
    pets?: [pet],
    canton?: [canton],
    province?: [province],
    parish?: [parish],
}

export interface pet {
    pet_id: string,
    name: string,
    birth: string,
    sex: string,
    castrated: boolean,
    lost: false,
    n_lost: number,
    published: boolean,
    id_pet_pather?: string,
    id_pet_mother?: string,
    id_specie?: number,
    id_race?: number,
    id_fur?: number,
    user_id?: string,
    characteristic?: string
}

export interface basic {
    id: number,
    name: string
}

export interface province extends basic {
    letter: string;
}

export interface canton extends basic {
    id_province: number;
}

export interface parish extends basic {
    id_canton: number;
} 
