import { useNavigate } from "react-router-dom";
import { useRoomDataContext } from "../hooks/useRoomDataContext";
import { useSocket } from "../hooks/useSocket";
import { useUserContext } from "../hooks/useUserContext";
import { useMessageContext } from "../hooks/useMessageContext";

const PlayersBox = () => {
    const navigate = useNavigate();
    const { socket } = useSocket();
    const { state: userState, dispatch: userDispatch } = useUserContext();
    const { state: roomDataState } = useRoomDataContext();
    const { dispatch: dispatchMessage } = useMessageContext();

    const handleLeaveBtn = () => {
        userDispatch({ type: "SET", payload: { username: "", roomCode: "" } });
        dispatchMessage({ type: "RESET" });
        socket.emit("leaving-room", {
            username: userState.username,
            roomCode: userState.roomCode,
        });
        socket.disconnect();
        navigate("/");
    };

    return (
        <div className="grid grid-cols-[2fr_6fr] gap-2">
            {/* your data */}
            <div className="h-full flex items-center gap-2 border border-black p-2 rounded-md">
                <div className="flex flex-col justify-center">
                    <span>{userState.username}(You)</span>
                    <span>Room code: {userState.roomCode}</span>
                </div>
                <button onClick={handleLeaveBtn}>leave</button>
            </div>

            {/* other players data */}
            <div className="h-full grid grid-rows-[1fr_1fr] grid-cols-[1fr_1fr_1fr_1fr] border border-black rounded-md">
                {roomDataState &&
                    roomDataState.players.map((data, index) => {
                        return (
                            <div
                                className="flex justify-center items-center"
                                key={index}
                            >
                                {data}
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};

export default PlayersBox;
