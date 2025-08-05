import type { TByAscOrDesc, TStatus } from '@/shared/types/task/task.types';

const BUTTONS_OPTIONS = ['All', 'Completed', 'in-progress', 'not-started'];
const SELECT_OPTIONS = ['Asc', 'Desc'];

interface Props {
	select: TStatus;
	sortOrder: TByAscOrDesc;
	setSelect: (arg: any) => void;
	setSortOrder: (arg: any) => void;
}
export default function FilterTask({ select, setSelect, sortOrder, setSortOrder }: Props) {
	return (
		<div>
			{/* tabs */}
			<div className='mb-4 flex gap-2 rounded-[4px] border border-white py-1 pl-2 shadow shadow-neutral-400'>
				{BUTTONS_OPTIONS.map(button => (
					<button
						onClick={() => setSelect(button)}
						key={button}
						value={button}
						className={`rounded-sm px-4 py-1.5 text-sm font-medium transition-all duration-300 ${
							select === button
								? 'text-primary bg-white shadow'
								: 'hover:text-primary text-gray-500 dark:hover:text-white'
						}`}
					>
						{button}
					</button>
				))}
			</div>
			{/* select */}
			<select
				value={sortOrder || ''}
				onChange={e => setSortOrder(e.target.value)}
				className='mb-4 rounded-[4px] border border-white px-4 py-1.5 text-sm text-gray-500 shadow shadow-neutral-400 dark:bg-black'
			>
				{SELECT_OPTIONS.map(option => (
					<option key={option}>{option}</option>
				))}
			</select>
		</div>
	);
}
