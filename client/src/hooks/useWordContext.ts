import { useContext } from "react";
import { WordContext } from "../contexts/wordContext";

export const useWordContext = () => {
    return useContext(WordContext);
};