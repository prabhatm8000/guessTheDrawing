import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../hooks/useSocket";
import Errors from "../components/Errors";
import { useUserContext } from "../hooks/useUserContext";
import { useErrorContext } from "../hooks/useErrorContext";

const JoinCreateRoom = () => {
    const navigate = useNavigate();
    const { socket } = useSocket();
    const { state: userState } = useUserContext();
    const { state: errorState } = useErrorContext();
    const [showEnterRoomForm, setShowEnterRoomForm] = useState<boolean>(true);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<EnterRoomData>();

    useEffect(() => {
        if (userState.username.length !== 0 && errorState.length === 0) {
            navigate("/room");
        }
    }, [userState, errorState]);

    const onSubmit = handleSubmit((formData: EnterRoomData) => {
        socket.connect();
        if (showEnterRoomForm && formData.roomCode) {
            socket.emit("join-room", formData);
        } else {
            socket.emit("create-room", formData);
        }
    });

    return (
        <div className="flex flex-col justify-center items-center gap-2">
            <Errors />
            <form
                onSubmit={onSubmit}
                className="grid gap-2 px-4 py-2 rounded-md border border-black w-fit"
                autoComplete="off"
            >
                <label htmlFor="" className="flex flex-col">
                    <span className="text-sm">Username</span>
                    <input
                        type="text"
                        className="border border-black px-3 py-1 rounded-md focus:outline-none text-xl"
                        {...register("username", {
                            required: "This field is required",
                        })}
                    />
                    {errors.username && (
                        <span className="text-red-500 text-sm">
                            {errors.username.message}
                        </span>
                    )}
                </label>

                {showEnterRoomForm && (
                    <label htmlFor="" className="flex flex-col">
                        <span className="text-sm">Room Code</span>
                        <input
                            type="text"
                            className="border border-black px-3 py-1 rounded-md focus:outline-none text-xl"
                            {...register("roomCode", {
                                required: "This field is required",
                            })}
                        />
                    </label>
                )}

                <button
                    type="submit"
                    className="px-3 py-1 my-2 w-fit rounded-md border border-black text-xl font-semibold"
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
