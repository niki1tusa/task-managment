import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { Button } from '@/components/ui/button/Button';
import Modal from '@/components/ui/modal/Modal';

import type { TProfileRow } from '@/shared/types/task.types';

import { useModalStore } from '@/store/modals-store';

import { deleteTaskParticipants } from '@/services/tasks/task-client.service';

interface Props {
	close: () => void;
	profile: TProfileRow;
}
export default function DeleteProfileFromTaskParticipants({ close, profile }: Props) {
	const { type } = useModalStore();
	const queryClient = useQueryClient();
	const { mutate, isPending } = useMutation({
		mutationFn: (id: string) => deleteTaskParticipants(id),
		onSuccess: () => {
			toast.success('Profile is kicked out!');
			queryClient.invalidateQueries({ queryKey: ['profiles'] });
			close();
		},
		onError: (error: unknown) => {
			toast.error(`Ошибка: ${error instanceof Error ? error.message : 'неизвестная'}`);
		},
	});

	if (type !== 'deleteProfileFromTaskParticipants' || !profile) return null;

	return (
		<Modal close={close} title={`Do you really want to kicked from party task"${profile.name}"?`}>
			<Button onClick={() => mutate(profile.id)} disable={isPending}>
				Yes
			</Button>
			<Button onClick={close}>No</Button>
		</Modal>
	);
}
