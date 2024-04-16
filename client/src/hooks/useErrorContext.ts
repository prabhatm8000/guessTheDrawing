import { useContext } from "react";
import { ErrorContext } from "../contexts/errorContext";

export const useErrorContext = () => {
    return useContext(ErrorContext);
};