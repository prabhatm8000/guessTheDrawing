import { useState } from "react";
import { useRoomDataContext } from "../hooks/useRoomDataContext";
import { useSocket } from "../hooks/useSocket";
import { useUserContext } from "../hooks/useUserContext";
import AvtarSvg from "./AvtarSvg";

const Lobby = () => {
    const { socket } = useSocket();
    const { state: userState } = useUserContext();
    const { state: roomDataState } = useRoomDataContext();
    const [myReadyState, setMyReadState] = useState<boolean>(false);

    const handleReadyBtn = () => {
        socket.emit("player-ready", {
            username: userState.username,
            roomCode: userState.roomCode,
        });
        setMyReadState(true);
    };

    const handleStartBtn = () => {
        socket.emit("start", {
            username: userState.username,
            roomCode: userState.roomCode,
        });
    };

    return (
        <div className="grid grid-rows-[2fr_1fr] gap-4 p-20 border border-white rounded-lg">
            {roomDataState ? (
                <div className="grid grid-rows-[1fr_1fr] grid-cols-[1fr_1fr_1fr_1fr] gap-1 p-1">
                    {roomDataState.players.map((data, index) => {
                        return (
                            <div
                                className="flex flex-col justify-center items-center bg-stone-800 text-sm"
                                key={index}
                            >
                                <span>
                                    <AvtarSvg
                                        className="w-[80px] h-[80px]"
                                        color={data.color}
                                    />
                                </span>
                                <span>
                                    {data.username}
                                    {data.username === userState.username &&
                                        "(You)"}
                                </span>
                                <span
                                    className={`${
                                        data.ready
                                            ? "text-green-400"
                                            : "text-red-400"
                                    } font-semibold`}
                                >
                                    {data.ready ? "Ready" : "Not Ready"}
                                </span>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <span>RoomData not avilable!</span>
            )}
            <div className="flex flex-col justify-center items-center gap-4">
                {myReadyState ? (
                    <>
                        <span>Waiting for other players...</span>
                        {roomDataState?.roomAdmin === userState.username && (
                            <button
                                className="text-2xl px-5 py-1 rounded-md border border-white hover:text-white hover:bg-black focus:outline-none transition-all delay-75 duration-200"
                                onClick={handleStartBtn}
                                style={{ lineHeight: "normal" }}
                            >
                                Start
                            </button>
                        )}
                    </>
                ) : (
                    <button
                        className="text-2xl px-5 py-1 rounded-md border border-white hover:text-white hover:bg-black focus:outline-none transition-all delay-75 duration-200"
                        onClick={handleReadyBtn}
                        style={{ lineHeight: "normal" }}
                    >
                        Ready
                    </button>
                )}
            </div>
        </div>
    );
};

export default Lobby;
