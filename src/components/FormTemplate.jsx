import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser } from '../api/api';
import { useAuth } from '../AuthContext';

const inputs = [
	{
		id: 1,
		type: 'email',
		name: 'email',
		placeholder: 'Write your email',
	},
	{
		id: 2,
		type: 'password',
		name: 'password',
		placeholder: 'Write your password',
	},
];

const FormTemplate = ({ formType }) => {
	const { authState, login } = useAuth();

	const [formData, setFormData] = useState({
		email: '',
		password: '',
		confirmPassword: '',
	});

	const navigate = useNavigate();

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const submitHandler = async (e) => {
		e.preventDefault();
		// check if formType is login or register
		if (formType === 'login') {
			const data = await loginUser(formData);
			if (data.token) {
				localStorage.setItem('token', data.token);
				login(data.token);
				navigate('/');
			}
		} else if (formType === 'register') {
			//check if confirm password is the same as password
			if (formData.password !== formData.confirmPassword) {
				return alert('Passwords do not match');
			}
			const data = await registerUser(formData);
			if (data.message === 'User created') {
				navigate('/login');
			} else {
				alert(data.message);
			}
		}
	};

	return (
		<div className="form-template">
			<h1> {formType === 'login' ? 'Welcome Back' : 'Register Here'} </h1>
			<form onSubmit={submitHandler} className="auth-form">
				{inputs.map((el) => (
					<input key={el.id} onChange={handleChange} type={el.type} name={el.name} className="" placeholder={el.placeholder} />
				))}
				{
					// if formType is register, show the confirm password input
					formType === 'register' && (
						<input onChange={handleChange} type="password" name="confirmPassword" className="" placeholder="Confirm your password" />
					)
				}
				<button type="submit" className="submit-button">
					{formType === 'login' ? 'login' : 'register'}
				</button>
			</form>
		</div>
	);
};

export default FormTemplate;
