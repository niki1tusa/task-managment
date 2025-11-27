import React from 'react';

import { Checkbox } from '@/components/animate-ui/base/checkbox';
import { Avatar } from '@/components/ui/Avatar';

import type { TProfileRow } from '@/shared/types/task.types';

interface Props {
	typeChannel?: string;
	profiles: TProfileRow[];
	selectProfileId?: string | null;
	selectProfileIds?: string[];
	handleAddProfile: (arg: TProfileRow) => void;
	handleRemoveProfile: (arg: TProfileRow) => void;
}
export default function ProfileList({
	typeChannel = 'group',
	profiles,
	selectProfileId,
	selectProfileIds,
	handleAddProfile,
	handleRemoveProfile,
}: Props) {
	return (
		<ul className='flex flex-col overflow-y-auto rounded-lg border-2 bg-[#f6f4ff] px-4 dark:bg-gray-800'>
			{profiles?.map((p: TProfileRow) => (
				<li key={p.id} className='flex items-center justify-between border-b-2 py-2.5'>
					<div className='flex items-center gap-3'>
						<Avatar img={p.avatar_path} />
						<span className='text-sm dark:text-white'>{p.name}</span>
					</div>
					<Checkbox
						className='shadow-default bg-white'
						disabled={
							(!selectProfileId?.includes(p.id) && !!selectProfileId) ||
							(!selectProfileIds?.includes(p.id) &&
								(typeChannel === 'group'
									? selectProfileIds?.length === 30
									: selectProfileIds?.length === 1))
						}
						checked={selectProfileIds?.includes(p.id)}
						onCheckedChange={checked => {
							if (checked) {
								handleAddProfile(p);
							} else {
								handleRemoveProfile(p);
							}
						}}
					/>
				</li>
			))}
		</ul>
	);
}
