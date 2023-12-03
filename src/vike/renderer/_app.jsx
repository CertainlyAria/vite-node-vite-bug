import { StrictMode } from "react";

function App({ children}) {

    return (
        <StrictMode>
            {children}
        </StrictMode>
    );
}

export { App };
