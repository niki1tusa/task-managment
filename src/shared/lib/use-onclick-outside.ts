import { type RefObject, useEffect, useRef } from 'react';

type Handler = (event: MouseEvent | TouchEvent) => void;
type IgnoreRefs = Array<RefObject<HTMLElement | null>>;

export function useClickOutside<T extends HTMLElement>(
	handler: Handler,
	ignoreRefs: IgnoreRefs = []
) {
	const ref = useRef<T | null>(null);
	useEffect(() => {
		const listener = (event: MouseEvent | TouchEvent) => {
			const target = event.target as Node | null;
			if (!target) return;
			// игнор в основном контейнере
			if (!ref.current || ref.current.contains(target)) return;
			// игнор контейнеров который были переданы как ignoreRefs
			for (const refElement of ignoreRefs) {
				if (refElement.current?.contains(target)) return;
			}
			handler(event);
		};

		document.addEventListener('mousedown', listener);
		document.addEventListener('touchstart', listener);

		return () => {
			document.removeEventListener('mousedown', listener);
			document.removeEventListener('touchstart', listener);
		};
	}, [handler, ignoreRefs]);
	return { ref };
}
