'use client';

import { ChevronDown } from 'lucide-react';
import React, { useState } from 'react';

import { useClickOutside } from '@/hooks/useClickOutside';

import { timeRange } from '../../../../../shared/data/project-chart.data';
import type { ITimeRange } from '../../../../../shared/types/project-chart.types';

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
	const { ref } = useClickOutside<HTMLDivElement>(()=>{
		setIsDropdownOpen(false)
	});
	return (
		<div className='flex items-center justify-between px-5 pt-4 mb-3'>
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
					<div className='absolute right-0 z-10 mt-2 w-32 rounded-2xl border border-neutral-200 py-1 transition-all duration-200'>
						{timeRange.map(range => (
							<button
								onClick={() => handleRangeChange(range)}
								key={range.value}
								className='hover:text-primary w-full px-3 py-2 text-left text-sm transition-colors'
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
