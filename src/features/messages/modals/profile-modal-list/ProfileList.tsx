import React from 'react';

import type { ProfileRow } from '@/shared/model/task-types';
import { Avatar } from '@/shared/ui/Avatar';
import { Checkbox } from '@/shared/ui/animate-ui/base/checkbox';

interface Props {
	typeChannel?: string;
	profiles: ProfileRow[];
	selectProfileId?: string | null;
	selectProfileIds?: string[];
	handleAddProfile: (arg: ProfileRow) => void;
	handleRemoveProfile: (arg: ProfileRow) => void;
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
			{profiles?.map((p: ProfileRow) => (
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
