import clsx from 'clsx';
import type { ComponentPropsWithoutRef } from 'react';

type Props = {
	className?: string;
	type?: 'button' | 'submit' | 'reset';
	children: React.ReactNode;
	disabled?: boolean;
	variant?: 'transparent' | 'primary';
};
export function Button({
	type = 'button',
	children,
	className,
	disabled = false,
	variant = 'primary',
	...rest
}: Props & ComponentPropsWithoutRef<'button'>) {
	return (
		<button
			{...rest}
			type={type}
			disabled={disabled}
			className={clsx(
				'w-[30%] rounded-sm p-2 text-sm dark:bg-gray-800 dark:hover:bg-gray-600',
				disabled ? 'bg-primary/50 cursor-not-allowed' : 'cursor-pointer',
				className,
				variant === 'primary' &&
					'bg-primary hover:bg-primary/50 text-white transition-colors 2xl:text-lg',
				variant === 'transparent' &&
					'bg-background text-foreground/50 shadow-lg ring-1 shadow-neutral-400/40 ring-neutral-500 ring-offset-1 transition-colors hover:bg-gray-200 dark:hover:text-black'
			)}
		>
			{children}
		</button>
	);
}
