import { KeyboardStatic } from "react-native";

export type justifyContentType = 'flex-start' | 'flex-end' | 'space-between' | 'space-around' | 'center' | 'space-evenly' | undefined;

export type props = {
    [key: string]: any;
}

export type KeyboardType = KeyboardStatic;

export type ConfigContextType = {
    keyboardStatus: boolean;
    Keyboard: KeyboardType;
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