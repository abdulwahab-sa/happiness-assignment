const Sidebar = ({ data, activeItem, setActiveItem }) => {
	return (
		<div className="sidebar">
			{data.map((item) => (
				<span
					key={item.id}
					onClick={() => setActiveItem(item)}
					className={`${item.id === activeItem.id ? 'active-item' : 'inactive-item'} `}
				>
					{item.title}{' '}
				</span>
			))}
		</div>
	);
};

export default Sidebar;
