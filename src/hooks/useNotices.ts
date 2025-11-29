import { useQuery } from '@tanstack/react-query';

import type { TNoticeRow } from '@/shared/types/notice-types';

import { useProfile } from './useProfile';
import { getNoticesByProfileId } from '@/services/notice-client-service';

export function useNotices() {
	const { profile } = useProfile();

	const {
		data: notices,
		isLoading: noticesIsLoading,
		isError: noticesIsError,
	} = useQuery<TNoticeRow[]>({
		queryKey: ['notices', profile?.id],
		queryFn: () => getNoticesByProfileId(profile!.id),
		enabled: !!profile?.id,
	});

	return { notices, noticesIsLoading, noticesIsError };
}
