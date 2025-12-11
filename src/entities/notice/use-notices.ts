import { useQuery } from '@tanstack/react-query';

import { useProfile } from '../profile/use-profile';

import { getNoticesByProfileId } from '@/entities/notice/notice-client-service';
import type { TNoticeRow } from '@/entities/notice/notice-types';

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
