import { AuthContextType } from "@src/types/declare";

type AuthActionType = | { type: "SAVE"; payload: any };


export default (state: AuthContextType, action: AuthActionType) => {
    const { type, payload } = action;

    switch (type) {
        case "SAVE":
            return {
                ...state,
                user: payload,
            };
        default:
            return state;
    }
}
