import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import {AuthContextProvider} from "./Context/AuthContext.jsx";
import Routes from "./routes/routes.jsx";
import "./index.css";


createRoot(document.getElementById("root")).render(
    <StrictMode>
        <AuthContextProvider>
            <Routes/>
        </AuthContextProvider>
    </StrictMode>
);
