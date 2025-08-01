import { isToday } from 'date-fns';
import { makeAutoObservable } from 'mobx';

import type { TFormData } from '@/shared/types/scheme.zod';
import type { TGetTasksResponse, TSubTaskRow } from '@/shared/types/task.types';

class TaskStore {
	tasks: TGetTasksResponse = [];
	constructor() {
		makeAutoObservable(this);
	}
	loadStoreFromServer(tasks: TGetTasksResponse): void {
		this.tasks = tasks;
	}

	addTask(data: TGetTasksResponse) {
		this.tasks = [...this.tasks, { ...data, id: crypto.randomUUID() }];
	}

	editTask(id: string, data: TFormData) {
		this.tasks = this.tasks.map(task => (task.id === id ? { ...task, ...data } : task));
	}

	deleteTask(id: string) {
		this.tasks = this.tasks.filter((task: TGetTasksResponse[0]) => task.id !== id);
	}
	getTaskById(id: string): TGetTasksResponse[0] {
		return this.tasks.find(task => task.id === id);
	}

	addSubTask(id: string, sub_task: Pick<TSubTaskRow, 'title'>) {
		this.tasks = this.tasks.map((task: TGetTasksResponse[0]) =>
			task.id === id
				? {
						...task,
						sub_task: [
							...task[0].sub_task,
							{
								...sub_task,
								id: crypto.randomUUID(),
								is_completed: false,
							},
						],
					}
				: task
		);
	}

	getTodayTasks(): TGetTasksResponse {
		return this.tasks.filter(task => {
			const taskDate = new Date(task.due_date);
			return isToday(taskDate) && task.start_time && task.end_time;
		}) as TGetTasksResponse;
	}
	statusCount(data: TGetTasksResponse[0]) {
		return Math.floor(
			(data.sub_task.filter((item: TSubTaskRow) => item.is_completed === true).length /
				data.sub_task.length) *
				100
		);
	}
}
export const taskStore = new TaskStore();
