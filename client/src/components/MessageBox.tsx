import { BiSend } from "react-icons/bi";
import { useMessageContext } from "../hooks/useMessageContext";
import { FormEvent, useEffect, useState } from "react";
import { useUserContext } from "../hooks/useUserContext";
import { useSocket } from "../hooks/useSocket";

const MessageBox = () => {
    const { socket } = useSocket();
    
    const { state: userState } = useUserContext();
    const { state: messageState, dispatch: dispatchMessage } =
        useMessageContext();

    const [messageInput, setMessageInput] = useState<string>("");

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
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

    useEffect(() => {
        socket.on("message-send", ({ username, message }) => {
            dispatchMessage({
                type: "ADD",
                payload: { username, message, joinLeaveMessage: false },
            });
        });

        return () => {
            socket.off("message-send");
        };
    }, []);

    return (
        <div className="relative border border-black rounded-md grid grid-rows-[0.5fr_9fr_0.5fr]">
            {/* title */}
            <div className="px-4 py-1 border-b border-black">
                <h3 className="text-2xl">Messages</h3>
            </div>

            {/* messages */}
            <div className="m-2 mb-0 border border-black rounded-md h-[770px] overflow-auto">
                <ul className="flex flex-col gap-1 text-lg">
                    {messageState.map((data, index) => {
                        if (data.joinLeaveMessage) {
                            return (
                                <li
                                    key={index}
                                    className="bg-gray-300 px-3 text-center"
                                >
                                    {data.username} {data.message}
                                </li>
                            );
                        }
                        if (data.username === userState.username) {
                            return (
                                <li
                                    key={index}
                                    className="bg-stone-100 px-3 text-right"
                                >
                                    {data.message}
                                </li>
                            );
                        }
                        return (
                            <li
                                key={index}
                                className="flex gap-2 bg-stone-100 px-3"
                            >
                                <span>{data.username}</span>:
                                <span>{data.message}</span>
                            </li>
                        );
                    })}
                </ul>
            </div>

            {/* send message form */}
            <form
                onSubmit={onSubmit}
                className="flex gap-2 m-2 py-2 px-3 border border-black rounded-md"
            >
                <input
                    type="text"
                    placeholder="Message"
                    className="w-full focus:outline-none"
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
