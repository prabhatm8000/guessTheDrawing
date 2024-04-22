import { Socket, io } from "socket.io-client";
import * as docuFunc from "../utils/docuFunc";
import { useAudioFx } from "./useAudioFx";

let socket: Socket = io("http://localhost:3000", { autoConnect: false });

const { setFx, playFx } = useAudioFx();

const TIME = 30;
const WAITINGTIME = 5;

let currRoomData: RoomDataStateType;

export let timerIntervalId: number;
export let timerTimeoutId: number;

const socketProcessRoomOn = (
    userState: UserStateType,
    userDispatch: ({ type, payload }: UserActionType) => void,
    dispatchMessage: ({ type }: MessageActionType) => void,
    dispatchRoomData: ({ type, payload }: RoomDataActionType) => void,
    dispatchError: ({ type }: ErrorActionType) => void,
    dispatchWord: ({ type }: ErrorActionType) => void
) => {
    socket.on("connect", () => {
        console.log("connected");
    });

    // room
    // #region
    socket.on("room-data", ({ roomData }: { roomData: RoomData }) => {
        currRoomData = roomData;

        userDispatch({ type: "ADD_ROOMCODE", payload: roomData.roomCode });
        dispatchRoomData({ type: "SET", payload: roomData });
    });

    socket.on("joined-room", ({ player }: { player: Player }) => {
        setFx({ fx: "JOIN" });
        playFx();

        dispatchMessage({
            type: "ADD",
            payload: {
                username: player.username,
                message: "joined!",
                popup: true,
                highlight: false,
            },
        });
        dispatchRoomData({ type: "ADD_PLAYER", payload: player });
    });

    socket.on("left-room", ({ username }: { username: string }) => {
        setFx({ fx: "LEAVE" });
        playFx();

        dispatchMessage({
            type: "ADD",
            payload: {
                username,
                message: "left!",
                popup: true,
                highlight: false,
            },
        });
        dispatchRoomData({ type: "REMOVE_PLAYER", payload: username });
    });
    // #endregion

    // kick
    socket.on("kicked", ({ playerUsername }: { playerUsername: string }) => {
        if (playerUsername === userState.username) {
            dispatchRoomData({ type: "SET", payload: undefined });
            userDispatch({
                type: "SET",
                payload: { username: "", roomCode: "" },
            });
            dispatchMessage({ type: "RESET" });
            dispatchWord({ type: "RESET" });

            return;
        }

        setFx({ fx: "LEAVE" });
        playFx();

        dispatchMessage({
            type: "ADD",
            payload: {
                username: playerUsername,
                message: "got kicked!",
                popup: true,
                highlight: false,
            },
        });
        dispatchRoomData({ type: "REMOVE_PLAYER", payload: playerUsername });
    });

    // errors
    socket.on("error", ({ message }: { message: string }) => {
        dispatchError({ type: "SET", payload: message });
        setTimeout(() => {
            dispatchError({ type: "RESET" });
        }, 10000);
    });

    // messages
    socket.on("message-received", ({ username, message, popup, highlight }) => {
        if (message === "GUESSED!" && popup && highlight) {
            setFx({ fx: "GUESSED" });
            playFx();
        }

        dispatchMessage({
            type: "ADD",
            payload: { username, message, popup, highlight },
        });
    });

    // game
    // #region
    socket.on("word", ({ word }: { word: string }) => {
        dispatchWord({ type: "SET", payload: word });
    });

    socket.on("start-timer", () => {
        setFx({ fx: "STARTED" });
        playFx();

        let countDown = TIME;

        timerIntervalId = setInterval(() => {
            docuFunc.updateTimer(--countDown);
            if (countDown <= 10) {
                setFx({ fx: "TICK" });
                playFx();
            }
        }, 1000);

        timerTimeoutId = setTimeout(() => {
            clearInterval(timerIntervalId);
            console.log("shit", currRoomData, userState);

            if (
                currRoomData !== undefined &&
                currRoomData.turn !== undefined &&
                currRoomData.players[currRoomData.turn].username ===
                    userState.username
            ) {
                console.log("times up");
                console.log(docuFunc.getCurrentWord());
                socket.emit("times-up", {
                    word: docuFunc.getCurrentWord(),
                    roomCode: currRoomData.roomCode,
                });
            }
        }, TIME * 1000);

        return () => {
            clearTimeout(timerTimeoutId);
        };
    });

    socket.on("times-up", () => {
        setFx({ fx: "ENDED" });
        playFx();

        // for handling everyone guessed case
        clearInterval(timerIntervalId);
        clearTimeout(timerTimeoutId);

        let countDown = WAITINGTIME;

        let id = setInterval(() => {
            docuFunc.updateTimer(--countDown, "next word in ");
        }, 1000);

        const timeoutId = setTimeout(() => {
            clearInterval(id);
            if (
                currRoomData !== undefined &&
                currRoomData.turn !== undefined &&
                currRoomData.players[currRoomData.turn].username ===
                    userState.username
            ) {
                socket.emit("word-next", {
                    roomCode: currRoomData.roomCode,
                });
            }
        }, WAITINGTIME * 1000);

        return () => {
            clearTimeout(timeoutId);
        };
    });
    // #endregion
};

const socketProcessRoomOff = () => {
    socket.off("connect");
    socket.off("disconnect");
    socket.off("room-data");
    socket.off("joined-room");
    socket.off("left-room");
    socket.off("kicked");
    socket.off("error");
    socket.off("message-received");
    socket.off("word");
    socket.off("start-timer");
    socket.off("times-up");
};

export const useSocket = () => {
    return { socket, socketProcessRoomOn, socketProcessRoomOff };
};
