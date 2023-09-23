import { NavLink } from 'react-router-dom';
import happyLogo from '../assets/happy-face.png';
import { useAuth } from '../AuthContext';

const links = [
	{
		path: '/',
		text: 'Home',
	},
	{
		path: '/about',
		text: 'About',
	},
	{
		path: '/login',
		text: 'Login',
	},
	{
		path: '/register',
		text: 'Register',
	},
	{
		path: '#',
		text: 'Logout',
	},
];

const Navbar = () => {
	const { authState, logout } = useAuth();

	return (
		<nav className="navbar">
			<div className="logo">
				<NavLink to="/">
					Happiness Project
					<img src={happyLogo} className="" />
				</NavLink>
			</div>

			<div className="nav-links">
				{links.map((link, index) => (
					<NavLink
						key={index}
						to={link.path}
						style={
							(link.text === 'Login' || link.text === 'Register') && authState.isAuthenticated
								? { display: 'none' } // Hide "Login" and "Register" when logged in
								: link.text === 'Logout' && !authState.isAuthenticated
								? { display: 'none' } // Hide "Logout" when logged out
								: { display: 'block' } // Display other links by default
						}
						onClick={
							link.text === 'Logout'
								? () => {
										logout(); // Call the logout function from the context
								  }
								: null
						}
					>
						{link.text}
					</NavLink>
				))}
			</div>
		</nav>
	);
};

export default Navbar;
