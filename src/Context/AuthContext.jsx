import {createContext, useEffect, useReducer} from "react";

//Functions for localStorage operations
const saveUserToLocalStorage = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
}

const removeUserFromLocalStorage = () => {
    localStorage.removeItem("user");
}

const getUserFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem("user"));
}

//Initial state
const initialState = {
    user: null
}

//Reducer Function
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOGIN":
            // console.log("action hit ", action.payload);
            saveUserToLocalStorage(action.payload);
            return {...state, user: action.payload}

        case "LOGOUT":
            removeUserFromLocalStorage()
            return {...state, user: null}

        default:
            return state;
    }
}

//Create AuthContext
const AuthContext = createContext({})

//AuthContext Provider Component
const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        try {
            const storedUser = getUserFromLocalStorage()

            console.log("stored user >> ", storedUser)

            if (storedUser) {
                dispatch({type: "LOGIN", payload: storedUser})
            } else {
                dispatch({type: "LOGOUT"})
            }
        } catch {
            dispatch({type: "LOGOUT"})
        }
    }, [])

    return (<AuthContext.Provider value={{...state, dispatch}}>{children}</AuthContext.Provider>)
}

export {AuthContext, AuthContextProvider};