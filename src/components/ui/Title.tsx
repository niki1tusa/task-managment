import cn from 'clsx';

interface Props {
	children: React.ReactNode;
	heading?: 'page' | 'component';
	count?: number;
}
export function Title({ children, heading = 'component', count }: Props) {
	return (
		<span className={cn(heading === 'page' ? 'text-3xl font-bold' : 'text-xl font-medium')}>
			{children}
			{count && <span className='opacity-50'>({count})</span>}
		</span>
	);
}
