import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { UserContextProvider } from "./contexts/user-context.tsx";
import { SocketContextProvider } from "./contexts/socket-context.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <UserContextProvider>
        <SocketContextProvider>
          <App />
        </SocketContextProvider>
      </UserContextProvider>
    </BrowserRouter>
  </StrictMode>
);
