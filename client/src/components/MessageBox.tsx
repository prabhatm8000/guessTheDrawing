import { BiSend } from "react-icons/bi";
import { useMessageContext } from "../hooks/useMessageContext";
import { FormEvent, useState } from "react";
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
    const { dispatch: dispatchRoomData } = useRoomDataContext();
    const { dispatch: dispatchWord } = useWordContext();

    const [messageInput, setMessageInput] = useState<string>("");

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

    const handleLeaveBtn = () => {
        clearInterval(timerIntervalId);
        clearTimeout(timerTimeoutId);

        userDispatch({ type: "SET", payload: { username: "", roomCode: "" } });
        dispatchRoomData({ type: "SET", payload: undefined });
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
        <div className="relative border border-white rounded-md grid grid-rows-[0.5fr_9fr_0.5fr]">
            {/* title */}
            <div className="px-4 py-1 border-b border-white flex justify-between items-center">
                <h3 className="text-2xl">Messages</h3>
                <button
                    className="text-lg text-black px-2 rounded-md border border-white bg-white hover:bg-black hover:text-white"
                    onClick={handleLeaveBtn}
                >
                    Leave
                </button>
            </div>

            {/* messages */}
            <div className="m-2 mb-0 border border-white rounded-md h-[716px] overflow-auto">
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
                                    } px-3 text-center`}
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
                                <span>{data.username}</span>:
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
                className="flex gap-2 m-2 py-2 px-3 border border-white rounded-md"
            >
                <input
                    type="text"
                    placeholder="Message"
                    className="w-full focus:outline-none bg-black text-white"
                    maxLength={300}
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
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
