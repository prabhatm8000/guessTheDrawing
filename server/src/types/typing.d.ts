export type RoomData = {
    roomAdmin: string;
    turn: number | undefined;
    gameStatus: "LOBBY" | "GAME" | "LEADERBOARD";
    roomCode: string;
    players: Player[];
};

export type GameData = {
    word: string;
    lastScore: number;
    alreadyGuessed: Set<string> | undefined;
};

export type Player = {
    username: string;
    ready: boolean;
    score: number;
    color: string;
    id: string;
};

export type DrawLine = {
    prevPos: MousePosInCanvas | null;
    currentPos: MousePosInCanvas;
    lineColor: string;
    roomCode: string;
};

export type RandomWord = {
    word: string;
    hint: string;
};

export type MousePosInCanvas = { x: number; y: number };
