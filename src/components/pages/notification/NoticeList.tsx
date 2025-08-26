import { useMutation } from '@tanstack/react-query';
import clsx from 'clsx';
import React from 'react';

import { Checkbox } from '@/components/animate-ui/base/checkbox';

// import { BadgeCheck, BookOpenText, CircleAlert, HandHelping } from 'lucide-react';
import { formatNoticeDate } from './formatNoticeDate';
import type { TNoticeRow } from './notice.types';
import { updateStatusNotice } from '@/services/notice/notice-client.service';

interface Props {
	notices: TNoticeRow[];
}
export default function NoticeList({ notices }: Props) {
	const { mutate } = useMutation({
		mutationFn: ({ id, status }: { id: string; status: boolean }) => updateStatusNotice(id, status),
	});
	const filterNotices = notices.filter(notice => notice.status === false);
	return (
		<ul className='flex flex-col gap-3'>
			{notices.length > 0 ? (
				filterNotices.map(notice => {
					return (
						<li key={notice.id} className='grid grid-cols-[auto_1fr_auto] items-start gap-3'>
							{/* checkbox */}
							<div className='pt-2'>
								<Checkbox
									onCheckedChange={() => mutate({ id: notice.id, status: !!!notice.status })}
								/>
							</div>

							{/* card */}
							<div
								className={clsx(
									'min-w-0 rounded-lg border p-4 shadow-sm ring-1 ring-transparent transition-all hover:shadow-neutral-400 dark:bg-gray-700',
									notice.type === 'urgent'
										? 'bg-red-50 hover:bg-red-100'
										: notice.type === 'achievement'
											? 'bg-green-50 hover:bg-green-100'
											: notice.type === 'advice'
												? 'bg-orange-50 hover:bg-orange-100'
												: 'bg-gray-50 hover:bg-gray-100'
								)}
							>
								<div className='flex items-start gap-3'>
									<span className='mt-0.5 shrink-0'>{/* <Icon size={22} /> */}</span>
									<p
										className='line-clamp-2 min-w-0 text-sm leading-6 text-gray-900 dark:text-gray-100'
										title={notice.text}
									>
										{notice.text}
									</p>
								</div>
							</div>

							{/* date pill */}
							<div
								className={clsx(
									'flex items-center self-stretch rounded-md bg-white px-3 py-2 text-xs shadow-sm shadow-neutral-400 dark:bg-gray-700'
								)}
							>
								{formatNoticeDate(notice.created_at)}
							</div>
						</li>
					);
				})
			) : (
				<li className='rounded-md border border-dashed p-6 text-sm text-gray-600'>
					Nothing found. Try another query.
				</li>
			)}
		</ul>
	);
}
