import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { TASKS } from '@/shared/data/task.data';
import type { ISubTask, ITask, TFormData } from '@/shared/types/task.types';
import type { IProfile } from '@/shared/types/profile.types';
import { PROFILES } from '@/shared/data/profile.data';

interface ITaskStore {
	statusCount: (data: ITask) => number;
	tasks: ITask[];
	profiles: IProfile[]
	updateTask: (id: string, data: TFormData) => void;
	addSubTask: (id: string, data: Pick<ISubTask, 'title'>) => void;
}

export const useTaskStore = create<ITaskStore>()(
	persist(
		set => ({
			tasks: TASKS,
			profiles: PROFILES,
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
			onRehydrateStorage: () => state => {
				if (state) {
					state.tasks = state.tasks.map(task => ({
						...task,
						due: new Date(task.due),
					}));
				}
			},
		}
	)
);
// onRehydrateStorage - должен возвращать fnc
// первая fnc вызывается при инициализации
// вторая fnc вызывается после востановления данных из localStorage
