import type { TTask } from '@/shared/types/task/task.types';

function timeStrToMinutes(t: string) {
	const [h, m, s] = t.split(':').map(Number);
	return h * 60 + m + (s ? Math.floor(s / 60) : 0);
}
export function timelineTaskPercent(task: TTask) {
	const WINDOW_START_MIN = 9 * 60; // 09:00
	const WINDOW_END_MIN = 17 * 60; // 17:00
	const WINDOW_SPAN_MIN = WINDOW_END_MIN - WINDOW_START_MIN; // 480

	const startMin = timeStrToMinutes(task.start_time!);
	const endMin = timeStrToMinutes(task.end_time!);

	const clampedStart = Math.max(WINDOW_START_MIN, Math.min(startMin, WINDOW_END_MIN));
	const clampedEnd = Math.max(WINDOW_START_MIN, Math.min(endMin, WINDOW_END_MIN));

	const startPct = ((clampedStart - WINDOW_START_MIN) / WINDOW_SPAN_MIN) * 100;
	const endPct = ((clampedEnd - WINDOW_START_MIN) / WINDOW_SPAN_MIN) * 100;
	const widthPct = Math.max(0, endPct - startPct);
	return { startPct, widthPct };
}
