import axios from 'axios';

const API_BASE_URL = 'https://d2h6rsg43otiqk.cloudfront.net/prod';

const api = axios.create({
	headers: {
		'X-API-KEY': 'EzensCqxyl63t09mVG6jr2AXriDQeimS95s4CdpV',
		'Content-Type': 'application/json',
	},
});

export const loginUser = async (data) => {
	try {
		const response = api.post('https://d2h6rsg43otiqk.cloudfront.net/prod/user/login', data);
		return (await response).data;
	} catch (error) {
		console.log(error);
	}
};

export const registerUser = async (data) => {
	try {
		const response = api.post('https://d2h6rsg43otiqk.cloudfront.net/prod/user/register', data);
		return (await response).data;
	} catch (error) {
		console.log(error);
	}
};

export const getRankings = async ({ year, country }) => {
	try {
		const params = {};
		if (year) params.year = year;
		if (country) params.country = country;

		const response = api.get('https://d2h6rsg43otiqk.cloudfront.net/prod/rankings', { params });
		return (await response).data;
	} catch (error) {
		console.log(error);
	}
};

export const getCountries = async () => {
	try {
		const response = api.get('https://d2h6rsg43otiqk.cloudfront.net/prod/countries');

		return (await response).data;
	} catch (error) {
		console.log(error);
	}
};

export const getFactors = async ({ year, country }) => {
	try {
		let url = 'https://d2h6rsg43otiqk.cloudfront.net/prod/factors';
		if (year) {
			url += `/${year}`;
		}
		const params = {};
		if (country) {
			params.country = country;
		}

		// Retrieve the bearer token from local storage
		const token = localStorage.getItem('token');
		const headers = {
			Authorization: `Bearer ${token}`,
		};

		const response = api.get(url, { params, headers });
		return (await response).data;
	} catch (error) {
		console.log(error);
	}
};
