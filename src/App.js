import { useState, useEffect } from 'react';
import styles from './app.module.css';
import {
	ControlPanel,
	SearchPanel,
	SortPanel,
	TaskDetail,
	TaskEditor,
} from './components';
import { AppContext } from './context';
import { fetchTasks, removeTask, editTask, addTask } from './api';
import { sortTask, filterTasks } from './utils';

export const App = () => {
	const [tasks, setTasks] = useState([]);
	const [editedTask, setEditedTask] = useState({ id: null, title: '' });
	const [sortMode, setSortMode] = useState(false);
	const [searchTerm, setSearchTerm] = useState('');

	const toggleSortMode = () => {
		setSortMode(!sortMode);
	};

	const filteredTasks = filterTasks(tasks, searchTerm); // отфильтрованный массив

	const sortedTasks = sortTask(filteredTasks, sortMode);

	useEffect(() => {
		fetchTasks().then((loadedTasks) => {
			setTasks(loadedTasks);
		});
	}, []);

	const dispatch = (action) => {
		const { type, payload } = action;

		switch (type) {
			case 'UPDATE_TASK': {
				const updatedTask = payload;
				editTask(updatedTask).then(() => {
					setTasks((prevTasks) =>
						prevTasks.map((task) =>
							task.id === updatedTask.id ? updatedTask : task,
						),
					);
				});
				break;
			}
			case 'DELETE_TASK': {
				const taskId = payload;
				removeTask(taskId).then(() => {
					setTasks((prevTasks) =>
						prevTasks.filter((task) => task.id !== taskId),
					);
				});
				break;
			}
			case 'START_EDIT_TASK': {
				const taskId = payload;
				const taskToEdit = tasks.find((task) => task.id === taskId);
				setEditedTask(taskToEdit);
				break;
			}
			case 'CANCEL_EDIT_TASK': {
				setEditedTask({ id: null, title: '' });
				break;
			}
			case 'ADD_TASK': {
				const newTaskTitle = payload;
				addTask(newTaskTitle).then((newTaskData) => {
					setTasks((prevTasks) => [...prevTasks, newTaskData]);
				});
				break;
			}
			default:
			// Ничего не делать по умолчанию
		}
	};

	return (
		<div className={styles.todoContainer}>
			<AppContext.Provider value={{ editedTask, setEditedTask, tasks, dispatch }}>
				<SearchPanel searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
				<h1 className={styles.todoTitle}>My To Do List</h1>
				<ControlPanel />
				<SortPanel sortMode={sortMode} toggleSortMode={toggleSortMode} />
				<div className={styles.todoList}>
					{sortedTasks.map((task) =>
						editedTask.id === task.id ? (
							<TaskEditor key={task.id} />
						) : (
							<TaskDetail key={task.id} task={task} />
						),
					)}
				</div>
			</AppContext.Provider>
		</div>
	);
};
