import { Socket, io } from "socket.io-client";

let socket: Socket = io("http://localhost:3000", { autoConnect: false });

const socketProcessRoomOn = (
    userState: UserStateType,
    userDispatch: ({ type, payload }: UserActionType) => void,
    dispatchMessage: ({ type }: MessageActionType) => void,
    dispatchRoomData: ({ type, payload }: RoomDataActionType) => void,
    dispatchError: ({ type }: ErrorActionType) => void
) => {
    socket.on("connect", () => {
        console.log("connected");
    });

    socket.on("room-data", ({ username, roomCode, roomData }) => {
        console.log(roomData);
        userDispatch({ type: "SET", payload: { username, roomCode } });
        dispatchMessage({
            type: "ADD",
            payload: {
                username: username + "(You)",
                message: "joined!",
                joinLeaveMessage: true,
            },
        });
        dispatchRoomData({ type: "SET", payload: roomData });
    });

    socket.on("joined-room", ({ username }) => {
        dispatchMessage({
            type: "ADD",
            payload: { username, message: "joined!", joinLeaveMessage: true },
        });
        dispatchRoomData({ type: "ADD_PLAYER", payload: username });
    });
    
    socket.on("left-room", ({ username }) => {
        dispatchMessage({
            type: "ADD",
            payload: { username, message: "left!", joinLeaveMessage: true },
        });
        dispatchRoomData({ type: "REMOVE_PLAYER", payload: username });
    });

    socket.on("error", ({ message }) => {
        dispatchError({ type: "SET", payload: message });
        setTimeout(() => {
            dispatchError({ type: "RESET" });
        }, 10000);
    });
};

const socketProcessRoomOff = () => {
    socket.off("connect");
    socket.off("disconnect");
    socket.off("room-data");
    socket.off("joined-room");
    socket.off("left-room");
    socket.off("error");
};

export const useSocket = () => {
    return { socket, socketProcessRoomOn, socketProcessRoomOff };
};
