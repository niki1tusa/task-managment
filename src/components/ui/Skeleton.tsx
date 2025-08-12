import clsx from 'clsx';

export default function Skeleton({
	length = 1,
	rounded = 'rounded-sm',
	width = 'w-[200px]',
	height = 'h-[100px]',
	className,
}: {
	length?: number;
	rounded?: string;
	width?: string;
	height?: string;
	className?: string;
}) {
	const arr = Array.from({ length: length }, (_, i) => i);

	return length > 0 ? (
		<>
			{arr.map((_, i) => (
				<div
					className={clsx(`bg-gray mx-1 my-1 animate-pulse ${rounded} ${width} ${height} `, className)}
					key={i}
					aria-hidden={true}
				/>
			))}
		</>
	) : null;
}
