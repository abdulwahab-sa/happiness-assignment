import Sidebar from '../components/Sidebar';
import { useState } from 'react';
import RankingsGrid from '../components/RankingsGrid';
import HappinessFactors from '../components/HappinessFactors';
import HappinessComparison from '../components/HappinessComparison';

const componentsList = [
	{
		id: 2,
		title: 'Rankings',
		component: RankingsGrid,
	},
	{
		id: 4,
		title: 'Happiness Factors',
		component: HappinessFactors,
	},
	{
		id: 5,
		title: 'Compare Countries',
		component: HappinessComparison,
	},
];

const Home = () => {
	const [activeItem, setActiveItem] = useState(componentsList[0]);

	return (
		<div className="happiness-widget">
			<Sidebar data={componentsList} activeItem={activeItem} setActiveItem={setActiveItem} />;
			<div className="main-wrapper">{activeItem && <activeItem.component />}</div>
		</div>
	);
};

export default Home;
