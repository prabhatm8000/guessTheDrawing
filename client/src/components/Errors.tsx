import { CgClose } from "react-icons/cg";
import { useErrorContext } from "../hooks/useErrorContext";

const Errors = () => {
    const { state: errorState, dispatch: dispatchError } = useErrorContext();
    function hideErrorToast() {
        dispatchError({ type: "RESET" });
    }

    return (
        <>
            {errorState.length !== 0 && (
                <div className="fixed bottom-0 right-0 m-2 p-1 flex justify-between items-center gap-1 bg-red-400 text-white text-lg rounded-md">
                    <span className="bg-red-500 px-3 py-2 rounded-sm">Error: {errorState}</span>
                    <button className="bg-red-500 p-3 rounded-sm " onClick={hideErrorToast}>
                        <CgClose />
                    </button>
                </div>
            )}
        </>
    );
};

export default Errors;
