import { createContext, useContext, useReducer, useEffect } from "react";

// Initial state
const user = localStorage.getItem('user');
const initialState = {
    user: localStorage.getItem('user') === undefined 
    ? JSON.parse(localStorage.getItem('user'))
    : null,
    role: localStorage.getItem('role') || null,
    token: localStorage.getItem("token") || null,
};

// Create Context
export const AuthContext = createContext(initialState);

// Reducer function
const authReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_START":
            return {
                ...state,
                user: null,
                role: null,
                token: null,
            };

        case "LOGIN_SUCCESS":
            return {
                ...state,
                user: action.payload.user,
                role: action.payload.role,
                token: action.payload.token,
            };

        case "LOGOUT":
            return {
                ...state,
                user: null,
                role: null,
                token: null,
            };

        default:
            return state;
    }
};


export const authContextProvider = ({ children }) => {
    const { state, dispatch } = useReducer(authReducer, initialState)

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(state.user))
        localStorage.setItem('token', state.token)
        localStorage.setItem('role', state.role)
    }, [state]);

    return (
        <AuthContext.Provider
            value={{
                user: state.user,
                token: state.token,
                role: state.role,
                dispatch,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// Custom Hook for using the AuthContext
export const useAuthContext = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuthContext must be used within an AuthContextProvider");
    }

    return context;
};
