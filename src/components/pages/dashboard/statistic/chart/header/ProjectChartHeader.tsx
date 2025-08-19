'use client';

import { ChevronDown } from 'lucide-react';
import React, { useState } from 'react';

import { useClickOutside } from '@/hooks/useClickOutside';
import type { ITimeRange } from '@/shared/types/statistics/statistics.types';

const timeRange: ITimeRange[] = [
	{ label: 'Yearly', value: 'yearly' },
	{ label: 'Monthly', value: 'monthly' },
];

interface Props {
	selectedRange: ITimeRange;
	onChangeRange: (range: ITimeRange) => void;
}
export function ProjectChartHeader({ selectedRange, onChangeRange }: Props) {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const handleRangeChange = (range: ITimeRange) => {
		onChangeRange(range);
		setIsDropdownOpen(false);
	};
	const { ref } = useClickOutside<HTMLDivElement>(() => {
		setIsDropdownOpen(false);
	});
	return (
		<div className='mb-3 flex items-center justify-between px-5 pt-4'>
			<h2 className='text-xl font-semibold'>Project Statistic</h2>{' '}
			<div ref={ref} className='relative'>
				<button
					onClick={() => setIsDropdownOpen(!isDropdownOpen)}
					className='flex items-center gap-2 rounded-2xl border border-neutral-200 px-3 py-1.5 text-sm'
				>
					{selectedRange.label}
					{<ChevronDown size={16} />}
				</button>
				{isDropdownOpen && (
					<div className='absolute right-0 z-20 mt-2 w-32 rounded-2xl border border-neutral-200 py-1 transition-all duration-200'>
						{timeRange.map(range => (
							<button
								onClick={() => handleRangeChange(range)}
								key={range.value}
								className='hover:text-primary mx-2 box-border w-full rounded-sm px-1 py-1 text-left text-sm transition-colors dark:hover:text-white'
							>
								{range.label}
							</button>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
