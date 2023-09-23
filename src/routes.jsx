import { createBrowserRouter, createRoutesFromElements, Route, Navigate } from 'react-router-dom';
import RootLayout from './layout/RootLayout';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import { useAuth } from './AuthContext';

const PrivateRoute = ({ children }) => {
	const { authState } = useAuth();
	const token = localStorage.getItem('token');
	return token && authState.isAuthenticated ? children : <Navigate to="/login" replace />;
};

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<RootLayout />}>
			<Route
				path="/"
				element={
					<PrivateRoute>
						<Home />
					</PrivateRoute>
				}
			/>
			<Route path="/about" element={<About />} />
			<Route path="/login" element={<Login />} />
			<Route path="/register" element={<Register />} />
		</Route>
	)
);

export default router;
