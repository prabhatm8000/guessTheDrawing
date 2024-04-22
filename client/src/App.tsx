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
import { useWordContext } from "./hooks/useWordContext";
import NavBar from "./components/NavBar";

function App() {
    const { state: userState, dispatch: userDispatch } = useUserContext();
    const { dispatch: dispatchMessage } = useMessageContext();
    const { dispatch: dispatchRoomData } = useRoomDataContext();
    const { dispatch: dispatchError } = useErrorContext();
    const { dispatch: dispatchWord } = useWordContext();

    const { socket, socketProcessRoomOn, socketProcessRoomOff } = useSocket();

    // handling, roomData, join, leave, error, messages
    useEffect(() => {
        socketProcessRoomOn(
            userState,
            userDispatch,
            dispatchMessage,
            dispatchRoomData,
            dispatchError,
            dispatchWord
        );
        return socketProcessRoomOff;
    }, [userState.username, socketProcessRoomOn, socketProcessRoomOff]);

    // handling tab close
    useEffect(() => {
        function handleTabClose(e: BeforeUnloadEvent) {
            return socket.emit("leaving-room", {
                username: userState.username,
                roomCode: userState.roomCode,
            });
        }
        window.addEventListener("beforeunload", handleTabClose);

        return () => {
            window.removeEventListener("beforeunload", handleTabClose);
        };
    });

    return (
        <div className="container m-auto px-2 w-[1400px] select-none flex justify-center items-center">
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <>
                                <NavBar />
                                <Home />
                            </>
                        }
                    />
                    <Route
                        path="/join-create-room"
                        element={
                            <>
                                <NavBar />
                                <JoinCreateRoom />
                            </>
                        }
                    />
                    <Route path="/room" element={<Room />} />

                    <Route path="*" element={<Navigate to={"/"} />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
