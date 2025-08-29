import clsx from 'clsx';

interface Props {
	className?: string;
	onClick?: () => void;
	type?: 'button' | 'submit' | 'reset';
	children: React.ReactNode;
	disable?: boolean;
	variant?: 'transparent' | 'primary';
}
export function Button({
	type = 'button',
	children,
	className,
	onClick,
	disable = false,
	variant = 'primary',
}: Props) {
	return (
		<button
			onClick={onClick}
			type={type}
			className={clsx(
				'w-[30%] rounded-sm p-2 text-sm',
				disable ? 'bg-primary/50 cursor-not-allowed': 'cursor-pointer',
				className,
				variant === 'primary' &&
					'bg-primary hover:bg-primary/50 text-white transition-colors 2xl:text-lg',
				variant === 'transparent' &&
					'bg-background text-foreground/50 shadow-lg ring-1 shadow-neutral-400/40 ring-neutral-500 ring-offset-1 transition-colors hover:bg-gray-200 dark:hover:text-black'
			)}
			disabled={disable}
		>
			{children}
		</button>
	);
}
