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
        const canvasMouseMoveHandler = (e: MouseEvent | TouchEvent) => {
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
            e: MouseEvent | TouchEvent
        ): MousePosInCanvas | undefined => {
            const canvas = canvasRef.current;
            if (!canvas) return;

            const react = canvas.getBoundingClientRect();
            if (e instanceof TouchEvent) {
                const x = e.touches[0].clientX - react.left;
                const y = e.touches[0].clientY - react.top;

                return { x, y };
            } else {
                const x = e.clientX - react.left;
                const y = e.clientY - react.top;

                return { x, y };
            }
        };

        const mouseUpHandler = () => {
            setMouseDown(false);
            prevMousePos.current = null;
        };

        canvasRef.current?.addEventListener(
            "mousemove",
            canvasMouseMoveHandler
        );
        window.addEventListener("mouseup", mouseUpHandler);

        canvasRef.current?.addEventListener(
            "touchmove",
            canvasMouseMoveHandler
        );
        window.addEventListener("touchend", mouseUpHandler);

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
