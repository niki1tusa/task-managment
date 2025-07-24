import cn from 'clsx';

interface Props {
	className?: string;
	onClick?: () => void;
	type?: 'button' | 'submit' | 'reset';
	children: React.ReactNode;
}
export function Button({ type = 'button', children, className = '', onClick}: Props) {
	return (
		<button
			onClick={onClick}
			type={type}
			className={cn(
				className
					? className
					: 'bg-primary hover:bg-primary/50 w-[30%] rounded-2xl py-2 text-white transition-colors text-sm 2xl:text-lg'
			)}
		>
			{children}
		</button>
	);
}
