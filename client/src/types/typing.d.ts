type User = {
    username: string;
    roomCode: string | undefined;
};

type RoomData = {
    roomAdmin: string;
    turn: number | undefined;
    gameStatus: "LOBBY" | "GAME" | "LEADERBOARD";
    roomCode: string;
    players: Player[];
};

type Player = {
    color: string;
    username: string;
    ready: boolean;
    score: number;
};

type Draw = {
    ctx: CanvasRenderingContext2D;
    currentPos: MousePosInCanvas;
    prevPos: MousePosInCanvas | null;
};

type MousePosInCanvas = { x: number; y: number };

type DrawLine = {
    prevPos: MousePosInCanvas | null;
    currentPos: MousePosInCanvas;
    lineColor: string;
    roomCode: string;
};

type MessageData = {
    username: string;
    message: string;
    popup: boolean | undefined;
    highlight: boolean | undefined;
};

// contexts
type UserStateType = User;

type UserActionType =
    | {
          type: "SET";
          payload: User;
      }
    | {
          type: "ADD_ROOMCODE";
          payload: string;
      };

type RoomDataStateType = RoomData | undefined;

type RoomDataActionType =
    | {
          type: "SET";
          payload: RoomData | undefined;
      }
    | {
          type: "REMOVE_PLAYER";
          payload: string;
      }
    | {
          type: "ADD_PLAYER";
          payload: Player;
      };

type MessageStateType = MessageData[];

type MessageActionType =
    | {
          type: "ADD";
          payload: MessageData;
      }
    | {
          type: "RESET";
      };

type ErrorActionType =
    | {
          type: "SET";
          payload: string;
      }
    | {
          type: "RESET";
      };


type WordActionType =
    | {
          type: "SET";
          payload: string;
      }
    | {
          type: "RESET";
      };
