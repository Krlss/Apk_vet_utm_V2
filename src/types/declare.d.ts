import { KeyboardStatic } from "react-native";

export type justyContentType = 'flex-start' | 'flex-end' | 'space-between' | 'space-around' | 'center' | 'space-evenly' | undefined;

export type props = {
    [key: string]: any;
}

export type KeyboardType = KeyboardStatic;

export type ConfigContextType = {
    keyboardStatus: boolean;
    Keyboard: KeyboardType;
}

