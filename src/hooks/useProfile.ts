import { useQuery } from '@tanstack/react-query';

import { getProfile } from '@/services/profile/profile-client.service';

export const useProfile = () => {
	const query = useQuery({
		queryKey: ['profile'],
		queryFn: getProfile,
	});
	return {
		user: query.data,
		isLoading: query.isLoading,
		isError: query.isError,
	};
};

