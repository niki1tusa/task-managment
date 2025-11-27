export function minsDiff(aISO: string, bISO: string) {
	const a = new Date(aISO).getTime();
	const b = new Date(bISO).getTime();
	return Math.abs(a - b) / 60000;
}


