import { ReportContextType } from "@src/types/declare";
import { ReportActionType } from '@src/types/declare';

export default (state: ReportContextType, action: ReportActionType) => {
    const { type, payload } = action;

    switch (type) {
        case "SET_USER":
            return {
                ...state,
                user: payload,
            };
        case "SET_PET":
            return {
                ...state,
                pet: payload,
            };
        case "SET_LOCATION":
            return {
                ...state,
                location: payload,
            };
        default:
            return state;
    }
}
