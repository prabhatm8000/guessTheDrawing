import { useEffect } from "react";
import DrawingCanvas from "../components/DrawingCanvas";
import Errors from "../components/Errors";
import LeaderBoard from "../components/LeaderBoard";
import Lobby from "../components/Lobby";
import MessageBox from "../components/MessageBox";
import MissingPlacesWordBox from "../components/MissingPlacesWordBox";
import NavBar from "../components/NavBar";
import PlayersBox from "../components/PlayersBox";
import { useRoomDataContext } from "../hooks/useRoomDataContext";
import { useNavigate } from "react-router-dom";

const Room = () => {
    const { state: roomDataState } = useRoomDataContext();

    const navigate = useNavigate();

    useEffect(() => {
        if (roomDataState === undefined) {
            navigate("/");
        }
    }, [roomDataState]);

    return (
        <>
            <NavBar />
            <div className="p-[82px] grid grid-cols-[800px_300px] gap-2 h-[820px]">
                <div className="relative grid grid-rows-[125px_50px_640px] gap-2">
                    <PlayersBox />
                    <MissingPlacesWordBox />
                    {roomDataState?.gameStatus === "LOBBY" && <Lobby />}
                    {roomDataState?.gameStatus === "GAME" && <DrawingCanvas />}
                    {roomDataState?.gameStatus === "LEADERBOARD" && (
                        <LeaderBoard />
                    )}
                    <span className="absolute bottom-0 left-[350px] text-red-400 font-sketchit">
                        *Don't refresh the page
                    </span>
                </div>
                <MessageBox />
                <div>
                    <Errors />
                </div>
            </div>
        </>
    );
};

export default Room;
