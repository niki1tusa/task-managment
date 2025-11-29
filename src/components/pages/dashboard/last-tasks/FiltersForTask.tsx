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
			<div className='shadow-default mb-4 flex gap-2 bg-side rounded-[4px] border border-white py-1 pl-2'>
				{BUTTONS_OPTIONS.map(button => (
					<button
						onClick={() => setSelect(button as TStatus)}
						key={button}
						value={button}
						className={`rounded-sm px-4 py-1.5  text-sm font-medium transition-all  ${
							select === button
								? 'text-primary bg-primary/30 shadow'
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
				className='shadow-default mb-4 rounded-[4px] border border-white px-4 py-1.5 text-sm text-gray-500 bg-side'
			>
				{SELECT_OPTIONS.map(option => (
					<option key={option}>{option}</option>
				))}
			</select>
		</div>
	);
}
