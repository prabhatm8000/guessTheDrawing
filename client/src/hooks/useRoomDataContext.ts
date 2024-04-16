import { useContext } from "react";
import { RoomDataContext } from "../contexts/roomDataContext";

export const useRoomDataContext = () => {
    return useContext(RoomDataContext);
};