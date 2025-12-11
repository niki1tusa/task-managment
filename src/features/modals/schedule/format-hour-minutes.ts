export function toHHMMSS(t: string) {
	return /^\d{2}:\d{2}:\d{2}$/.test(t) ? t : `${t}:00`;
}
