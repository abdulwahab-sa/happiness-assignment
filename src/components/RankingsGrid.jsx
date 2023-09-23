import { useState, useEffect } from 'react';
import { getRankings, getCountries } from '../api/api';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const RankingsGrid = () => {
	const [rowData, setRowData] = useState([]);
	const [selectedYear, setSelectedYear] = useState('');
	const [selectedCountry, setSelectedCountry] = useState('');
	const [countryOptions, setCountryOptions] = useState([]);

	useEffect(() => {
		async function fetchData() {
			try {
				// Fetch rankings based on selected year and country
				const response = await getRankings({ year: selectedYear, country: selectedCountry });
				setRowData(response);
			} catch (error) {
				console.error('Error fetching rankings:', error);
			}
		}

		fetchData();
	}, [selectedYear, selectedCountry]);

	useEffect(() => {
		async function fetchCountries() {
			try {
				// Fetch the list of countries from the API
				const countries = await getCountries();
				setCountryOptions(countries);
			} catch (error) {
				console.error('Error fetching countries:', error);
			}
		}

		fetchCountries();
	}, []);

	const columnDefs = [
		{ headerName: 'Country', field: 'country', flex: 1 },
		{ headerName: 'Score', field: 'score', flex: 1 },
		{ headerName: 'Year', field: 'year', flex: 1 },
	];

	return (
		<div className="ag-theme-alpine rankings-grid" style={{ height: 400, width: '100%' }}>
			<div className="filters">
				<label htmlFor="yearFilter">Filter by Year:</label>
				<select id="yearFilter" value={selectedYear} className="branding-select" onChange={(e) => setSelectedYear(e.target.value)}>
					<option value="">All Years</option>
					{Array.from({ length: 6 }, (_, index) => (2020 - index).toString()).map((year) => (
						<option key={year} value={year}>
							{year}
						</option>
					))}
				</select>

				<label htmlFor="countryFilter">Filter by Country:</label>
				<select id="countryFilter" value={selectedCountry} className="branding-select" onChange={(e) => setSelectedCountry(e.target.value)}>
					<option value="">All Countries</option>
					{countryOptions.map((country) => (
						<option key={country} value={country}>
							{country}
						</option>
					))}
				</select>
			</div>

			<AgGridReact columnDefs={columnDefs} rowData={rowData} pagination={true} paginationPageSize={10} />
		</div>
	);
};

export default RankingsGrid;
