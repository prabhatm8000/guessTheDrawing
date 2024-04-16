const charSet = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
];

export const generateRoomCode = (roomCodeLen: number = 6): string => {
    let code = "";
    for (let index = 0; index < roomCodeLen; index++) {
        const randomPos = Math.round(Math.random() * (charSet.length - 1));
        code += charSet[randomPos];
    }
    return code;
};
