import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';

import type { TProfileRow } from '@/shared/types/task/task.types';

import { useTaskStore } from '@/store/task.store';

import { getAllProfile } from '@/services/profile/profile-client.service';

export function useTeamParticipants(profile: TProfileRow) {
	const { activeTask } = useTaskStore();
	const [selectProfileIds, setSelectProfileIds] = useState<string[]>([]);
	// all profiles
	const { data: profilesData } = useQuery<TProfileRow[]>({
		queryKey: ['profiles'],
		queryFn: () => getAllProfile(),
	});
	// participants in active task
	const participants = activeTask?.task_participants || [];
	// add participants
	const participantIds = useMemo(()=>{
		return new Set(participants.flatMap(p => p.profile ?? []).map(pr => pr.id));
	}, [participants]) 

	const profiles = useMemo(() => {
		const base = profilesData ?? [];
		return base.filter(
			u =>
				u.id !== profile.id && // себя исключаем всегда
				!participantIds.has(u.id) // если добавляем в task — исключаем уже участников активного task
		);
	}, [profilesData, profile.id, participantIds]);

	return {
		selectProfileIds,
		setSelectProfileIds,
		profiles,
		profilesData,
		participantIds,
	};
}
