export default function Skeleton({
	length = 1,
	rounded = 'rounded-sm',
	width = 'w-[200px]',
	height = 'h-[100px]',
}: {
	length?: number;
	rounded?: string;
	width?: string;
	height?: string;
}) {
	const arr = Array.from({ length: length }, (v, i) => i);

	return length > 1 ? (
		<>
			{arr.map((_, i) => (
				<div
					className={`bg-gray animate-pulse ${rounded} ${width} ${height} `}
					key={i}
					aria-hidden={true}
				/>
			))}
		</>
	) : null;
}
