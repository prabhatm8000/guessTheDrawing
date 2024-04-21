import { useEffect, useState } from "react";
import { useUserContext } from "../hooks/useUserContext";
import { useDraw } from "../hooks/useDraw";
import { ChromePicker } from "react-color";
import { CgClose, CgColorPicker } from "react-icons/cg";
import { drawLine } from "../utils/drawLine";
import { useSocket } from "../hooks/useSocket";
import { useRoomDataContext } from "../hooks/useRoomDataContext";

const DrawingCanvas = () => {
    const { socket } = useSocket();
    const { state: userState } = useUserContext();
    const { state: roomDataState } = useRoomDataContext();

    const [showColorPicker, setShowColorPicker] = useState<boolean>(false);
    const [lineColor, setLineColor] = useState<string>("#fff");

    const { canvasRef, onMouseDown, clear } = useDraw(createLine);

    useEffect(() => {
        const ctx = canvasRef.current?.getContext("2d");

        socket.on(
            "draw-line",
            ({ prevPos, currentPos, lineColor }: DrawLine) => {
                if (!ctx) return;
                drawLine({ prevPos, currentPos, ctx, lineColor });
            }
        );

        socket.on("clear", clear);

        return () => {
            socket.off("draw-line");
            socket.off("clear");
        };
    }, [canvasRef, userState]);

    function createLine({ prevPos, currentPos, ctx }: Draw) {
        if (
            roomDataState &&
            roomDataState.turn !== undefined &&
            roomDataState.players[roomDataState.turn].username ===
                userState.username
        ) {
            socket.emit("draw-line", {
                prevPos,
                currentPos,
                lineColor,
                roomCode: userState.roomCode,
            });
            drawLine({ prevPos, currentPos, ctx, lineColor });
        }
    }

    const handleClearBtn = () => {
        clear();
        socket.emit("clear", { roomCode: userState.roomCode });
    };
    return (
        <div className="relative">
            <canvas
                onMouseDown={onMouseDown}
                onTouchStart={onMouseDown}
                ref={canvasRef}
                height={640}
                width={800}
                className="border border-white rounded-lg"
            />

            {showColorPicker && (
                <ChromePicker
                    className="absolute bottom-12 right-0 mx-12 my-2"
                    color={lineColor}
                    onChange={(e) => setLineColor(e.hex)}
                    disableAlpha={true}
                />
            )}

            {roomDataState &&
                roomDataState.turn !== undefined &&
                roomDataState.players[roomDataState.turn].username ===
                    userState.username && (
                    <>
                        <button
                            className={`absolute bottom-0 right-0 text-xl p-2 m-2 rounded-full border-2 border-white ${
                                showColorPicker
                                    ? "bg-white text-black"
                                    : "bg-black text-white"
                            } transition-colors delay-50 duration-200`}
                            type="button"
                            onClick={() => setShowColorPicker((prev) => !prev)}
                        >
                            {showColorPicker ? <CgClose /> : <CgColorPicker />}
                        </button>

                        <button
                            className="absolute bottom-0 px-2 py-1 m-2 rounded-md border border-white bg-white text-black text-sm font-semibold"
                            type="button"
                            onClick={handleClearBtn}
                        >
                            Clear Canvas
                        </button>
                    </>
                )}
        </div>
    );
};

export default DrawingCanvas;
