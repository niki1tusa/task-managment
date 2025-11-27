import clsx from 'clsx';

interface Props {
	value: string;
	setValue: (e: string) => void;
	placeholder?: string;
	rounded?: string;
	className?: string;
	isStretch?: boolean;
}
export default function Textarea({
	value,
	setValue,
	placeholder,
	rounded,
	className,
	isStretch = false,
}: Props) {
	return (
		<textarea
			rows={1}
			placeholder={placeholder || `Enter group name...`}
			value={value}
			onChange={e => setValue(e.target.value)}
			className={clsx(
				className,
				isStretch && `h-auto min-h-[100px]`,
				rounded ? rounded : 'rounded-lg',
				'shadow-default resize-none bg-gray-50 px-3 py-2 text-sm placeholder-gray-400 outline-none dark:bg-gray-700 dark:text-white dark:placeholder-gray-500'
			)}
		/>
	);
}
