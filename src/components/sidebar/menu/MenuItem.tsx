import type { IMenuItem } from '@/types/menu.item.interface';

// import cn from 'clsx'
export const MenuItem = ({ title, Icon, color }: IMenuItem) => {
	return (
		<div
			className='flex items-center rounded-4xl 
    gap-1.5 font-semibold text-sm px-3 py-1 text-gray 
    hover:bg-blueviolet hover:text-white'
		>
			{Icon && <Icon />}
			{color && <div className={`w-3 h-3 ${color}`} />}

			{title === 'Message' ? (
				<div className='flex gap-4'>
					<div>{title}</div>{' '}
					<div className='rounded-full text-[12px] flex items-center justify-center w-5 h-5 bg-blue-400 text-white'>
						4
					</div>
				</div>
			) : (
				<div>{title}</div>
			)}
		</div>
	);
};
