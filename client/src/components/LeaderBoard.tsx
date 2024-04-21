import { useEffect, useState } from "react";
import { useRoomDataContext } from "../hooks/useRoomDataContext";
import { useUserContext } from "../hooks/useUserContext";
import AvtarSvg from "./AvtarSvg";
import { useSocket } from "../hooks/useSocket";

const LeaderBoard = () => {
    const { socket } = useSocket();
    const { state: userState } = useUserContext();
    const { state: roomDataState } = useRoomDataContext();
    const [scores, setScores] = useState<Player[] | undefined>(
        roomDataState?.players
    );

    useEffect(() => {
        setScores((prev) => {
            if (prev) return prev.sort((a, b) => b.score - a.score);
        });
    }, [roomDataState]);

    const handlePlayAgainBtn = () => {
        socket.emit("play-again", {
            username: userState.username,
            roomCode: userState.roomCode,
        });
    };

    return (
        <div className="p-10 border border-white rounded-lg grid grid-flow-row grid-rows-[10%_90%] justify-center items-start">
            <button
                className="text-2xl px-5 py-1 rounded-md border border-white hover:text-white hover:bg-black focus:outline-none transition-all delay-75 duration-200"
                onClick={handlePlayAgainBtn}
                style={{ lineHeight: "normal" }}
            >
                Play Again
            </button>
            <table className="shadow-xl bg-stone-700 border-separate text-center text-2xl">
                <thead>
                    <tr>
                        <th className="bg-stone-950 px-4 py-1 w-[200px] h-[50px]"></th>
                        <th className="bg-stone-950 px-4 py-1 w-[200px] h-[50px]">
                            Name
                        </th>
                        <th className="bg-stone-950 px-4 py-1 w-[200px] h-[50px]">
                            Score
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {scores?.map((player, index) => {
                        return (
                            <tr key={index}>
                                <td className="bg-stone-800 px-4 w-[200px] h-[50px] flex justify-center items-end">
                                    <AvtarSvg
                                        color={player.color}
                                        className="size-[40px] -translate-y-1"
                                    />
                                </td>
                                <td className="bg-stone-800 px-4 py-1 w-[200px] h-[50px]">
                                    {player.username}
                                    {player.username === userState.username &&
                                        "(You)"}
                                </td>
                                <td className="bg-stone-800 px-4 py-1 w-[200px] h-[50px]">
                                    {player.score}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default LeaderBoard;
