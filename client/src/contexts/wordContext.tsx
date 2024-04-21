import { Dispatch, createContext, useReducer } from "react";

export const WordContext = createContext<{
    state: string;
    dispatch: Dispatch<WordActionType>;
}>({
    state: "",
    dispatch: () => {},
});

export const wordReducer = (state: string, action: WordActionType) => {
    switch (action.type) {
        case "SET":
            return action.payload;
        case "RESET":
            return "";
        default:
            return state;
    }
};

export const WordContextProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [state, dispatch] = useReducer(wordReducer, "");

    return (
        <WordContext.Provider value={{ state, dispatch }}>
            {children}
        </WordContext.Provider>
    );
};
