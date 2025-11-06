import ProfileList from '@/components/modals/channel/profile-modal-list/ProfileList';
import { Button } from '@/components/ui/button/Button';

import type { TProfileRow } from '@/shared/types/task/task.types';

import { useTaskStore } from '@/store/task.store';

import { useTeamParticipants } from './useTeamParticipants';
interface Props {
	close: () => void;
	profile: TProfileRow;
	setOpenList?: (arg: boolean) => void;
	mutateFnc?: (arg: string[]) => void;
	isPending?: boolean;
}
export default function TeamModalParticipant({ profile, close, mutateFnc, isPending }: Props) {
	const { profiles, selectProfileIds, setSelectProfileIds } = useTeamParticipants(profile);
	const { activeTask } = useTaskStore();
	const countAlreadyParticipants = activeTask?.task_participants.length || 0;
	// handle

	const handleAddProfile = (profileToAdd: TProfileRow) => {
		if (!selectProfileIds.some(p => p === profileToAdd.id)) {
			setSelectProfileIds([...selectProfileIds, profileToAdd.id]);
		}
	};
	const handleRemoveProfile = (profileToAdd: TProfileRow) => {
		const filtered = selectProfileIds.filter(id => id !== profileToAdd.id);
		setSelectProfileIds([...filtered]);
	};
	return (
		<div className='flex h-auto max-h-[60vh] flex-col justify-start gap-2'>
			<span className='flex gap-2 py-2 text-base font-medium'>
				<span>Choice profile:</span>
				<span>{countAlreadyParticipants + selectProfileIds.length}/ 30</span>
			</span>

			{/* <Textarea value={} setValue={} /> */}

			<ProfileList
				profiles={profiles}
				handleAddProfile={handleAddProfile}
				handleRemoveProfile={handleRemoveProfile}
				selectProfileIds={selectProfileIds}
			/>

			{mutateFnc && (
				<div className='flex gap-4'>
					<Button disable={isPending} onClick={() => mutateFnc(selectProfileIds)}>
						Save
					</Button>
					<Button onClick={close}>Close</Button>
				</div>
			)}
		</div>
	);
}
