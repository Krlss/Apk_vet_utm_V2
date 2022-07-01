import { ConfigContextType } from "@src/types/declare";
import { ConfigActionType } from '@src/types/declare';

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
        case "SET_LOADING":
            return {
                ...state,
                loading: payload,
            };
        default:
            return state;
    }
}
