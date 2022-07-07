import { AuthContextType, user } from "@src/types/declare";

type AuthActionType = { type: "SAVE"; payload: user } | { type: "LOGOUT"; payload: user };


export default (state: AuthContextType, action: AuthActionType) => {
    const { type, payload } = action;

    switch (type) {
        case "SAVE":
            return {
                ...state,
                user: payload,
            };
        case "LOGOUT":
            return {
                ...state,
                user: payload,
            };
        default:
            return state;
    }
}
