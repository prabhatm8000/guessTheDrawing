import { BiSend } from "react-icons/bi";
import { useMessageContext } from "../hooks/useMessageContext";
import { FormEvent, useState, MouseEvent, useEffect } from "react";
import { useUserContext } from "../hooks/useUserContext";
import { timerIntervalId, timerTimeoutId, useSocket } from "../hooks/useSocket";
import { useNavigate } from "react-router-dom";
import { bleepSwearWords } from "../utils/swearWords";
import { useRoomDataContext } from "../hooks/useRoomDataContext";
import { useWordContext } from "../hooks/useWordContext";

const MessageBox = () => {
    const { socket } = useSocket();
    const navigate = useNavigate();

    const { state: userState, dispatch: userDispatch } = useUserContext();
    const { state: messageState, dispatch: dispatchMessage } =
        useMessageContext();
    const { state: roomDataState, dispatch: dispatchRoomData } =
        useRoomDataContext();
    const { dispatch: dispatchWord } = useWordContext();

    const [showKickBox, setShowKickBox] = useState<boolean>(false);
    const [messageInput, setMessageInput] = useState<string>("");

    // auto close kick box after 10sec
    useEffect(() => {
        if (!showKickBox) {
            return;
        }

        const timeoutId = setTimeout(() => {
            setShowKickBox(false);
        }, 10000);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [showKickBox]);

    // todo -> allow everyone to turn on/off safe chat

    const sendMessage = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const message = messageInput.trim();
        setMessageInput("");

        if (message.length === 0) return;

        socket.emit("message-send", {
            username: userState.username,
            message,
            roomCode: userState.roomCode,
        });
    };

    const getColor = (username: string) => {
        return roomDataState?.players.filter(
            (data) => data.username === username
        )[0].color;
    };

    const handleKickPlayerBtn = (e: MouseEvent<HTMLButtonElement>) => {
        const playerUsername = e.currentTarget.innerText;

        socket.emit("kick-player", {
            playerUsername,
            username: userState.username,
            roomCode: userState.roomCode,
        });
    };

    const handleLeaveBtn = () => {
        clearInterval(timerIntervalId);
        clearTimeout(timerTimeoutId);

        dispatchRoomData({ type: "SET", payload: undefined });
        userDispatch({ type: "SET", payload: { username: "", roomCode: "" } });
        dispatchMessage({ type: "RESET" });
        socket.emit("leaving-room", {
            username: userState.username,
            roomCode: userState.roomCode,
        });
        dispatchWord({ type: "RESET" });
        socket.disconnect();
        navigate("/");
    };

    return (
        <div className="relative border border-stone-400 rounded-md grid grid-rows-[0.5fr_9fr_0.5fr]">
            {/* title */}
            <div className="px-4 py-1 border-b border-stone-400 flex justify-between items-center">
                <h3 className="text-2xl font-sketchit">Messages</h3>
                <div className="flex gap-2">
                    {userState.username === roomDataState?.roomAdmin && (
                        <button
                            className="text-lg font-semibold text-black px-2 rounded-md border border-stone-400 bg-white hover:bg-black hover:text-white"
                            onClick={() => setShowKickBox((prev) => !prev)}
                        >
                            Kick
                        </button>
                    )}
                    <button
                        className="text-lg font-semibold text-black px-2 rounded-md border border-stone-400 bg-white hover:bg-black hover:text-white"
                        onClick={handleLeaveBtn}
                    >
                        Leave
                    </button>
                </div>
            </div>

            {/* kick */}
            {showKickBox &&
                roomDataState !== undefined &&
                userState.username === roomDataState.roomAdmin &&
                roomDataState.players.length > 0 && (
                    <div className="absolute right-0 my-10 mx-16 p-1 bg-stone-700 rounded-md grid grid-cols-2 grid-rows-4 gap-1">
                        {roomDataState?.players.map((data, index) => {
                            return (
                                <button
                                    key={index}
                                    className="bg-black px-1 rounded-md text-red-400"
                                    onClick={handleKickPlayerBtn}
                                >
                                    {data.username}
                                </button>
                            );
                        })}
                    </div>
                )}

            {/* messages */}
            <div className="m-2 mb-0 border border-stone-400 rounded-md h-[716px] overflow-auto">
                <ul className="flex flex-col gap-1 text-lg select-text">
                    {messageState.map((data, index) => {
                        if (data.popup) {
                            return (
                                <li
                                    key={index}
                                    className={`${
                                        data.highlight
                                            ? "bg-green-700"
                                            : "bg-stone-700"
                                    } px-3 text-center font-semibold`}
                                >
                                    {data.username}{" "}
                                    {bleepSwearWords(data.message)}
                                </li>
                            );
                        }
                        if (data.username === userState.username) {
                            return (
                                <li
                                    key={index}
                                    className={`${
                                        data.highlight
                                            ? "bg-green-700"
                                            : "bg-stone-900"
                                    } px-3 text-right`}
                                >
                                    <span className="break-all">
                                        {bleepSwearWords(data.message)}
                                    </span>
                                </li>
                            );
                        }
                        return (
                            <li
                                key={index}
                                className={`flex gap-2 ${
                                    data.highlight
                                        ? "bg-green-700"
                                        : "bg-stone-900"
                                } px-3`}
                            >
                                <span
                                    className="font-semibold"
                                    style={{ color: getColor(data.username) }}
                                >
                                    {data.username}
                                </span>
                                :
                                <span className="break-all">
                                    {bleepSwearWords(data.message)}
                                </span>
                            </li>
                        );
                    })}
                </ul>
            </div>

            {/* send message form */}
            <form
                onSubmit={sendMessage}
                className="flex gap-2 m-2 py-2 px-3 border border-stone-400 rounded-md"
            >
                <input
                    type="text"
                    placeholder="Message"
                    className="w-full focus:outline-none bg-transparent text-white placeholder:text-[#ffffff90]"
                    maxLength={300}
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    autoFocus
                    required
                />
                <button type="submit" className="text-2xl">
                    <BiSend />
                </button>
            </form>
        </div>
    );
};

export default MessageBox;
