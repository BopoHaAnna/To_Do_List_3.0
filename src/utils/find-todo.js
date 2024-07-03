export const filterTasks = (tasks, searchTerm) => {
	return tasks.filter((task) =>
		task.title.toLowerCase().includes(searchTerm.toLowerCase()),
	);
};
