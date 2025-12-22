import { useQuery } from '@tanstack/react-query';

import type { ProfileRow } from '@/shared/model/task-types';

import { getProfile } from '@/entities/profile/api/profile-client-service';

export const useProfile = () => {
	const { data, error, isError, isLoading } = useQuery<ProfileRow>({
		queryKey: ['profile'],
		queryFn: getProfile,
	});
	return {
		profile: data,
		isError,
		error,
		isLoading,
	};
};
