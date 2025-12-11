// import { useState } from 'react';

// import { Tabs, TabsList, TabsTrigger } from '@/components/animate-ui/components/tabs';
// import { AnimateIcon } from '@/components/animate-ui/icons/icon';
// import { RotateCcw } from '@/components/animate-ui/icons/rotate-ccw';
// import {
// 	Select,
// 	SelectContent,
// 	SelectGroup,
// 	SelectItem,
// 	SelectLabel,
// 	SelectTrigger,
// 	SelectValue,
// } from '@/components/ui/select';

// export default function SelectNotice() {
// 	const [orderBy, setOrderBy] = useState<'desc' | 'asc'>('desc');
// 	const [readOrNot, setReadOrNot] = useState<'no' | 'read'>('no');
// 	const [selectType, setSelectType] = useState<
// 		'all' | 'advice' | 'urgent' | 'achivment' | 'information'
// 	>('all');

// 	const resetAllFilters = () => {
// 		setOrderBy('desc');
// 		setReadOrNot('no');
// 		setSelectType('all');
// 	};
// 	return (
// 		<nav className='flex items-center gap-3'>
// 			{/* read or not  */}
// 			<Tabs value={readOrNot} onValueChange={value => setReadOrNot(value as 'read' | 'no')}>
// 				<TabsList className='grid grid-cols-2'>
// 					<TabsTrigger value='not'>Not read</TabsTrigger>
// 					<TabsTrigger value='read'>Read</TabsTrigger>
// 				</TabsList>
// 			</Tabs>
// 			{/* select date */}
// 			<Select value={orderBy} onValueChange={value => setOrderBy(value as 'desc' | 'asc')}>
// 				<SelectTrigger className='w-[180px]'>
// 					<SelectValue placeholder='Sort by date' />
// 				</SelectTrigger>
// 				<SelectContent>
// 					<SelectGroup>
// 						<SelectLabel>Date</SelectLabel>
// 						<SelectItem value='asc'>Asc</SelectItem>
// 						<SelectItem value='desc'>Desc</SelectItem>
// 					</SelectGroup>
// 				</SelectContent>
// 			</Select>
// 			{/* select type */}
// 			<Select
// 				value={selectType}
// 				onValueChange={value =>
// 					setSelectType(value as 'all' | 'advice' | 'urgent' | 'achivment' | 'information')
// 				}
// 			>
// 				<SelectTrigger className='w-[180px]'>
// 					<SelectValue placeholder='Select a type' />
// 				</SelectTrigger>
// 				<SelectContent>
// 					<SelectGroup>
// 						<SelectLabel>Type</SelectLabel>
// 						<SelectItem value='all'>All</SelectItem>
// 						<SelectItem value='advice'>Advice</SelectItem>
// 						<SelectItem value='urgent'>Urgent</SelectItem>
// 						<SelectItem value='achivment'>Achivment</SelectItem>
// 						<SelectItem value='information'>Information</SelectItem>
// 					</SelectGroup>
// 				</SelectContent>
// 			</Select>
// 			<button
// 				onClick={() => resetAllFilters()}
// 				title='Reset all filters'
// 				className='flex items-center justify-center rounded-sm p-1 shadow-default'
// 			>
// 				<AnimateIcon animateOnHover>
// 					<RotateCcw size={26} />
// 				</AnimateIcon>
// 			</button>
// 		</nav>
// 	);
// }
