import { ConfigContextType } from "@src/types/declare";
import { KeyboardType } from '@src/types/declare';

type ConfigActionType = | { type: "SET_KEYBOARD_STATUS"; payload: boolean } | { type: "SET_KEYBOARD"; payload: KeyboardType };


export default (state: ConfigContextType, action: ConfigActionType) => {
    const { type, payload } = action;

    switch (type) {
        case "SET_KEYBOARD_STATUS":
            return {
                ...state,
                keyboardStatus: payload,
            };
        case "SET_KEYBOARD":
            return {
                ...state,
                Keyboard: payload,
            };
        default:
            return state;
    }
}
