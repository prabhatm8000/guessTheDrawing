import express from "express";
import http from "http";
import { Server } from "socket.io";
import { DrawLine, RoomData } from "./types/typing";
import { generateRoomCode } from "./utils/generateRoomCode";
import { bleepSwearWords } from "./utils/swearWords";

const app = express();
const server = http.createServer(app);

const usersInRoomMap = new Map<string, RoomData>();

const io = new Server(server, {
    cors: {
        // chnage this to the url of production frontend
        origin: "*",
    },
});

io.on("connection", (socket) => {
    // rooms
    socket.on("create-room", ({ username }) => {
        let roomCode = generateRoomCode();
        while (usersInRoomMap.has(roomCode)) {
            roomCode = generateRoomCode();
        }

        socket.join(roomCode);

        const roomData: RoomData = {
            roomAdmin: username,
            players: new Set([username]),
        };
        usersInRoomMap.set(roomCode, roomData);

        socket.emit("room-data", {
            username,
            roomCode,
            roomData: {
                roomAdmin: roomData.roomAdmin,
                // Set is not directly serializable out sockets (players: Set<string>)
                players: Array.from(roomData.players),
            },
        });
        console.log(username, "created room!");
    });

    socket.on("join-room", ({ username, roomCode }) => {
        const roomData = usersInRoomMap.get(roomCode);
        if (!roomData) {
            return socket.emit("error", {
                message: "Room does'nt exists!",
            });
        }
        if (roomData.players.size === 8) {
            return socket.emit("error", {
                message: "Room full!",
            });
        }
        if (roomData.players.has(username)) {
            return socket.emit("error", {
                message: "Username already exists!",
            });
        }

        socket.join(roomCode);
        roomData.players.add(username);

        socket.emit("room-data", {
            username,
            roomCode,
            roomData: {
                roomAdmin: roomData.roomAdmin,
                // Set is not directly serializable out sockets (players: Set<string>)
                players: Array.from(roomData.players),
            },
        });
        socket.to(roomCode).emit("joined-room", { username });
        console.log(username, "joined room!");
    });

    socket.on("leaving-room", ({ username, roomCode }) => {
        const roomData = usersInRoomMap.get(roomCode);
        if (!roomData) {
            return socket.emit("error", {
                message: "Room does'nt exists!",
            });
        }
        roomData.players.delete(username);

        socket.to(roomCode).emit("left-room", { username });
        console.log(username, "leaved room!");
    });

    // drawing
    socket.on(
        "draw-line",
        ({ prevPos, currentPos, lineColor, roomCode }: DrawLine) => {
            // send to all (but, not the sender)
            socket.broadcast.to(roomCode).emit("draw-line", {
                prevPos,
                currentPos,
                lineColor,
                roomCode,
            });
        }
    );

    socket.on("clear", ({ roomCode }) => {
        // send to all (including the sender)
        socket.to(roomCode).emit("clear");
    });

    // messages
    socket.on("message-send", ({ username, message, roomCode }) => {
        const bleepedMessage = bleepSwearWords(message);
        io.to(roomCode).emit("message-send", {
            username,
            message: bleepedMessage,
        });
    });
});

server.listen(3000, () => {
    console.log("server listening to port 3000");
});
