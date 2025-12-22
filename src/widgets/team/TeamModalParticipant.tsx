import type { ProfileRow } from '@/shared/model/task-types';
import { useTaskStore } from '@/shared/store/task-store';
import { Button } from '@/shared/ui/buttons/Button';

import { useTeamParticipants } from './useTeamParticipants';
import ProfileList from '@/features/messages/modals/profile-modal-list/ProfileList';

interface Props {
	close: () => void;
	profile: ProfileRow;
	setOpenList?: (arg: boolean) => void;
	mutateFnc?: (arg: string[]) => void;
	isPending?: boolean;
}
export default function TeamModalParticipant({ profile, close, mutateFnc, isPending }: Props) {
	const { profiles, selectProfileIds, setSelectProfileIds } = useTeamParticipants(profile);
	const { activeTask } = useTaskStore();
	const countAlreadyParticipants = activeTask?.task_participants.length || 0;
	// handle

	const handleAddProfile = (profileToAdd: ProfileRow) => {
		if (!selectProfileIds.some(p => p === profileToAdd.id)) {
			setSelectProfileIds([...selectProfileIds, profileToAdd.id]);
		}
	};
	const handleRemoveProfile = (profileToAdd: ProfileRow) => {
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
					<Button disabled={isPending} onClick={() => mutateFnc(selectProfileIds)}>
						Save
					</Button>
					<Button onClick={close}>Close</Button>
				</div>
			)}
		</div>
	);
}
