type RoomData = {
    roomAdmin: string;
    players: string[];
};

type EnterRoomData = {
    username: string;
    roomCode: string | undefined;
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
    joinLeaveMessage: boolean | undefined;
};

// contexts
type UserStateType = EnterRoomData;

type UserActionType = {
    type: "SET";
    payload: EnterRoomData;
};

type RoomDataStateType = RoomData | undefined;

type RoomDataActionType =
    | {
          type: "SET";
          payload: RoomData;
      }
    | {
          type: "REMOVE_PLAYER";
          payload: string;
      } | {
        type: "ADD_PLAYER";
        payload: string;
      };

type MessageStateType = MessageData[];

type MessageActionType = {
    type: "ADD";
    payload: MessageData;
} | {
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
