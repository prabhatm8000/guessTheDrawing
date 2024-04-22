import { useRoomDataContext } from "../hooks/useRoomDataContext";
import { useWordContext } from "../hooks/useWordContext";
import Timer from "./Timer";

const MissingPlacesWordBox = () => {
    const { state: roomDataState } = useRoomDataContext();
    const { state: word } = useWordContext();

    return (
        <div className="grid grid-cols-[2fr_6fr] gap-2">
            <Timer />

            <div className="flex justify-center items-center gap-1 text-3xl uppercase border border-stone-400 p-1 rounded-md font-mono">
                <div id="word" className="hidden">
                    {word}
                </div>
                {word.length === 0 || roomDataState?.gameStatus !== "GAME" ? (
                    <>{"Waiting..."}</>
                ) : (
                    <>
                        {word.split("").map((data, index) => {
                            if (data === "*") {
                                return (
                                    <span
                                        key={index}
                                        className="px-[8px] py-[12px] border-b-2 border-stone-400"
                                    ></span>
                                );
                            } else if (data === " ") {
                                return (
                                    <span
                                        key={index}
                                        className="px-[8px] py-[12px]"
                                    ></span>
                                );
                            }
                            return <span key={index}>{data}</span>;
                        })}
                    </>
                )}
            </div>
        </div>
    );
};

export default MissingPlacesWordBox;
