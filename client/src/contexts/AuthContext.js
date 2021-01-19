import React,{createContext, useReducer} from 'react';
import AuthReducer from './AuthReducer';
//initial state of Auth
const initialState = {
    isLoggedIn: false,
    token: null,
    user: null,
}
//created context 
export const AuthContext = createContext(initialState);

// Provider component
export const AuthProvider = ({children}) => {
    const [state, dispatch] = useReducer(AuthReducer, initialState );

    
    return (
        <AuthContext.Provider
        value={{
            state,
            dispatch
        }}>
        {children}
    </AuthContext.Provider>

    )
    
}
