import styles from './search.module.css';

export const SearchPanel = ({ searchTerm, setSearchTerm }) => {
	const handleChange = (event) => {
		setSearchTerm(event.target.value);
	};
	return (
		<input
			className={styles.inputSearch}
			type="text"
			placeholder="Поиск"
			value={searchTerm}
			onChange={handleChange}
		/>
	);
};
