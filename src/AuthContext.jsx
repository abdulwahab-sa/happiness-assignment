import { createContext, useContext, useReducer, useEffect } from 'react';

// Define initial state
const initialState = {
	isAuthenticated: false,
	token: null,
};

// Define reducer function
const authReducer = (state, action) => {
	switch (action.type) {
		case 'LOGIN':
			return {
				...state,
				isAuthenticated: true,
				token: action.payload,
			};
		case 'LOGOUT':
			return {
				...state,
				isAuthenticated: false,
				token: null,
			};
		default:
			return state;
	}
};

// Create the AuthContext
const AuthContext = createContext();

// Create the AuthProvider component
export const AuthProvider = ({ children }) => {
	const [authState, dispatch] = useReducer(authReducer, initialState);

	// Check for a token in local storage on component mount
	useEffect(() => {
		const userToken = localStorage.getItem('token');
		if (userToken) {
			// If a token exists, update the state to reflect the user as logged in
			dispatch({ type: 'LOGIN', payload: { userToken } }); // Replace with actual user data
		}
	}, []); // Empty dependency array ensures this runs only once on mount

	const login = (token) => {
		dispatch({ type: 'LOGIN', payload: token });
	};

	const logout = () => {
		localStorage.removeItem('token'); // Remove the token from local storage
		dispatch({ type: 'LOGOUT' });
	};

	return <AuthContext.Provider value={{ authState, login, logout }}>{children}</AuthContext.Provider>;
};

// Create a custom hook for accessing the context
export const useAuth = () => {
	return useContext(AuthContext);
};
