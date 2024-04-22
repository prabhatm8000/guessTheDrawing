import ended from "../assets/audios/ended.ogg";
import guessed from "../assets/audios/guessed.ogg";
import join from "../assets/audios/join.ogg";
import leave from "../assets/audios/leave.ogg";
import started from "../assets/audios/started.ogg";
import tick from "../assets/audios/tick.ogg";

const audioObjRef = new Audio();

export const useAudioFx = () => {
    const setFx = ({
        fx,
    }: {
        fx: "JOIN" | "LEAVE" | "GUESSED" | "STARTED" | "ENDED" | "TICK";
    }) => {
        switch (fx) {
            case "ENDED":
                audioObjRef.src = ended;
                break;
            case "GUESSED":
                audioObjRef.src = guessed;
                break;
            case "JOIN":
                audioObjRef.src = join;
                break;
            case "LEAVE":
                audioObjRef.src = leave;
                break;
            case "STARTED":
                audioObjRef.src = started;
                break;
            case "TICK":
                audioObjRef.src = tick;
                break;
        }
    };

    const playFx = () => {
        audioObjRef
            .play()
            .catch((error) => console.error("Error playing audio:", error));
    };

    return { setFx, playFx };
};
