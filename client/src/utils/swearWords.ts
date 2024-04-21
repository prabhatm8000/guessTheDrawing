const swearWords = new Set([
    "arse",
    "arsehead",
    "arsehole",
    "ass",
    "asshole",
    "bastard",
    "bitch",
    "bloody",
    "bollocks",
    "brotherfucker",
    "bugger",
    "bullshit",
    "child-fucker",
    "cock",
    "cocksucker",
    "crap",
    "cunt",
    "cyka blyat",
    "damn",
    "damn it",
    "dick",
    "dickhead",
    "dyke",
    "fatherfucker",
    "frigger",
    "fuck",
    "goddamn",
    "godsdamn",
    "hell",
    "holy shit",
    "horseshit",
    "in shit",
    "kike",
    "motherfucker",
    "nigga",
    "nigra",
    "pigfucker",
    "piss",
    "prick",
    "pussy",
    "shit",
    "shit ass",
    "shite",
    "sisterfucker",
    "slut",
    "son of a whore",
    "son of a bitch",
    "spastic",
    "sweet Jesus",
    "turd",
    "twat",
    "wanker",
]);

export const bleepSwearWords = (str: string): string => {
    str = str.trim();
    const words = str.split(" ");
    let res = "";
    for (let index = 0; index < words.length; index++) {
        const word = words[index];
        if (swearWords.has(word)) {
            res += " " + "*".repeat(word.length);
        } else {
            res += " " + word;
        }
    }
    return res.trim();
};
