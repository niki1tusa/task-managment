'use client';

import clsx from 'clsx';

import { ICON_NAMES, MODAL_ICON } from '@/shared/data/icon.data';

import type { IIconField } from '../form/form.types';

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
							className={clsx(
								'bg-primary hover:bg-primary/50 rounded-sm p-2 text-white transition-all',
								{
									'shadow-lg ring-2 shadow-indigo-400/40 ring-indigo-500 ring-offset-2':
										watch('icon') === name,
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
