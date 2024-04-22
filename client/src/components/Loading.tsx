import ReactLoading from "react-loading";

const Loading = () => {
    return (
        <div className="absolute top-[50%] translate-y-[-50%] flex flex-col justify-center items-center gap-4 bg-[#111] size-[350px] p-4 rounded-lg">
            <ReactLoading color="#ddd" height={70} width={70} type="spin" />
            <div className="text-center text-sm flex flex-col">
                <span>
                    *Socket server deployed on render may go down, 'cause of no
                    activity.
                </span>
                <span>*Please wait till it spins back up.</span>
            </div>
        </div>
    );
};

export default Loading;
