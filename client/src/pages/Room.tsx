import DrawingCanvas from "../components/DrawingCanvas";
import MessageBox from "../components/MessageBox";
import PlayersBox from "../components/PlayersBox";

const Room = () => {
    return (
        <div className="grid grid-cols-[800px_400px] gap-2 h-[880px] justify-center">
            <div className="grid grid-rows-[75px_800px] gap-2">
                <PlayersBox />
                <DrawingCanvas />
            </div>
            <MessageBox />
            <div>
                <span className="text-red-500 text-sm">*Don't refresh the page</span>
            </div>
        </div>
    );
};

export default Room;
