import { createContext, useContext, useEffect, useReducer } from "react";

// Initial state setup
const initialState = {
    user: null,
    role: localStorage.getItem('role') || null,
    token: localStorage.getItem("token") || null,
};

// Safely get 'user' from localStorage
try {
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
    initialState.user = user;
} catch (error) {
    console.error('Error parsing user data from localStorage', error);
}

// Create context
export const authContext = createContext(initialState);

// Reducer function for state management
const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN_START':
            return {
                user: null,
                role: null,
                token: null,
            };
        case "LOGIN_SUCCESS":
            return {
                user: action.payload.user,
                token: action.payload.token,
                role: action.payload.role,
            };
        case 'LOGOUT':
            return {
                user: null,
                role: null,
                token: null,
            };
        default:
            return state;
    }
};

// Context Provider
export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    useEffect(() => {
        // Update localStorage whenever state changes
        if (state.user) {
            localStorage.setItem("user", JSON.stringify(state.user));
        } else {
            localStorage.removeItem("user");
        }
        localStorage.setItem("token", state.token);
        localStorage.setItem("role", state.role);
    }, [state]);

    return (
        <authContext.Provider value={{
            user: state.user,
            token: state.token,
            role: state.role,
            dispatch,
        }}>
            {children}
        </authContext.Provider>
    );
};
