export function getProgressColor(status: number) {
	if (status === 100) return 'bg-shimmer-done';
	if (status < 30) return 'bg-shimmer-red';
	if (status < 70) return 'bg-shimmer-yellow';
	return 'bg-shimmer-green';
}
