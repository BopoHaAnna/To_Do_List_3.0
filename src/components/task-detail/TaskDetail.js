import styles from './TaskDetail.module.css';
import { Button } from '../button/button';
import { AppContext } from '../../context';
import { useContext } from 'react';

export const TaskDetail = ({ task }) => {
	const { dispatch } = useContext(AppContext);

	const handleEdit = () => {
		dispatch({ type: 'START_EDIT_TASK', payload: task.id });
	};
	const handleDelete = () => {
		dispatch({ type: 'DELETE_TASK', payload: task.id });
	};

	return (
		<div className={styles.taskContainer}>
			<div className={styles.taskTitle}>{task.title}</div>
			<div className={styles.buttonContainer}>
				<Button onClick={handleEdit}>Изменить</Button>
				<Button onClick={handleDelete}>Удалить</Button>
			</div>
		</div>
	);
};
