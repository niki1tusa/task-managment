'use client';

import cn from 'clsx';

import { ICON_NAMES, MODAL_ICON } from '@/shared/data/icon.data';

import type { IIconField } from './field.types';

export function IconField({ setValue, watch }: IIconField) {
	return (
		<div className='mb-5 flex items-center gap-2'>
			<label className='text-sm font-medium 2xl:text-lg'>Icon:</label>
			<div className='flex gap-3'>
				{ICON_NAMES.map(name => {
					const Icon = MODAL_ICON[name];
					return (
						<button
							onClick={() => setValue('icon', name)}
							type='button'
							key={name}
							className={cn(
								'bg-primary hover:bg-primary/50 rounded-sm p-2 text-white transition-colors',
								{
									'border-2 border-indigo-800 shadow shadow-neutral-400': watch('icon') === name,
								}
							)}
						>
							<Icon size={20} />
						</button>
					);
				})}
			</div>
		</div>
	);
}
