import { addHours, format, setHours, setMinutes, setSeconds } from 'date-fns';
import type { TTaskCreateForm } from '@/shared/types/task/task.types';

export function prepareTaskPayload(data: TTaskCreateForm) {
  const now = new Date();
  const hour = now.getHours();

  let start = now;
  let end = addHours(now, 2);

  // если задача добавляется в не рабочее время, то start and end назаначаются к ближайшей границе 
  if (hour < 9) {
    start = setSeconds(setMinutes(setHours(now, 9), 0), 0);
    end = addHours(start, 2);
  } else if (hour > 15) {
    start = setSeconds(setMinutes(setHours(now, 15), 0), 0);
    end = addHours(start, 2);
  }

  return {
    ...data,
    start_time: format(start, 'HH:mm:ss'),
    end_time: format(end, 'HH:mm:ss'),
  };
}
