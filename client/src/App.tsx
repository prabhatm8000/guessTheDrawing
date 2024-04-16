import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSocket } from "./hooks/useSocket";
import { useEffect } from "react";
import { useUserContext } from "./hooks/useUserContext";
import { useMessageContext } from "./hooks/useMessageContext";
import { useRoomDataContext } from "./hooks/useRoomDataContext";
import { useErrorContext } from "./hooks/useErrorContext";
import Room from "./pages/Room";
import JoinCreateRoom from "./pages/JoinCreateRoom";
import Home from "./pages/Home";

function App() {
    const { state: userState, dispatch: userDispatch } = useUserContext();
    const { dispatch: dispatchMessage } = useMessageContext();
    const { dispatch: dispatchRoomData } = useRoomDataContext();
    const { dispatch: dispatchError } = useErrorContext();

    const { socketProcessRoomOn, socketProcessRoomOff } = useSocket();

    useEffect(() => {
        socketProcessRoomOn(
            userState,
            userDispatch,
            dispatchMessage,
            dispatchRoomData,
            dispatchError
        );
        return socketProcessRoomOff;
    }, [socketProcessRoomOn, socketProcessRoomOff]);

    return (
        <div className="container m-auto p-2 w-[1400px]">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route
                        path="/join-create-room"
                        element={<JoinCreateRoom />}
                    />
                    <Route path="/room" element={<Room />} />

                    <Route path="*" element={<Navigate to={"/"} />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
