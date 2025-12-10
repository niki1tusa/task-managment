import type { TByAscOrDesc, TStatus } from '@/shared/types/task-types';

const BUTTONS_OPTIONS = ['All', 'Completed', 'in-progress', 'not-started'];
const SELECT_OPTIONS = ['Asc', 'Desc'];

interface Props {
	select: TStatus;
	sortOrder: TByAscOrDesc;
	setSelect: (arg: TStatus) => void;
	setSortOrder: (arg: TByAscOrDesc) => void;
}
export default function FiltersForTask({ select, setSelect, sortOrder, setSortOrder }: Props) {
	return (
		<div className='flex gap-2'>
			{/* tabs */}
			<div className='shadow-default bg-side mb-4 flex gap-2 rounded-[4px] py-2 px-2'>
				{BUTTONS_OPTIONS.map(button => (
					<button
						onClick={() => setSelect(button as TStatus)}
						key={button}
						value={button}
						className={`rounded-sm px-4 py-1.5 text-sm font-medium transition-all ${
							select === button
								? 'text-primary dark:text-gray bg-primary/30 shadow shadow-neutral-600'
								: 'hover:text-primary text-gray-500 dark:hover:text-white'
						}`}
					>
						{button}
					</button>
				))}{' '}
			</div>
			{/* select */}
			<select
				value={sortOrder}
				onChange={e => setSortOrder(e.target.value as TByAscOrDesc)}
				className='shadow-default bg-side mb-4 rounded-[4px] px-4 py-1.5 text-sm text-gray-500'
			>
				{SELECT_OPTIONS.map(option => (
					<option key={option}>{option}</option>
				))}
			</select>
		</div>
	);
}
