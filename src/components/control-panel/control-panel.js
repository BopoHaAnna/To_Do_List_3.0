import styles from './control-panel.module.css';
import { useState, useContext } from 'react';
import { AppContext } from '../../context';
import { Button } from '../button/button';

export const ControlPanel = () => {
	const [newTask, setNewTask] = useState('');
	const { dispatch } = useContext(AppContext);

	const handleAddTask = () => {
		dispatch({ type: 'ADD_TASK', payload: newTask });
		setNewTask('');
	};

	return (
		<div className={styles.inputContainer}>
			<input
				type="text"
				placeholder="Введите задачу"
				value={newTask}
				onChange={(e) => setNewTask(e.target.value)}
			></input>
			<Button onClick={handleAddTask}>Добавить</Button>
		</div>
	);
};
