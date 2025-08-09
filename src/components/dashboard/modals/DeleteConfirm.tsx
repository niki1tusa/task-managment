import { SquareX } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { WrapperModal } from './Wrapper.modal';
import { useMutation } from '@tanstack/react-query';
import { deleteClientTask } from '@/services/tasks/task-client.service';
import { toast } from 'react-toastify';
import { useConfirmStore } from '@/shared/store/confirm.store';

export default function DeleteConfirm() {
  const { isOpen, task, close } = useConfirmStore();

  const { mutate, isPending } = useMutation({
    mutationFn: (id: string) => deleteClientTask(id),
    onSuccess: () => {
      toast.success('Task deleted!');
      close();
    },
    onError: (error: unknown) => {
      toast.error(`Ошибка: ${error instanceof Error ? error.message : 'неизвестная'}`);
    },
  });

  if (!isOpen || !task) return null;

  return (
    <WrapperModal>
      <div
        className="fixed top-1/2 left-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-white p-4 text-black shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-6 flex items-center justify-between ">
          <h1 className="text-xl font-medium">Do you really want to delete the task?</h1>
          <Button onClick={close} className="hover:text-red-600">
            <SquareX />
          </Button>
        </div>
        <div className="flex gap-3 ">
          <Button
            onClick={() => mutate(task.id)}
            disable={isPending}
          >
            Yes
          </Button>
          <Button onClick={close}>No</Button>
        </div>
      </div>
    </WrapperModal>
  );
}
