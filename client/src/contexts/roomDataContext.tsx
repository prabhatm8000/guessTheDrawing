import { Dispatch, createContext, useReducer } from "react";

export const RoomDataContext = createContext<{
    state: RoomDataStateType;
    dispatch: Dispatch<RoomDataActionType>;
}>({
    state: undefined,
    dispatch: () => {},
});

export const roomDataReducer = (
    state: RoomDataStateType,
    action: RoomDataActionType
) => {
    switch (action.type) {
        case "SET":
            return action.payload;
        case "ADD_PLAYER":
            if (!state) {
                return state;
            }
            return {
                roomAdmin: state.roomAdmin,
                players: [...state.players, action.payload],
            };

        case "REMOVE_PLAYER":
            if (!state) {
                return state;
            }
            return {
                roomAdmin: state.roomAdmin,
                players: state.players.filter(
                    (data) => data !== action.payload
                ),
            };
        default:
            return state;
    }
};

export const RoomDataContextProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [state, dispatch] = useReducer(
        roomDataReducer,
        undefined as RoomDataStateType
    );

    return (
        <RoomDataContext.Provider value={{ state, dispatch }}>
            {children}
        </RoomDataContext.Provider>
    );
};
