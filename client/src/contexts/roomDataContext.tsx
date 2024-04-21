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
): RoomData | undefined => {
    switch (action.type) {
        case "SET":
            return action.payload;
        case "ADD_PLAYER":
            if (!state) {
                return state;
            }
            return {
                gameStatus: state.gameStatus,
                players: [...state.players, action.payload],
                roomAdmin: state.roomAdmin,
                roomCode: state.roomCode,
                turn: state.turn,
            };

        case "REMOVE_PLAYER":
            if (!state) {
                return state;
            }
            return {
                gameStatus: state.gameStatus,
                players: state.players.filter(
                    (data) => data.username !== action.payload
                ),
                roomAdmin: state.roomAdmin,
                roomCode: state.roomCode,
                turn: state.turn,
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
