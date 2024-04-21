import { useRoomDataContext } from "../hooks/useRoomDataContext";
import { useUserContext } from "../hooks/useUserContext";
import AvtarSvg from "./AvtarSvg";

const PlayersBox = () => {
    const { state: userState } = useUserContext();
    const { state: roomDataState } = useRoomDataContext();

    if (!roomDataState) {
        return <>RoomData not avilable!</>;
    }

    return (
        <div className="grid grid-cols-[2fr_6fr] gap-2">
            {/* curr player data */}
            <div className="h-full flex flex-col items-center justify-center gap-4 border border-white p-2 rounded-md">
                <span className="text-center flex justify-center items-center gap-2">
                    {roomDataState.turn !== undefined ? (
                        <>
                            <AvtarSvg
                                className="size-[60px]"
                                color={
                                    roomDataState.players[roomDataState.turn]
                                        .color
                                }
                            />
                            {roomDataState.players[roomDataState.turn].username}
                            {roomDataState.players[roomDataState.turn]
                                .username === userState.username && "(You)"}
                            {" is drawing."}
                        </>
                    ) : (
                        <>{"Waiting for Players..."}</>
                    )}
                </span>
                <span>
                    Room code:{" "}
                    <span className="select-all">{roomDataState.roomCode}</span>
                </span>
            </div>

            {/* other players data */}
            <div className="h-full grid grid-rows-[1fr_1fr] grid-cols-[1fr_1fr_1fr_1fr] gap-1 p-1 border border-white rounded-md">
                {roomDataState.players.map((player, index) => {
                    return (
                        <div
                            className="p-2 flex justify-center items-center gap-2 bg-stone-900 text-sm"
                            key={index}
                        >
                            <AvtarSvg
                                color={player.color}
                                className="size-[30px]"
                            />
                            <div className="flex flex-col justify-center items-center">
                                <span>
                                    {player.username}
                                    {player.username === userState.username &&
                                        "(You)"}
                                </span>
                                <span>
                                    Score:{" "}
                                    <span className="font-bold">
                                        {player.score}
                                    </span>
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default PlayersBox;
