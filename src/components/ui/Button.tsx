import clsx from 'clsx';

interface Props {
	className?: string;
	onClick?: () => void;
	type?: 'button' | 'submit' | 'reset';
	children: React.ReactNode;
	disable?: boolean;
	border?: boolean
}
export function Button({ type = 'button', children, className, onClick, disable = false, border = false }: Props) {
	return (
		<button
			onClick={onClick}
			type={type}
			className={clsx(
				{ 'bg-primary/50 cursor-not-allowed': disable },
				className
					? className
					: 'bg-primary hover:bg-primary/50 w-[30%] rounded-sm py-2 text-sm text-white transition-colors 2xl:text-lg'
			)}
			disabled={disable}
		>
			{children}
		</button>
	);
}
