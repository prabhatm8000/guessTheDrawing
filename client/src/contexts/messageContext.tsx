import { Dispatch, createContext, useReducer } from "react";

export const MessageContext = createContext<{
    state: MessageStateType;
    dispatch: Dispatch<MessageActionType>;
}>({
    state: [],
    dispatch: () => {},
});

export const messageReducer = (state: MessageStateType, action: MessageActionType) => {
    switch (action.type) {
        case "ADD":
            return [...state, action.payload];
        case "RESET":
            return [];
        default:
            return state;
    }
};

export const MessageContextProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [state, dispatch] = useReducer(messageReducer, [] as MessageStateType);

    return (
        <MessageContext.Provider value={{ state, dispatch }}>
            {children}
        </MessageContext.Provider>
    );
};
