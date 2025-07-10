import { isToday } from 'date-fns';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { TFormData } from '@/components/dashboard/modals/scheme.zod';

import { PROFILES } from '@/shared/data/profile.data';
import { TASKS } from '@/shared/data/task.data';
import type { IProfile } from '@/shared/types/profile.types';
import type { ISubTask, ITask } from '@/shared/types/task.types';

export interface ITaskStore {
	statusCount: (data: ITask) => number;
	getTodayTasks: () => ITask[];
	tasks: ITask[];
	profiles: IProfile[];
	updateTask: (id: string, data: TFormData) => void;
	addSubTask: (id: string, data: Pick<ISubTask, 'title'>) => void;
}

export const useTaskStore = create<ITaskStore>()(
	persist(
		(set, get) => ({
			tasks: TASKS,
			profiles: PROFILES,
			getTodayTasks: (): ITask[] => {
				return get().tasks.filter(task => isToday(new Date(task.due.date)));
			},
			statusCount: data => {
				return Math.floor(
					(data.subTask.filter(item => item.isCompleted === true).length / data.subTask.length) *
						100
				);
			},
			updateTask: (id, data) =>
				set(state => ({
					tasks: state.tasks.map(task => (task.id === id ? { ...task, ...data } : task)),
				})),
			addSubTask: (id, subTask) =>
				set(state => ({
					tasks: state.tasks.map(task =>
						task.id === id
							? {
									...task,
									subTask: [
										...task.subTask,
										{
											...subTask,
											id: crypto.randomUUID(),
											isCompleted: false,
										},
									],
								}
							: task
					),
				})),
		}),
		// options
		{
			name: 'task-store',
			storage: {
				getItem: name => {
					const str = localStorage.getItem(name);
					if (!str) return null;

					const parsed = JSON.parse(str);
					if (parsed.state.tasks) {
						parsed.state.tasks = parsed.state.tasks.map((task: ITask) => ({
							...task,
							due: {
								date: new Date(task.due.date),
								startTime: task.due.startTime ? new Date(task.due.startTime) : undefined,
								endTime: task.due.endTime ? new Date(task.due.endTime) : undefined,
							},
						}));
					}
					return parsed;
				},
				setItem: (name, value) => {
					localStorage.setItem(name, JSON.stringify(value));
				},
				removeItem: name => localStorage.removeItem(name),
			},
		}
	)
);
// onRehydrateStorage - должен возвращать fnc
// первая fnc вызывается при инициализации
// вторая fnc вызывается после востановления данных из localStorage
