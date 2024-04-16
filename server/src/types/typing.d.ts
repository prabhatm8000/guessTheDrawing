export type RoomData = {
    roomAdmin: string;
    players: Set<string>;
}

export type DrawLine = {
    prevPos: MousePosInCanvas | null;
    currentPos: MousePosInCanvas;
    lineColor: string;
    roomCode: string;
};

export type MousePosInCanvas = { x: number; y: number };
