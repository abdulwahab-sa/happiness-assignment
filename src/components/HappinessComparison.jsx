import { useState, useEffect } from 'react';
import { getFactors, getCountries } from '../api/api';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const HappinessComparison = () => {
	const [rowData, setRowData] = useState([]);
	const [selectedYear, setSelectedYear] = useState('2015'); // Set default year to 2015
	const [selectedCountry1, setSelectedCountry1] = useState('');
	const [selectedCountry2, setSelectedCountry2] = useState('');
	const [countryOptions, setCountryOptions] = useState([]);
	const [showData, setShowData] = useState(false);

	useEffect(() => {
		async function fetchData() {
			try {
				if (selectedCountry1 && selectedCountry2) {
					// Fetch happiness factors for both selected countries and the chosen year
					const response1 = await getFactors({ year: selectedYear, country: selectedCountry1 });
					const response2 = await getFactors({ year: selectedYear, country: selectedCountry2 });

					// Create data objects for the first and second countries
					const country1Data = {
						country: selectedCountry1,
						...response1[0],
					};
					const country2Data = {
						country: selectedCountry2,
						...response2[0],
					};

					// Combine the data for both countries
					const combinedData = [country1Data, country2Data];
					setRowData(combinedData);
				} else {
					setRowData([]); // Clear data if no countries are selected
				}
			} catch (error) {
				console.error('Error fetching happiness factors for comparison:', error);
			}
		}

		if (showData) {
			fetchData();
		}
	}, [selectedYear, selectedCountry1, selectedCountry2, showData]);

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
		{ headerName: 'Country Name', field: 'country' },
		{ headerName: 'Economy', field: 'economy' },
		{ headerName: 'Family', field: 'family' },
		{ headerName: 'Health', field: 'health' },
		{ headerName: 'Freedom', field: 'freedom' },
		{ headerName: 'Generosity', field: 'generosity' },
		{ headerName: 'Trust', field: 'trust' },
	];

	const handleFetchData = () => {
		setShowData(true);
	};

	return (
		<div className="ag-theme-alpine happiness-comparison" style={{ height: 200, width: '100%' }}>
			<div className="filters">
				<label htmlFor="yearFilter">Filter by Year:</label>
				<select id="yearFilter" value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} className="branding-select">
					{Array.from({ length: 6 }, (_, index) => (2020 - index).toString()).map((year) => (
						<option key={year} value={year}>
							{year}
						</option>
					))}
				</select>

				<label htmlFor="country1Filter">Select Country 1:</label>
				<select
					id="country1Filter"
					value={selectedCountry1}
					onChange={(e) => setSelectedCountry1(e.target.value)}
					className="branding-select"
				>
					<option value="">Select Country 1</option>
					{countryOptions.map((country) => (
						<option key={country} value={country}>
							{country}
						</option>
					))}
				</select>

				<label htmlFor="country2Filter">Select Country 2:</label>
				<select
					id="country2Filter"
					value={selectedCountry2}
					onChange={(e) => setSelectedCountry2(e.target.value)}
					className="branding-select"
				>
					<option value="">Select Country 2</option>
					{countryOptions.map((country) => (
						<option key={country} value={country}>
							{country}
						</option>
					))}
				</select>

				<button onClick={handleFetchData}>Happy Click :)</button>
			</div>

			{showData && (
				<AgGridReact
					columnDefs={columnDefs}
					rowData={rowData}
					domLayout="autoHeight" // Auto-adjust grid height
				/>
			)}
		</div>
	);
};

export default HappinessComparison;
