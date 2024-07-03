import styles from './TaskEditor.module.css';
import { Button } from '../button/button';
import { AppContext } from '../../context';
import { useContext } from 'react';

export const TaskEditor = () => {
	const { editedTask, setEditedTask, dispatch } = useContext(AppContext);

	const handleChange = (e) => {
		setEditedTask({
			...editedTask,
			title: e.target.value,
		});
	};

	const handleSaveClick = () => {
		dispatch({ type: 'UPDATE_TASK', payload: editedTask });
		setEditedTask({ id: null, title: '' });
	};

	const handleCancelClick = () => {
		dispatch({ type: 'CANCEL_EDIT_TASK' });
	};

	return (
		<div className={styles.taskContainer}>
			<input type="text" value={editedTask.title} onChange={handleChange} />
			<div className={styles.buttonContainer}>
				<Button onClick={handleSaveClick}>Сохранить</Button>
				<Button onClick={handleCancelClick}>Отмена</Button>
			</div>
		</div>
	);
};
