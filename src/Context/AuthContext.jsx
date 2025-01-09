import {createContext} from "react";

const AuthContext = createContext({})


const AuthContextProvider = ({children}) => {
    const user = {
        name: "Auth",
    }
    return (<AuthContext.Provider value={user}>{children}</AuthContext.Provider>)
}

export {AuthContext, AuthContextProvider};