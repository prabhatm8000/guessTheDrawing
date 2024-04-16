import { Dispatch, createContext, useReducer } from "react";

export const ErrorContext = createContext<{
    state: string;
    dispatch: Dispatch<ErrorActionType>;
}>({
    state: "",
    dispatch: () => {},
});

export const errorReducer = (state: string, action: ErrorActionType) => {
    switch (action.type) {
        case "SET":
            return action.payload;
        case "RESET":
            return "";
        default:
            return state;
    }
};

export const ErrorContextProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [state, dispatch] = useReducer(errorReducer, "");

    return (
        <ErrorContext.Provider value={{ state, dispatch }}>
            {children}
        </ErrorContext.Provider>
    );
};
