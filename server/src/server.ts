import http from "http";
import "dotenv/config";
import { Server } from "socket.io";
import { DrawLine, GameData, RandomWord, RoomData } from "./types/typing";
import { generateRoomCode } from "./utils/generateRoomCode";
import { getRandomWord } from "./utils/randomWord";

const server = http.createServer();

const usersInRoomMap = new Map<string, RoomData>();
const currGameDataInRoomMap = new Map<string, GameData>();
const colors = [
    "#ff4d4d", // red
    "#8fff82", // green
    "#5959ff", // blue
    "#82f5ff", // cyan
    "#ff5999", // pink
    "#c259ff", // purple
    "#ffb459", // orange
    "#fff873", // yellow
];

const MAX_SCORE = 180;
const DEP_IN_SCORE = 20;
// actual max score is 180 for 1st, then 160 for 2nd gusser, 140 for third.....

const io = new Server(server, {
    cors: {
        // chnage this to the url of production frontend
        origin: process.env.CLIENT_URL || "",
    },
});

io.on("connection", (socket) => {
    // rooms
    socket.on("create-room", ({ username }: { username: string }) => {
        let roomCode = generateRoomCode();
        while (usersInRoomMap.has(roomCode)) {
            roomCode = generateRoomCode();
        }

        socket.join(roomCode);

        const roomData: RoomData = {
            roomAdmin: username,
            turn: undefined,
            gameStatus: "LOBBY",
            roomCode,
            players: [
                {
                    ready: false,
                    score: 0,
                    username: username,
                    color: colors[0],
                    id: socket.id,
                },
            ],
        };
        usersInRoomMap.set(roomCode, roomData);

        socket.emit("room-data", { roomData });
        console.log(username, "created room!");
    });

    socket.on(
        "join-room",
        ({ username, roomCode }: { username: string; roomCode: string }) => {
            const roomData = usersInRoomMap.get(roomCode);
            if (!roomData) {
                return socket.emit("error", {
                    message: "Room does'nt exists!",
                });
            }
            if (roomData.players.length === 8) {
                return socket.emit("error", {
                    message: "Room full!",
                });
            }
            for (let i = 0; i < roomData.players.length; i++) {
                if (roomData.players[i].username === username) {
                    return socket.emit("error", {
                        message: "Username already exists!",
                    });
                }
            }
            if (roomData.gameStatus !== "LOBBY") {
                return socket.emit("error", {
                    message: "The game already in progress.",
                });
            }

            socket.join(roomCode);

            const player = {
                ready: false,
                score: 0,
                username,
                color: colors[roomData.players.length],
                id: socket.id,
            };
            roomData.players.push(player);

            socket.emit("room-data", { roomData });
            socket.to(roomCode).emit("joined-room", { player });
            console.log(username, "joined room!");
        }
    );

    socket.on(
        "leaving-room",
        ({ username, roomCode }: { username: string; roomCode: string }) => {
            const roomData = usersInRoomMap.get(roomCode);

            if (!roomData) {
                return socket.emit("error", {
                    message: "Room does'nt exists!",
                });
            }

            roomData.players = roomData.players.filter(
                (data) => data.username !== username
            );

            // todo -> what if curr denner lefts or if the player at the end of the players[] lefts?

            socket.to(roomCode).emit("left-room", { username });
            console.log(username, "leaved room!");

            if (roomData.players.length === 0) {
                usersInRoomMap.delete(roomCode);
                currGameDataInRoomMap.delete(roomCode);
            }
            if (username === roomData.roomAdmin) {
                io.in(roomCode).disconnectSockets(true);
            }
        }
    );

    // lobby
    socket.on(
        "player-ready",
        ({ username, roomCode }: { username: string; roomCode: string }) => {
            const roomData = usersInRoomMap.get(roomCode);
            if (!roomData) {
                return socket.emit("error", {
                    message: "Room does'nt exists!",
                });
            }

            roomData.players = roomData.players.map((data) => {
                if (data.username === username) {
                    data.ready = true;
                }
                return data;
            });

            io.to(roomCode).emit("room-data", { roomData });
        }
    );

    // in game
    socket.on(
        "start",
        ({ username, roomCode }: { username: string; roomCode: string }) => {
            const roomData = usersInRoomMap.get(roomCode);
            if (!roomData) {
                return socket.emit("error", {
                    message: "Room does'nt exists!",
                });
            }
            if (username !== roomData.roomAdmin) {
                return socket.emit("error", {
                    message: "You'r not the admin!",
                });
            }
            if (roomData.players.length < 2) {
                return socket.emit("error", {
                    message: "Atleast two players are required!",
                });
            }
            for (let i = 0; i < roomData.players.length; i++) {
                const player = roomData.players[i];
                if (!player.ready) {
                    return socket.emit("error", {
                        message: "Everyone's not ready!",
                    });
                }
            }

            roomData.gameStatus = "GAME";
            roomData.turn = 0;

            // all 3 events should be emitted in series not in parallel,
            // this is the best way i found to achive that (chain them up)
            io.to(roomCode).emit("room-data", { roomData }, () => {
                const randWord: RandomWord = getRandomWord(3);
                currGameDataInRoomMap.set(roomCode, {
                    word: randWord.word,
                    lastScore: MAX_SCORE,
                    alreadyGuessed: new Set(),
                });

                if (roomData.gameStatus !== "GAME") {
                    return;
                }

                // emit hint word to all
                io.to(roomCode).emit("word", { word: randWord.hint }, () => {
                    if (roomData.turn === undefined) {
                        return;
                    }
                    // emit to the denner(turn) only
                    io.to(roomData.players[roomData.turn].id).emit(
                        "word",
                        {
                            word: randWord.word,
                        },
                        () => {
                            io.to(roomCode).emit("start-timer");
                        }
                    );
                });
            });
        }
    );

    socket.on("word-next", async ({ roomCode }: { roomCode: string }) => {
        const roomData = usersInRoomMap.get(roomCode);
        if (!roomData) {
            return socket.emit("error", {
                message: "Room does'nt exists!",
            });
        }

        if (roomData.turn === undefined) {
            return socket.emit("error", {
                message: "Game not started yet!",
            });
        }

        if (roomData.turn >= roomData.players.length - 1) {
            roomData.gameStatus = "LEADERBOARD";
            roomData.turn = undefined;
        } else {
            roomData.gameStatus = "GAME";
            roomData.turn = roomData.turn + 1;
        }

        // all 3 events should be emitted in series not in parallel,
        // this is the best way i found to achive that (chain them up)
        io.to(roomCode).emit("room-data", { roomData }, () => {
            if (roomData.gameStatus !== "GAME") {
                return;
            }

            const randWord: RandomWord = getRandomWord(3);
            currGameDataInRoomMap.set(roomCode, {
                word: randWord.word,
                lastScore: MAX_SCORE,
                alreadyGuessed: new Set(),
            });

            // clearing canvas
            io.to(roomCode).emit("clear");

            // emit hint word to all
            io.to(roomCode).emit("word", { word: randWord.hint }, () => {
                if (roomData.turn === undefined) {
                    return;
                }
                // emit to the denner(turn) only
                io.to(roomData.players[roomData.turn].id).emit(
                    "word",
                    {
                        word: randWord.word,
                    },
                    () => {
                        io.to(roomCode).emit("start-timer");
                    }
                );
            });
        });
    });

    socket.on(
        "times-up",
        ({ word, roomCode }: { word: string; roomCode: string }) => {
            // chaining
            io.to(roomCode).emit("times-up", () => {
                io.to(roomCode).emit("word", { word }, () => {
                    io.to(roomCode).emit("message-received", {
                        username: "",
                        message: `Times up! word was ${word.toUpperCase()}`,
                        popup: true,
                    });
                });
            });
        }
    );

    // kick
    socket.on(
        "kick-player",
        ({
            playerUsername,
            username,
            roomCode,
        }: {
            playerUsername: string;
            username: string;
            roomCode: string;
        }) => {
            const roomData = usersInRoomMap.get(roomCode);
            if (!roomData) {
                return socket.emit("error", {
                    message: "Room does'nt exists!",
                });
            } else if (roomData.roomAdmin !== username) {
                return socket.emit("error", {
                    message: "Room admin can only kick!",
                });
            }

            const id = roomData.players.filter((data) => {
                if (data.username === playerUsername) {
                    return data;
                }
            })[0].id;

            roomData.players = roomData.players.filter(
                (data) => data.username !== playerUsername
            );

            // todo -> what if curr denner lefts or if the player at the end of the players[] lefts?
            io.to(roomCode).emit("kicked", { playerUsername }, () => {
                io.to(id).emit(
                    "error",
                    { messsage: "Admin kicked you!" },
                    () => {
                        io.to(id).disconnectSockets();
                    }
                );
            });
        }
    );

    // play again
    socket.on(
        "play-again",
        ({ username, roomCode }: { username: string; roomCode: string }) => {
            console.log("play again", username);

            const roomData = usersInRoomMap.get(roomCode);
            if (roomData === undefined) {
                return;
            }
            if (username === roomData.roomAdmin) {
                // resetting roomData
                roomData.gameStatus = "LOBBY";
                roomData.turn = undefined;
                roomData.players = roomData.players.map((data) => {
                    return {
                        color: data.color,
                        id: data.id,
                        ready: false,
                        score: 0,
                        username: data.username,
                    };
                });

                io.to(roomCode).emit("room-data", { roomData });
            } else {
                socket.emit("error", { message: "Waiting for room admin" });
            }
        }
    );

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
    socket.on(
        "message-send",
        ({
            username,
            message,
            roomCode,
        }: {
            username: string;
            message: string;
            roomCode: string;
        }) => {
            const curr = currGameDataInRoomMap.get(roomCode);
            const roomData = usersInRoomMap.get(roomCode);
            if (roomData === undefined) {
                return;
            }

            // denner can't send message
            if (
                roomData.turn !== undefined &&
                roomData.players[roomData.turn].username === username
            ) {
                return;
            } else if (message.toLowerCase() === curr?.word) {
                if (
                    curr !== undefined &&
                    curr.alreadyGuessed !== undefined &&
                    !curr.alreadyGuessed.has(username)
                ) {
                    // one user, one guess, one time point allocation
                    for (let i = 0; i < roomData.players.length; i++) {
                        if (roomData.players[i].username === username) {
                            roomData.players[i].score += curr.lastScore;
                            curr.lastScore -= DEP_IN_SCORE;
                            curr.alreadyGuessed.add(username);
                            break;
                        }
                    }

                    io.to(roomCode).emit("message-received", {
                        username,
                        message: "GUESSED!",
                        popup: true,
                        highlight: true,
                    });

                    // times-up if all guessed (from times-up listener)
                    if (
                        curr.alreadyGuessed.size ===
                        roomData.players.length - 1
                    ) {
                        io.to(roomCode).emit("times-up", () => {
                            io.to(roomCode).emit(
                                "word",
                                { word: curr.word },
                                () => {
                                    io.to(roomCode).emit("message-received", {
                                        username: "",
                                        message: `Everyone guessed! word was ${curr.word.toUpperCase()}`,
                                        popup: true,
                                        highlight: true,
                                    });
                                }
                            );
                        });
                    }
                } else {
                    socket.emit("error", {
                        message: "Already guessed!",
                    });
                }
            }

            // for normal messages
            else {
                io.to(roomCode).emit("message-received", {
                    username,
                    message,
                    popup: false,
                    highlight: false,
                });
            }
        }
    );
});

server.listen(process.env.PORT || 3000, () => {
    console.log(`server listening to port ${process.env.PORT || 3000}`);
});
