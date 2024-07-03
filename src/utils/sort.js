// sort.js
export const sortTask = (tasks, sortMode) => {
	const sortedTasks = [...tasks];
	if (sortMode) {
		sortedTasks.sort((a, b) => {
			const taskA = a.title.toLowerCase();
			const taskB = b.title.toLowerCase();
			if (taskA < taskB) return -1;
			if (taskA > taskB) return 1;
			return 0;
		});
	}
	return sortedTasks;
};
