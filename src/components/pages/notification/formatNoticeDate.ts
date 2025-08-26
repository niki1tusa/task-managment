import { parseISO, format, isToday, isSameYear, addYears, isAfter } from 'date-fns';

// iso: "2025-08-25T17:22:31.48272+00:00"
export function formatNoticeDate(iso: string) {
  const d = parseISO(iso);            // безопаснее для ISO-строк
  if (isNaN(d.getTime())) return '';  // на всякий случай

  const now = new Date();
  const olderThanYear = isAfter(now, addYears(d, 1)); // прошло > 1 года?

  if (isToday(d)) return format(d, 'p');              // сегодня → только время
  if (!olderThanYear && isSameYear(d, now)) return format(d, 'd MMMM'); // в этом году
  return format(d, 'd MMM yyyy');                     // старше года → с годом
}
