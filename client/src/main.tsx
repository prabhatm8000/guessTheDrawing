import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { UserContextProvider } from "./contexts/userContext.tsx";
import { MessageContextProvider } from "./contexts/messageContext.tsx";
import { RoomDataContextProvider } from "./contexts/roomDataContext.tsx";
import { ErrorContextProvider } from "./contexts/errorContext.tsx";
import { WordContextProvider } from "./contexts/wordContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ErrorContextProvider>
            <UserContextProvider>
                <RoomDataContextProvider>
                    <MessageContextProvider>
                        <WordContextProvider>
                            <App />
                        </WordContextProvider>
                    </MessageContextProvider>
                </RoomDataContextProvider>
            </UserContextProvider>
        </ErrorContextProvider>
    </React.StrictMode>
);
