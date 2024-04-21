import ended from "../static/audio/ended.ogg";
import guessed from "../static/audio/guessed.ogg";
import join from "../static/audio/join.ogg";
import leave from "../static/audio/leave.ogg";
import started from "../static/audio/started.ogg";
import tick from "../static/audio/tick.ogg";

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
