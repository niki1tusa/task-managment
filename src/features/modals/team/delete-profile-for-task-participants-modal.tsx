import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import type { ProfileRow } from '@/shared/model/task-types';
import { useModalStore } from '@/shared/store/modals-store';
import { Button } from '@/shared/ui/buttons/Button';
import Modal from '@/shared/ui/modal/Modal';

import { deleteTaskParticipants } from '@/entities/task/api/task-client-service';

interface Props {
	close: () => void;
	profile: ProfileRow;
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
			<Button onClick={() => mutate(profile.id)} disabled={isPending}>
				Yes
			</Button>
			<Button onClick={close}>No</Button>
		</Modal>
	);
}
