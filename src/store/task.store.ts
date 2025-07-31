import { isToday } from 'date-fns';
import { makeAutoObservable } from 'mobx';

import { TASKS } from '@/shared/data/task.data';
import type { TFormData } from '@/shared/types/scheme.zod';
import type { TSubTask, TTask } from '@/shared/types/task.types';


class TaskStore {
	tasks: TTask[] = [...TASKS]; // create copy
	constructor() {
		makeAutoObservable(this);
	}
	loadStoreFromServer(tasks: TTask[]) {
		this.tasks = tasks;
	}

	addTask(data: TTask) {
		this.tasks = [...this.tasks, { ...data, id: crypto.randomUUID() }];
	}

	editTask(id: string, data: TFormData) {
		this.tasks = this.tasks.map(task => (task.id === id ? { ...task, ...data } : task));
	}

	deleteTask(id: string) {
		this.tasks = this.tasks.filter((task: TTask) => task.id !== id);
	}

	addSubTask(id: string, sub_task: Pick<TSubTask, 'title'>) {
		this.tasks = this.tasks.map((task: TTask) =>
			task.id === id
				? {
						...task,
						sub_task: [
							...task.sub_task,
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

	getTodayTasks(): TTask[] {
		return this.tasks.filter(task => isToday(new Date(task.due_date)));
	}
	statusCount(data: TTask) {
		return Math.floor(
			(data.sub_task.filter(item => item.is_completed === true).length / data.sub_task.length) * 100
		);
	}




}
export const taskStore = new TaskStore();
