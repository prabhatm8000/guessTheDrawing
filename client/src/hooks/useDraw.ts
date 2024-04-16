import { useEffect, useRef, useState } from "react";

export const useDraw = (
    onDraw: ({ ctx, currentPos, prevPos }: Draw) => void
) => {
    const [mouseDown, setMouseDown] = useState<boolean>(false);

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const prevMousePos = useRef<null | MousePosInCanvas>(null);

    const onMouseDown = () => setMouseDown(true);

    const clear = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    useEffect(() => {
        const canvasMouseMoveHandler = (e: MouseEvent) => {
            
            const currentMousePos = calculateMousePosInCanvas(e);
            
            const ctx = canvasRef.current?.getContext("2d");
            if (!ctx || !currentMousePos) return;

            if (!mouseDown) return;
            onDraw({
                ctx,
                currentPos: currentMousePos,
                prevPos: prevMousePos.current,
            });
            prevMousePos.current = currentMousePos;
        };

        const calculateMousePosInCanvas = (
            e: MouseEvent
        ): MousePosInCanvas | undefined => {
            const canvas = canvasRef.current;
            if (!canvas) return;

            const react = canvas.getBoundingClientRect();
            const x = e.clientX - react.left;
            const y = e.clientY - react.top;

            return { x, y };
        };

        const mouseUpHandler = () => {
            setMouseDown(false);
            prevMousePos.current = null;
        };

        canvasRef.current?.addEventListener(
            "mousemove",
            canvasMouseMoveHandler
        );
        // canvasRef.current?.addEventListener("mousedown", () => setMouseDown(true));
        window.addEventListener("mouseup", mouseUpHandler);

        return () => {
            canvasRef.current?.removeEventListener(
                "mousemove",
                canvasMouseMoveHandler
            );
            window.removeEventListener("mouseup", mouseUpHandler);
        };
    }, [onDraw]);

    return { canvasRef, onMouseDown, clear };
};
