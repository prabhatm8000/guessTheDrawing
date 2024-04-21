import { Dispatch, createContext, useReducer } from "react";

export const UserContext = createContext<{
    state: UserStateType;
    dispatch: Dispatch<UserActionType>;
}>({
    state: { username: "", roomCode: undefined },
    dispatch: () => {},
});

export const userReducer = (state: UserStateType, action: UserActionType) => {
    switch (action.type) {
        case "SET":
            return action.payload;
        case "ADD_ROOMCODE":
            return { username: state.username, roomCode: action.payload };
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
        roomCode: undefined,
    } as UserStateType);

    return (
        <UserContext.Provider value={{ state, dispatch }}>
            {children}
        </UserContext.Provider>
    );
};
