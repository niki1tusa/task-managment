import clsx from 'clsx';

interface Props {
	children: React.ReactNode;
	heading?: 'page' | 'component';
	count?: number;
	isMenuTitle?: boolean;
}
export function Title({ children, heading = 'component', count, isMenuTitle }: Props) {
	return isMenuTitle ? (
		<span className='text-gray text-lg font-semibold'>{children}</span>
	) : (
		<span className={clsx(heading === 'page' ? 'text-3xl font-bold' : 'text-xl font-medium')}>
			{children}
			{count && <span className='opacity-50'>({count})</span>}
		</span>
	);
}
