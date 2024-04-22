import { useRoomDataContext } from "../hooks/useRoomDataContext";

const Timer = () => {
    const { state: roomDataState } = useRoomDataContext();
    // todo -> allow admin to change timer

    if (roomDataState?.gameStatus !== "GAME") {
        return (
            <div
                className="flex justify-center items-center border border-stone-400 p-1 rounded-md font-mono"
                id="timer"
            >
                --:--
            </div>
        );
    }

    return (
        <div
            className="flex justify-center items-center border border-stone-400 p-1 rounded-md font-mono"
            id="timer"
        ></div>
    );
};

export default Timer;
