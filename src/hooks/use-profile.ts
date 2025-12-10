import { useQuery } from '@tanstack/react-query';

import type { TProfileRow } from '@/shared/types/task-types';

import { getProfile } from '@/services/profile/profile-client-service';

export const useProfile = () => {
	const { data, error, isError, isLoading } = useQuery<TProfileRow>({
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
