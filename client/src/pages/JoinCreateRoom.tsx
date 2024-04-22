import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../hooks/useSocket";
import Errors from "../components/Errors";
import { useUserContext } from "../hooks/useUserContext";
import { useMessageContext } from "../hooks/useMessageContext";
import { useRoomDataContext } from "../hooks/useRoomDataContext";
import { useAudioFx } from "../hooks/useAudioFx";

const JoinCreateRoom = () => {
    const navigate = useNavigate();
    const { socket } = useSocket();
    const { setFx, playFx } = useAudioFx();
    const { dispatch: userDispatch } = useUserContext();
    const { state: roomDataState } = useRoomDataContext();
    const { dispatch: dispatchMessage } = useMessageContext();
    const [showEnterRoomForm, setShowEnterRoomForm] = useState<boolean>(true);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<User>();

    useEffect(() => {
        if (roomDataState !== undefined) {
            navigate("/room");
        }
    }, [roomDataState]);

    const onSubmit = handleSubmit((formData: User) => {
        socket.connect();
        if (showEnterRoomForm && formData.roomCode) {
            socket.emit("join-room", formData);
            userDispatch({ type: "SET", payload: formData });
        } else {
            socket.emit("create-room", formData);
            userDispatch({ type: "SET", payload: formData });
        }
        dispatchMessage({
            type: "ADD",
            payload: {
                username: formData.username,
                message: "(You) joined!",
                popup: true,
                highlight: false,
            },
        });
        setFx({ fx: "JOIN" });
        playFx();
    });

    return (
        <div className="h-screen flex flex-col justify-center items-center gap-2">
            <Errors />
            <form
                onSubmit={onSubmit}
                className="grid gap-2 px-4 py-2 rounded-md border border-stone-400 w-fit"
                autoComplete="off"
            >
                <label htmlFor="username" className="flex flex-col">
                    <span className="text-sm">Username</span>
                    <input
                        id="username"
                        type="text"
                        className="border border-stone-400 px-3 py-1 rounded-md focus:outline-none text-xl bg-stone-900"
                        {...register("username", {
                            required: "This field is required",
                            maxLength: {
                                value: 8,
                                message: "Can't put more than 8 charcters",
                            },
                        })}
                    />
                    {errors.username && (
                        <span className="text-red-500 text-sm">
                            {errors.username.message}
                        </span>
                    )}
                </label>

                {showEnterRoomForm && (
                    <label htmlFor="roomCode" className="flex flex-col">
                        <span className="text-sm">Room Code</span>
                        <input
                            id="roomCode"
                            type="text"
                            className="border border-stone-400 px-3 py-1 rounded-md focus:outline-none text-xl bg-stone-900"
                            {...register("roomCode", {
                                required: "This field is required",
                                minLength: {
                                    value: 6,
                                    message: "Can't put less than 6 charcters",
                                },
                                maxLength: {
                                    value: 6,
                                    message: "Can't put more than 6 charcters",
                                },
                            })}
                        />
                        {errors.roomCode && (
                            <span className="text-red-500 text-sm">
                                {errors.roomCode.message}
                            </span>
                        )}
                    </label>
                )}

                <button
                    type="submit"
                    className="px-3 py-1 my-2 w-fit rounded-md border border-stone-400 text-xl font-semibold font-sketchit"
                >
                    {showEnterRoomForm ? "Join Room" : "Create Room"}
                </button>
            </form>

            <div>
                {showEnterRoomForm
                    ? "Want to create room? "
                    : "Want to join room? "}
                <button
                    className="text-blue-700 underline"
                    onClick={() => setShowEnterRoomForm((prev) => !prev)}
                >
                    {showEnterRoomForm ? "Create room" : "Join room"}
                </button>
            </div>
        </div>
    );
};

export default JoinCreateRoom;
