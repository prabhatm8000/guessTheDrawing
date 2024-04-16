import { useContext } from "react";
import { MessageContext } from "../contexts/messageContext";

export const useMessageContext = () => {
    return useContext(MessageContext);
};