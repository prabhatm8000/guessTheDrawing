import { Dispatch, createContext, useReducer } from "react";

export const UserContext = createContext<{
    state: UserStateType;
    dispatch: Dispatch<UserActionType>;
}>({
    state: { username: "", roomCode: "" },
    dispatch: () => {},
});

export const userReducer = (state: UserStateType, action: UserActionType) => {
    switch (action.type) {
        case "SET":
            return action.payload;
        default:
            return state;
    }
};

export const UserContextProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [state, dispatch] = useReducer(userReducer, {
        username: "",
        roomCode: "",
    } as UserStateType);

    return (
        <UserContext.Provider value={{ state, dispatch }}>
            {children}
        </UserContext.Provider>
    );
};
